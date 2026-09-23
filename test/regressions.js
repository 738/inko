const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const Inko = require('..');

test('ko2en works when destructured or passed as a callback (#39)', () => {
  const { ko2en } = new Inko();
  assert.equal(ko2en('안녕하세요'), 'dkssudgktpdy');
  assert.deepEqual(['안녕', 'ㄻㄳ', 'hello'].map(ko2en), [
    'dkssud',
    'fart',
    'hello',
  ]);
});

test('detached en2ko keeps the originating instance configuration', () => {
  const first = new Inko({ allowDoubleConsonant: true });
  const second = new Inko();
  const { en2ko } = first;
  assert.equal(en2ko('rtrt'), 'ㄳㄳ');
  assert.equal(second.en2ko('rtrt'), 'ㄱㅅㄱㅅ');
  first.config({ allowDoubleConsonant: false });
  assert.equal(en2ko('rtrt'), 'ㄱㅅㄱㅅ');
  assert.equal(en2ko('rtrt', { allowDoubleConsonant: true }), 'ㄳㄳ');
  assert.equal(en2ko('rtrt'), 'ㄱㅅㄱㅅ');
});

test('calling the constructor without new returns a configured instance', () => {
  const inko = Inko({ allowDoubleConsonant: true });
  assert.ok(inko instanceof Inko);
  assert.equal(inko.en2ko('rtrt'), 'ㄳㄳ');
  assert.equal(inko.ko2en('안녕'), 'dkssud');
});

test('all standalone compound consonants are converted (#26)', () => {
  const inko = new Inko();
  assert.equal(inko.ko2en('ㄳㄵㄶㄺㄻㄼㄽㄾㄿㅀㅄ'), 'rtswsgfrfafqftfxfvfgqt');
  assert.equal(inko.ko2en('ㅁㄴㅇㄻㄴㅇㄹ'), 'asdfasdf');
});

test('all 11,172 modern Hangul syllables round-trip', () => {
  const inko = new Inko();
  for (let code = 0xac00; code <= 0xd7a3; code++) {
    const syllable = String.fromCharCode(code);
    assert.equal(inko.en2ko(inko.ko2en(syllable)), syllable);
  }
});

test('literal shifted keys and non-Hangul characters remain unchanged in meaning', () => {
  const inko = new Inko();
  assert.equal(inko.ko2en('ㄲㄸㅃㅆㅉㅉㅈ.'), 'REQTWWw.');
  assert.equal(inko.ko2en('hello 😀 漢字 123'), 'hello 😀 漢字 123');
  assert.equal(inko.en2ko('😀 漢字 123'), '😀 漢字 123');
});

test('strict-mode Web Worker scripts expose Inko without undeclared globals', () => {
  const worker = { importScripts() {} };
  worker.self = worker;
  vm.runInNewContext(
    '"use strict";\n' + fs.readFileSync(require.resolve('..'), 'utf8'),
    worker
  );
  assert.equal(worker.inko.ko2en('안녕'), 'dkssud');
  assert.equal(new worker.Inko().en2ko('dkssud'), '안녕');
});
