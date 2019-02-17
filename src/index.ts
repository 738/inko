// (c) 2018, 2019 Humphrey Ahn, Jon Jee
import { isVowel, indexOfEnglish } from './utils/utils';
import {
    jungSung,
    jongSung,
    firstKorComb,
    lastKorComb,
    choSung,
    korSyllabi,
    firstElement,
    lastElement,
    CONNECTABLE_CONSONANT,
    CONNECTABLE_VOWEL,
} from './utils/constants';
export interface Option {
    allowDoubleConsonant?: boolean;
}

// Inko class
export class Inko {
    _allowDoubleConsonant?: boolean;
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

    en2ko(eng: string, _option?: Option): string {
        var option: Option = _option || {};

        var allowDoubleConsonant =
            typeof option.allowDoubleConsonant !== 'undefined' ?
                option.allowDoubleConsonant : this._allowDoubleConsonant;
        var self = this;
        var stateLength = [0, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5];
        var transitions = [
            [1, 1, 2, 2], // 0, EMPTY
            [3, 1, 4, 4], // 1, 자
            [1, 1, 5, 2], // 2, 모
            [3, 1, 4, -1], // 3, 자자
            [6, 1, 7, 2], // 4, 자모
            [1, 1, 2, 2], // 5, 모모
            [9, 1, 4, 4], // 6, 자모자
            [9, 1, 2, 2], // 7, 자모모
            [1, 1, 4, 4], // 8, 자모자자
            [10, 1, 4, 4],// 9, 자모모자
            [1, 1, 4, 4], // 10, 자모모자자
        ];

        var last = function (list: any[]) {
            return list[list.length - 1];
        };

        var combine = function (arr: any[]) {
            var group: any[] = [];
            arr.forEach(function (cur, i) {
                var h = korSyllabi[cur];
                if (i === 0 || isVowel(last(group)[0]) !== isVowel(h)) {
                    group.push([]);
                }
                last(group).push(h);
            });

            group = group.map(function connect(e) {
                var w = e.join('');
                return CONNECTABLE_CONSONANT[w] || CONNECTABLE_VOWEL[w] || w;
            });

            if (group.length === 1) return group[0];

            var charSet = [choSung, jungSung, jongSung];
            var code = group.map(function (w, i) {
                return charSet[i].indexOf(w);
            });

            if (code.length < 3) code.push(-1);

            return self.koGenerate.apply(self, code as [number, number, number]);
        };

        return (function () {
            var length = eng.length;
            var last = -1;
            var result: any[] = [];
            var state = 0;
            var tmp: any[] = [];

            var flush = function () {
                if (tmp.length > 0) result.push(combine(tmp));
                tmp = [];
            };

            for (var i = 0; i < length; ++i) {
                var chr = eng[i];
                var cur = indexOfEnglish[chr];
                if (typeof cur === 'undefined') {
                    state = 0;
                    flush();
                    result.push(chr);
                } else {
                    var transition = (function () {
                        var c = (korSyllabi[last] || '') + korSyllabi[cur];
                        var lastIsVowel = isVowel(korSyllabi[last]);
                        var curIsVowel = isVowel(korSyllabi[cur]);
                        if (!curIsVowel) {
                            if (lastIsVowel) {
                                return 'ㄸㅃㅉ'.indexOf(korSyllabi[cur]) === -1 ? 0 : 1;
                            }
                            if (state === 1 && !allowDoubleConsonant) return 1;
                            return CONNECTABLE_CONSONANT[c] ? 0 : 1;
                        } else if (lastIsVowel) {
                            return CONNECTABLE_VOWEL[c] ? 2 : 3;
                        }
                        return 2;
                    }());
                    var nxtState = transitions[state][transition];
                    tmp.push(cur);
                    var diff = tmp.length - stateLength[nxtState];
                    if (diff) result.push(combine(tmp.splice(0, diff)));
                    state = nxtState;
                    last = cur;
                }
            }
            flush();
            return result.join('');
        }());
    }
    ko2en(kor: string, option?: Option): string {
        return "";
    }
    // need to work on cuz theres no character in typescript
    //   한글생성 -> koGenerate
    koGenerate(choSung: number, jungSung: number, jongSung: number): string {
        return String.fromCharCode(
            44032 +
            choSung * 588 +
            jungSung * 28 +
            jongSung +
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
