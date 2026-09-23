const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');
const { createRequire } = require('node:module');

const root = path.resolve(__dirname, '..');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'inko-package-'));
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
try {
  const tarball = process.argv[2]
    ? path.resolve(process.argv[2])
    : path.join(
        temp,
        JSON.parse(
          execFileSync(
            npm,
            ['pack', '--ignore-scripts', '--json', '--pack-destination', temp],
            { cwd: root, encoding: 'utf8' }
          )
        )[0].filename
      );
  const packageRoot = path.join(temp, 'node_modules', 'inko');
  fs.mkdirSync(packageRoot, { recursive: true });
  execFileSync('tar', [
    '-xzf',
    tarball,
    '-C',
    packageRoot,
    '--strip-components=1',
  ]);
  const pkg = JSON.parse(
    fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8')
  );
  assert.ok(
    fs.existsSync(path.join(packageRoot, pkg.main)),
    'Published main must resolve to a real file (#44)'
  );
  assert.deepEqual(
    pkg.dependencies || {},
    {},
    'Consumers must not install test/build dependencies (#29)'
  );
  const consumer = createRequire(path.join(temp, 'consumer.cjs'));
  const Inko = consumer('inko');
  assert.equal(new Inko().VERSION, pkg.version);
  assert.equal(new Inko().ko2en('ㅁㄴㅇㄻㄴㅇㄹ'), 'asdfasdf');
  const { ko2en } = new Inko();
  assert.equal(ko2en('안녕'), 'dkssud');
  execFileSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `import Inko from 'inko'; import assert from 'node:assert/strict'; assert.equal(new Inko().en2ko('dkssud'), '안녕');`,
    ],
    { cwd: temp, stdio: 'inherit' }
  );

  for (const file of ['index.js', 'inko.min.js']) {
    const source = fs.readFileSync(path.join(packageRoot, file), 'utf8');
    const browser = { window: { document: {} } };
    vm.runInNewContext(source, browser);
    assert.equal(browser.window.inko.ko2en('ㅁㄴㅇㄻㄴㅇㄹ'), 'asdfasdf');
    assert.equal(new browser.window.Inko().VERSION, pkg.version);
    const worker = { importScripts() {} };
    worker.self = worker;
    vm.runInNewContext('"use strict";\n' + source, worker);
    assert.equal(worker.inko.en2ko('dkssud'), '안녕');
    let AMDInko;
    const define = (_deps, factory) => {
      AMDInko = factory();
    };
    define.amd = {};
    vm.runInNewContext(source, { define });
    assert.equal(new AMDInko().ko2en('안녕'), 'dkssud');
  }
  const map = JSON.parse(
    fs.readFileSync(path.join(packageRoot, 'inko.min.js.map'), 'utf8')
  );
  assert.equal(
    map.sourcesContent[0],
    fs.readFileSync(path.join(packageRoot, 'index.js'), 'utf8')
  );

  fs.writeFileSync(
    path.join(temp, 'consumer.mts'),
    `import Inko, { type InkoOption } from 'inko';
const options: InkoOption = { allowDoubleConsonant: true };
const instance = new Inko(options);
const text: string = instance.en2ko('rtrt');
instance.config(options);
instance.ko2en(text);
`
  );
  fs.writeFileSync(
    path.join(temp, 'consumer.cts'),
    `import Inko = require('inko');
const instance = new Inko();
const text: string = instance.ko2en('안녕');
`
  );
  fs.writeFileSync(
    path.join(temp, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        noEmit: true,
        strict: true,
        target: 'ES2015',
        module: 'NodeNext',
        moduleResolution: 'NodeNext',
        esModuleInterop: true,
      },
      files: ['consumer.mts', 'consumer.cts'],
    })
  );
  const tsPackage = require.resolve('typescript/package.json');
  const compiler = path.resolve(
    path.dirname(tsPackage),
    require(tsPackage).bin.tsc
  );
  execFileSync(
    process.execPath,
    [compiler, '-p', path.join(temp, 'tsconfig.json')],
    { cwd: root, stdio: 'inherit' }
  );
  console.log(
    `Verified inko@${pkg.version}: packed files, CJS, ESM, TypeScript, browser, AMD, Worker, and source map.`
  );
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
