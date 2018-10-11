// (c) 2018 Humphrey Ahn
import {} from "./utils/utils";
import {
  jungSung,
  jongSung,
  firstKorComb,
  lastKorComb,
  choSung,
  korSyllabi,
  firstElement,
  lastElement
} from "./utils/constants";
export interface Option {
  allowDoubleConsonant: boolean;
}

// Inko class
export class Inko {
  _allowDoubleConsonant!: boolean;
  VERSION = "1.0.7";
  constructor(option?: Option) {
    if (option != undefined) {
      this._allowDoubleConsonant = option.allowDoubleConsonant;
    } else {
      this._allowDoubleConsonant = false;
    }
    return this;
  }
  // does same thing as constructor, need to get rid of this
  config(option?: Option) {
    if (option != undefined) {
      this._allowDoubleConsonant = option.allowDoubleConsonant;
    } else {
      this._allowDoubleConsonant = false;
    }
    return this;
  }

  en2ko(eng: string, option?: Option): string {
    return "";
  }
  ko2en(kor: string, option?: Option): string {
    return "";
  }
  // need to work on cuz theres no character in typescript
  //   한글생성 -> koGenerate
  koGenerate(choSung: string, jungSung: string, jongSung: string): string {
    return String.fromCharCode(
      44032 +
        choSung.charCodeAt(0) * 588 +
        jungSung.charCodeAt(0) * 28 +
        jongSung.charCodeAt(0) +
        1
    );
  }
  //   한글분리 -> koSeparate
  koSeparate(kor: string): number[] {
    const charCode = kor.charCodeAt(0);
    if (charCode >= firstKorComb && charCode <= lastKorComb) {
      let choCharCode = Math.floor((charCode - firstKorComb) / 588);
      let jungCharCode = Math.floor(
        (charCode - firstKorComb - choCharCode * 588) / 28
      );
      let jongCharCode =
        charCode - firstKorComb - choCharCode * 588 - jungCharCode * 28 - 1;
      let jungCharCode1 = jungCharCode,
        jungCharCode2 = -1,
        jongCharCode1 = jongCharCode,
        jongCharCode2 = -1;

      if (jungCharCode == jungSung.indexOf("ㅘ"))
        (jungCharCode1 = korSyllabi.indexOf("ㅗ")),
          (jungCharCode2 = korSyllabi.indexOf("ㅏ"));
      else if (jungCharCode == jungSung.indexOf("ㅙ"))
        (jungCharCode1 = korSyllabi.indexOf("ㅗ")),
          (jungCharCode2 = korSyllabi.indexOf("ㅐ"));
      else if (jungCharCode == jungSung.indexOf("ㅚ"))
        (jungCharCode1 = korSyllabi.indexOf("ㅗ")),
          (jungCharCode2 = korSyllabi.indexOf("ㅣ"));
      else if (jungCharCode == jungSung.indexOf("ㅝ"))
        (jungCharCode1 = korSyllabi.indexOf("ㅜ")),
          (jungCharCode2 = korSyllabi.indexOf("ㅓ"));
      else if (jungCharCode == jungSung.indexOf("ㅞ"))
        (jungCharCode1 = korSyllabi.indexOf("ㅜ")),
          (jungCharCode2 = korSyllabi.indexOf("ㅔ"));
      else if (jungCharCode == jungSung.indexOf("ㅟ"))
        (jungCharCode1 = korSyllabi.indexOf("ㅜ")),
          (jungCharCode2 = korSyllabi.indexOf("ㅣ"));
      else if (jungCharCode == jungSung.indexOf("ㅢ"))
        (jungCharCode1 = korSyllabi.indexOf("ㅡ")),
          (jungCharCode2 = korSyllabi.indexOf("ㅣ"));

      if (jongCharCode == jongSung.indexOf("ㄳ"))
        (jongCharCode1 = korSyllabi.indexOf("ㄱ")),
          (jongCharCode2 = korSyllabi.indexOf("ㅅ"));
      else if (jongCharCode == jongSung.indexOf("ㄵ"))
        (jongCharCode1 = korSyllabi.indexOf("ㄴ")),
          (jongCharCode2 = korSyllabi.indexOf("ㅈ"));
      else if (jongCharCode == jongSung.indexOf("ㄶ"))
        (jongCharCode1 = korSyllabi.indexOf("ㄴ")),
          (jongCharCode2 = korSyllabi.indexOf("ㅎ"));
      else if (jongCharCode == jongSung.indexOf("ㄺ"))
        (jongCharCode1 = korSyllabi.indexOf("ㄹ")),
          (jongCharCode2 = korSyllabi.indexOf("ㄱ"));
      else if (jongCharCode == jongSung.indexOf("ㄻ"))
        (jongCharCode1 = korSyllabi.indexOf("ㄹ")),
          (jongCharCode2 = korSyllabi.indexOf("ㅁ"));
      else if (jongCharCode == jongSung.indexOf("ㄼ"))
        (jongCharCode1 = korSyllabi.indexOf("ㄹ")),
          (jongCharCode2 = korSyllabi.indexOf("ㅂ"));
      else if (jongCharCode == jongSung.indexOf("ㄽ"))
        (jongCharCode1 = korSyllabi.indexOf("ㄹ")),
          (jongCharCode2 = korSyllabi.indexOf("ㅅ"));
      else if (jongCharCode == jongSung.indexOf("ㄾ"))
        (jongCharCode1 = korSyllabi.indexOf("ㄹ")),
          (jongCharCode2 = korSyllabi.indexOf("ㅌ"));
      else if (jongCharCode == jongSung.indexOf("ㄿ"))
        (jongCharCode1 = korSyllabi.indexOf("ㄹ")),
          (jongCharCode2 = korSyllabi.indexOf("ㅍ"));
      else if (jongCharCode == jongSung.indexOf("ㅀ"))
        (jongCharCode1 = korSyllabi.indexOf("ㄹ")),
          (jongCharCode2 = korSyllabi.indexOf("ㅎ"));
      else if (jongCharCode == jongSung.indexOf("ㅄ"))
        (jongCharCode1 = korSyllabi.indexOf("ㅂ")),
          (jongCharCode2 = korSyllabi.indexOf("ㅅ"));

      // 복모음이 아니라면
      if (jungCharCode2 === -1)
        jungCharCode1 = korSyllabi.indexOf(jungSung[jungCharCode]);

      // 복자음이 아니라면
      if (jongCharCode2 === -1)
        jongCharCode1 = korSyllabi.indexOf(jongSung[jongCharCode]);

      return [
        choCharCode,
        jungCharCode1,
        jungCharCode2,
        jongCharCode1,
        jongCharCode2
      ];
    } else if (charCode >= firstElement && charCode <= lastElement) {
      if (choSung.indexOf(kor) > -1) {
        var 초 = korSyllabi.indexOf(kor);
        return [초, -1, -1, -1, -1];
      } else if (jungSung.indexOf(kor) > -1) {
        var jungCharCode = jungSung.indexOf(kor);
        var jungCharCode1 = jungCharCode,
          jungCharCode2 = -1;
        if (jungCharCode == jungSung.indexOf("ㅘ"))
          (jungCharCode1 = korSyllabi.indexOf("ㅗ")),
            (jungCharCode2 = korSyllabi.indexOf("ㅏ"));
        else if (jungCharCode == jungSung.indexOf("ㅙ"))
          (jungCharCode1 = korSyllabi.indexOf("ㅗ")),
            (jungCharCode2 = korSyllabi.indexOf("ㅐ"));
        else if (jungCharCode == jungSung.indexOf("ㅚ"))
          (jungCharCode1 = korSyllabi.indexOf("ㅗ")),
            (jungCharCode2 = korSyllabi.indexOf("ㅣ"));
        else if (jungCharCode == jungSung.indexOf("ㅝ"))
          (jungCharCode1 = korSyllabi.indexOf("ㅜ")),
            (jungCharCode2 = korSyllabi.indexOf("ㅓ"));
        else if (jungCharCode == jungSung.indexOf("ㅞ"))
          (jungCharCode1 = korSyllabi.indexOf("ㅜ")),
            (jungCharCode2 = korSyllabi.indexOf("ㅔ"));
        else if (jungCharCode == jungSung.indexOf("ㅟ"))
          (jungCharCode1 = korSyllabi.indexOf("ㅜ")),
            (jungCharCode2 = korSyllabi.indexOf("ㅣ"));
        else if (jungCharCode == jungSung.indexOf("ㅢ"))
          (jungCharCode1 = korSyllabi.indexOf("ㅡ")),
            (jungCharCode2 = korSyllabi.indexOf("ㅣ"));

        // 복모음이 아니라면
        if (jungCharCode2 === -1)
          jungCharCode1 = korSyllabi.indexOf(jungSung[jungCharCode]);

        return [-1, jungCharCode1, jungCharCode2, -1, -1];
      }
    }
    return [-1, -1, -1, -1, -1];
  }
  //   is한글 -> isKorean
  isKorean(char: string): boolean {
    if (char.length > 1) throw new Error("한 글자가 아닙니다.");
    return /[ㄱ-ㅎ|ㅏ-ㅣ|기-힣]/.test(char);
  }
}

const inko = new Inko({ allowDoubleConsonant: true });
