<h1 align="center">
    <img height="250" src="https://github.com/738/inko/blob/master/images/inko_logo.png?raw=true" />
    <br> Inko.js
</h1>

<p align="center">
  <a href="https://circleci.com/gh/738/inko/tree/master">
    <img src="https://circleci.com/gh/738/inko/tree/master.svg?style=svg" />
  </a>
  <a href="https://github.com/738/inko">
    <img src="https://img.shields.io/github/stars/738/inko.svg?style=social&label=Stars" />
  </a>
  <a href="https://npmjs.com/package/inko">
    <img src="https://img.shields.io/npm/v/inko.svg" alt="version" />
  </a>
  <a href="https://npmjs.com/package/inko">
    <img src="https://img.shields.io/npm/dm/inko.svg?style=flat-square" />
  </a>
  <a href="https://www.jsdelivr.com/package/npm/inko">
    <img src="https://data.jsdelivr.com/v1/package/npm/inko/badge" />
  </a>
  <a href="https://github.com/738/inko/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/738/inko.svg" />
  </a>
</p>

<p align="center">
  <b>Open Source Library, Converting Misspelled English characters into Korean letters (& vice versa)</b></br>
</p>

<br />

# Getting Started
- 영타를 한글로 쳤을 때, 혹은 한타를 영어로 변환해주는 기능을 가진 자바스크립트 오픈소스 라이브러리입니다.
- [Inko Offical Website](https://inko.js.org) has been launched!
- [Inko 한영타변환기 Chrome Extension](https://chrome.google.com/webstore/detail/inko-%ED%95%9C%EC%98%81%ED%83%80%EB%B3%80%ED%99%98%EA%B8%B0/bijdbcchfaolmleinaghdbnemmdabbmn?hl=ko) has been launched! (2019.03.25)

## Release Note
| Version | Release Date | Changes | Contributors |
|--------|--------------|---------|-------------|
| v1.0.3  | 2018.08.07   | [#7](https://github.com/738/inko/issues/7) 영타 -> 한글로 변환 시켜주는 로직 수정. 알파벳 소문자 26개, 대문자 26개 총 52개에 맞춰서 한글과 매핑함.| [738](https://github.com/738)|
| v1.0.4  | 2018.08.11   | [#4](https://github.com/738/inko/issues/4) Gulp로 workflow 자동화 (inko.min.js 파일 생성), [#8](https://github.com/738/inko/issues/8) Bower에 라이브러리 등록 | [738](https://github.com/738) |
| v1.0.5  | 2018.08.11   | inko.js에서 `package.json` 파일을 import하는 부분 제거 | [738](https://github.com/738) |
| v1.0.6  | 2018.08.25   | [#12](https://github.com/738/inko/issues/12) hlhlhl -> ㅚㅗㅣㅗㅣ로 변환되는 버그 수정, [#14](https://github.com/738/inko/issues/14) rtk -> ꦵ로 변환되는 버그 수정, [#15](https://github.com/738/inko/issues/15) 복자음 가능 여부 옵션화, `config` 함수 추가 | [algoshipda](https://github.com/algoshipda), [738](https://github.com/738) |
| v1.0.7  | 2019.04.21   | [#22](https://github.com/738/inko/issues/22) `is한글` 함수에서 "가" ~ "긯" 범위를 한글로 인식하지 않는 버그 수정 | [738](https://github.com/738), [EntryDark](https://github.com/EntryDark) |
| v1.1.0  | 2019.04.22   | [#6](https://github.com/738/inko/issues/6) index.d.ts 지원, [#21](https://github.com/738/inko/issues/21) circleci 연동 | [738](https://github.com/738) |
| v1.1.1  | 2019.07.31   | 홈페이지 주소 변경 (https://inko.js.org), npm 다운로드 배지 추가 | [738](https://github.com/738) |

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
<script src="https://cdn.jsdelivr.net/npm/inko@1.1.1/inko.min.js"></script>
```

Bower
```bash
bower install inko
```

## Usage
```js
var Inko = require('inko');
var inko = new Inko();

// ES6
import Inko from 'inko';
let inko = new Inko();
```

### 영어 → 한글
```js
inko.en2ko('dkssudgktpdy tptkd!');
// 안녕하세요 세상!
```

### 한글 → 영어
```js
inko.ko2en('ㅗ디ㅣㅐ 재깅!');
// hello world!
```

### 복자음 가능 여부 설정
```js
// allowDoubleConsonant의 기본값은 false입니다
var option = {
  allowDoubleConsonant: true
}
```

#### 설정을 부여하는 방법은 아래의 세 가지 방법으로 지원합니다.
1. 인스턴스 생성할 때 생성자의 인자로 설정 부여
```js
var inko = Inko(option);
```

2. `config` 함수로 설정 부여
```js
inko.config(option);
```

3. `en2ko` 함수의 인자로 설정 부여
```js
inko.en2ko('rtrt', option);
// output: ㄳㄳ
inko.en2ko('rtrt', { allowDoubleConsonant: false });
// output: ㄱㅅㄱㅅ
```

## Related
* [inko-cli](https://github.com/738/inko-cli) - Use inko on the command line
* [inko-web](https://github.com/738/inko-web) - Inko official website
* [inko-chrome-extension](https://github.com/738/inko-chrome-extension) - Inko chrome extension
* [alfred-inko](https://github.com/738/alfred-inko) - Alfred 3 workflow to convert misspelled English characters into Korean letters (& vice versa)

## Contributors
| [<img src="https://avatars0.githubusercontent.com/u/36702053?s=200&v=4" width="50px" align="center"/><br /><sub><b>738 (Jon Jee)</b></sub>](https://github.com/738) | [<img src="https://avatars2.githubusercontent.com/u/12122155?s=200&v=4" width="50px" align="center"/><br /><sub><b>algoshipda</b></sub>](https://github.com/algoshipda) | [<img src="https://avatars3.githubusercontent.com/u/24207964?s=200&v=4" width="50px" align="center"/><br /><sub><b>ahnsv</b></sub>](https://github.com/ahnsv) | [<img src="https://avatars1.githubusercontent.com/u/29385395?s=200&v=4" width="50px" align="center"/><br /><sub><b>hyoungsp</b></sub>](https://github.com/hyoungsp) | [<img src="https://avatars1.githubusercontent.com/u/39438507?s=50&v=4" width="50px" align="center"/><br /><sub><b>joonghyeob-shin</b></sub>](https://github.com/joonghyeob-shin) |
|--|--|--|--|--|

## Contributing
이 오픈소스 프로젝트에 누구나 기여할 수 있습니다. 기여하고 싶은 분들은 이 레포지토리를 포크한 후 풀리퀘스트 요청해주세요!

## License
Inko.js is released under the MIT License. See [LICENSE](https://github.com/738/inko/blob/master/LICENSE) file for details.
