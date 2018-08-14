<h1 align="center">
    <img height="250" src="https://github.com/JonJee/inko/blob/master/images/inko_logo.png?raw=true" />
    <br> Inko.js
</h1>

<p align="center">
  <img src="https://img.shields.io/teamcity/codebetter/bt428.svg" />
  <img src="https://img.shields.io/github/stars/jonjee/inko.svg?style=social&label=Stars" />
  <a href="https://npmjs.com/package/inko">
    <img src="https://img.shields.io/npm/v/inko.svg" alt="version" />
  </a>
  <a href="https://www.jsdelivr.com/package/npm/inko">
    <img src="https://data.jsdelivr.com/v1/package/npm/inko/badge" />
  </a>
  <a href="https://github.com/jonjee/inko/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/jonjee/inko.svg" />
  </a>
</p>

<p align="center">
  <b>Open Source Library, Converting Misspelled English characters into Korean letters (& vice versa)</b></br>
</p>

<br />

# Getting Started
- 영타를 한글로 쳤을 때, 혹은 한타를 영어로 변환해주는 기능을 가진 자바스크립트 오픈소스 라이브러리입니다.
- [Inko Offical Website](https://inko.holy.kiwi) has been launched!

## Release Note
- v1.0.3 (2018.08.07) : [#7](https://github.com/JonJee/inko/issues/7) 영타 -> 한글로 변환 시켜주는 로직 수정. 알파벳 소문자 26개, 대문자 26개 총 52개에 맞춰서 한글과 매핑함.
- v1.0.4 (2018.08.11) : [#4](https://github.com/JonJee/inko/issues/4), [#8](https://github.com/JonJee/inko/issues/8) Gulp로 workflow 자동화 (inko.min.js 파일 생성), Bower에 inko 등록
- v1.0.5 (2018.08.11) : inko.js에서 `package.json` 파일을 import하는 부분 제거

## Dependent tools
- [Inko CLI](https://github.com/JonJee/inko-cli) - Use Inko on the command line.

## Installation

### npm

```bash
npm install inko
```

### yarn

```bash
yarn add inko
```

### As Browser module

CDN
```html
<script src="https://cdn.jsdelivr.net/npm/inko@1.0.5/inko.min.js"></script>
```

Bower
```bash
bower install inko
```

## Usage
```
var Inko = require('inko');
var inko = Inko();
```

### 영어 → 한글
```
inko.en2ko('dkssudgktpdy tptkd!');
// 안녕하세요 세상!
```

### 한글 → 영어
```
inko.ko2en('ㅗ디ㅣㅐ 재깅!');
// hello world!
```

## TODO LIST
- [ ] develop @types/inko module for typescript
- [x] add gulp file to minify inko.js or do something
- [x] launch inkojs official introduction website
- [x] improve inkojs logo

## Contributing
이 오픈소스 프로젝트에 누구나 기여할 수 있습니다. 기여하고 싶은 분들은 이 레포지토리를 포크한 후 풀리퀘스트 요청해주세요!

## License
Inko.js is released under the MIT License. See [LICENSE](https://github.com/jonjee/inko/blob/master/LICENSE) file for details.
