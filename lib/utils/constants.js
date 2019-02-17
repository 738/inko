"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.engSyllabi = "rRseEfaqQtTdwWczxvgASDFGZXCVkoiOjpuPhynbmlYUIHJKLBNM"; // 33 + 19개
exports.korSyllabi = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅁㄴㅇㄹㅎㅋㅌㅊㅍㅏㅐㅑㅒㅓㅔㅕㅖㅗㅛㅜㅠㅡㅣㅛㅕㅑㅗㅓㅏㅣㅠㅜㅡ"; // 33 + 19개
exports.choSung = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ"; // 19개
exports.jungSung = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ"; // 21개
exports.jongSung = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ"; // 27개
exports.firstVowelCharCode = 28;
exports.firstKorComb = 44032;
exports.lastKorComb = 55203;
exports.firstElement = 12593;
exports.lastElement = 12643;
exports.STATELENGTHS = [0, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5];
exports.TRANSITIONS = [
    [1, 1, 2, 2],
    [3, 1, 4, 4],
    [1, 1, 5, 2],
    [3, 1, 4, -1],
    [6, 1, 7, 2],
    [1, 1, 2, 2],
    [9, 1, 4, 4],
    [9, 1, 2, 2],
    [1, 1, 4, 4],
    [10, 1, 4, 4],
    [1, 1, 4, 4] // 10, 자모모자자
];
exports.CONNECTABLE_CONSONANT = {
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
exports.CONNECTABLE_VOWEL = {
    ㅗㅏ: "ㅘ",
    ㅗㅐ: "ㅙ",
    ㅗㅣ: "ㅚ",
    ㅜㅓ: "ㅝ",
    ㅜㅔ: "ㅞ",
    ㅜㅣ: "ㅟ",
    ㅡㅣ: "ㅢ"
};
