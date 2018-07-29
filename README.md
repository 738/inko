# inko.js (잉꼬JS)
[![GitHub license](https://img.shields.io/github/license/jonjee/inko.svg)](https://github.com/jonjee/inko/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/inko.svg)](https://npmjs.com/package/inko)

## General
- Since 2018.05.02
- 영어로 쳐야할 글을 한글로 쳤을 때, 혹은 한글로 쳐야할 글을 영어로 쳤을 때 변환해주는 기능을 가진 오픈소스입니다.

## How to install
```
npm install --save inko
```

## How to use
```
var Inko = require('inko');
var inko = Inko();
```

### 영타 -> 한글
```
inko.en2ko('dkssudgktpdy tptkd!');
// 안녕하세요 세상!
```

### 한타 -> 영문
```
inko.ko2en('ㅗ디ㅣㅐ 재깅!');
// hello world!
```
