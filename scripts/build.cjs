const fs = require('node:fs');
const path = require('node:path');
const { minify } = require('terser');

async function build() {
  const root = path.resolve(__dirname, '..');
  const pkg = require(path.join(root, 'package.json'));
  const source = fs.readFileSync(path.join(root, 'index.js'), 'utf8');
  const result = await minify(
    { 'index.js': source },
    {
      ecma: 5,
      sourceMap: {
        filename: 'inko.min.js',
        url: 'inko.min.js.map',
        includeSources: true,
      },
      format: {
        ascii_only: true,
        preamble: `/*! Inko v${pkg.version} | MIT License | github.com/738/inko */`,
      },
    }
  );
  fs.writeFileSync(path.join(root, 'inko.min.js'), result.code + '\n');
  fs.writeFileSync(path.join(root, 'inko.min.js.map'), result.map + '\n');
  console.log(`Built Inko ${pkg.version} browser bundle and source map.`);
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
