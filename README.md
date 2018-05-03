# en2ko(잉투코)

## General
- Since 2018.05.02
- 영어로 쳐야할 글을 한글로 쳤을 때, 혹은 한글로 쳐야할 글을 영어로 쳤을 때 변환해주는 기능을 가진 오픈소스입니다.

## How to install
```
npm install --save en2ko
```

## How to use
```
var ek = require('en2ko');
```

### 영타 -> 한글
```
ek.en2ko('dkssudgktpdy tptkd!');
// 안녕하세요 세상!
```

### 한타 -> 영문
```
ek.ko2en('ㅗ디ㅣㅐ 재깅!');
// hello world!
```
