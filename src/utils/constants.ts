import { CharKeyValuePair } from "./interfaces";
export const engSyllabi =
  "rRseEfaqQtTdwWczxvgASDFGZXCVkoiOjpuPhynbmlYUIHJKLBNM"; // 33 + 19개
export const korSyllabi =
  "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅁㄴㅇㄹㅎㅋㅌㅊㅍㅏㅐㅑㅒㅓㅔㅕㅖㅗㅛㅜㅠㅡㅣㅛㅕㅑㅗㅓㅏㅣㅠㅜㅡ"; // 33 + 19개
export const choSung = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ"; // 19개
export const jungSung = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ"; // 21개
export const jongSung =
  "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ"; // 27개
export const firstVowelCharCode = 28;
export const firstKorComb = 44032;
export const lastKorComb = 55203;
export const firstElement = 12593;
export const lastElement = 12643;
export const STATELENGTHS = [0, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5];
export const TRANSITIONS = [
  [1, 1, 2, 2], // 0, EMPTY
  [3, 1, 4, 4], // 1, 자
  [1, 1, 5, 2], // 2, 모
  [3, 1, 4, -1], // 3, 자자
  [6, 1, 7, 2], // 4, 자모
  [1, 1, 2, 2], // 5, 모모
  [9, 1, 4, 4], // 6, 자모자
  [9, 1, 2, 2], // 7, 자모모
  [1, 1, 4, 4], // 8, 자모자자
  [10, 1, 4, 4], // 9, 자모모자
  [1, 1, 4, 4] // 10, 자모모자자
];
export const CONNECTABLE_CONSONANT: CharKeyValuePair = {
  ㄱㅅ: "ㄳ",
  ㄴㅈ: "ㄵ",
  ㄴㅎ: "ㄶ",
  ㄹㄱ: "ㄺ",
  ㄹㅁ: "ㄻ",
  ㄹㅂ: "ㄼ",
  ㄹㅅ: "ㄽ",
  ㄹㅌ: "ㄾ",
  ㄹㅍ: "ㄿ",
  ㄹㅎ: "ㅀ",
  ㅂㅅ: "ㅄ"
};

export const CONNECTABLE_VOWEL: CharKeyValuePair = {
  ㅗㅏ: "ㅘ",
  ㅗㅐ: "ㅙ",
  ㅗㅣ: "ㅚ",
  ㅜㅓ: "ㅝ",
  ㅜㅔ: "ㅞ",
  ㅜㅣ: "ㅟ",
  ㅡㅣ: "ㅢ"
};
