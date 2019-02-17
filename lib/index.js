"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// (c) 2018, 2019 Humphrey Ahn, Jon Jee
var utils_1 = require("./utils/utils");
var constants_1 = require("./utils/constants");
// Inko class
var Inko = /** @class */ (function () {
    function Inko(option) {
        this.VERSION = "1.0.7";
        if (option != undefined) {
            this._allowDoubleConsonant = option.allowDoubleConsonant;
        }
        else {
            this._allowDoubleConsonant = false;
        }
        return this;
    }
    // does same thing as constructor, need to get rid of this
    Inko.prototype.config = function (option) {
        if (option != undefined) {
            this._allowDoubleConsonant = option.allowDoubleConsonant;
        }
        else {
            this._allowDoubleConsonant = false;
        }
        return this;
    };
    Inko.prototype.en2ko = function (eng, _option) {
        var option = _option || {};
        var allowDoubleConsonant = typeof option.allowDoubleConsonant !== 'undefined' ?
            option.allowDoubleConsonant : this._allowDoubleConsonant;
        var self = this;
        var stateLength = [0, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5];
        var transitions = [
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
            [1, 1, 4, 4],
        ];
        var last = function (list) {
            return list[list.length - 1];
        };
        var combine = function (arr) {
            var group = [];
            arr.forEach(function (cur, i) {
                var h = constants_1.korSyllabi[cur];
                if (i === 0 || utils_1.isVowel(last(group)[0]) !== utils_1.isVowel(h)) {
                    group.push([]);
                }
                last(group).push(h);
            });
            group = group.map(function connect(e) {
                var w = e.join('');
                return constants_1.CONNECTABLE_CONSONANT[w] || constants_1.CONNECTABLE_VOWEL[w] || w;
            });
            if (group.length === 1)
                return group[0];
            var charSet = [constants_1.choSung, constants_1.jungSung, constants_1.jongSung];
            var code = group.map(function (w, i) {
                return charSet[i].indexOf(w);
            });
            if (code.length < 3)
                code.push(-1);
            return self.koGenerate.apply(self, code);
        };
        return (function () {
            var length = eng.length;
            var last = -1;
            var result = [];
            var state = 0;
            var tmp = [];
            var flush = function () {
                if (tmp.length > 0)
                    result.push(combine(tmp));
                tmp = [];
            };
            for (var i = 0; i < length; ++i) {
                var chr = eng[i];
                var cur = utils_1.indexOfEnglish[chr];
                if (typeof cur === 'undefined') {
                    state = 0;
                    flush();
                    result.push(chr);
                }
                else {
                    var transition = (function () {
                        var c = (constants_1.korSyllabi[last] || '') + constants_1.korSyllabi[cur];
                        var lastIsVowel = utils_1.isVowel(constants_1.korSyllabi[last]);
                        var curIsVowel = utils_1.isVowel(constants_1.korSyllabi[cur]);
                        if (!curIsVowel) {
                            if (lastIsVowel) {
                                return 'ㄸㅃㅉ'.indexOf(constants_1.korSyllabi[cur]) === -1 ? 0 : 1;
                            }
                            if (state === 1 && !allowDoubleConsonant)
                                return 1;
                            return constants_1.CONNECTABLE_CONSONANT[c] ? 0 : 1;
                        }
                        else if (lastIsVowel) {
                            return constants_1.CONNECTABLE_VOWEL[c] ? 2 : 3;
                        }
                        return 2;
                    }());
                    var nxtState = transitions[state][transition];
                    tmp.push(cur);
                    var diff = tmp.length - stateLength[nxtState];
                    if (diff)
                        result.push(combine(tmp.splice(0, diff)));
                    state = nxtState;
                    last = cur;
                }
            }
            flush();
            return result.join('');
        }());
    };
    Inko.prototype.ko2en = function (kor, option) {
        return "";
    };
    // need to work on cuz theres no character in typescript
    //   한글생성 -> koGenerate
    Inko.prototype.koGenerate = function (choSung, jungSung, jongSung) {
        return String.fromCharCode(44032 +
            choSung * 588 +
            jungSung * 28 +
            jongSung +
            1);
    };
    //   한글분리 -> koSeparate
    Inko.prototype.koSeparate = function (kor) {
        var charCode = kor.charCodeAt(0);
        if (charCode >= constants_1.firstKorComb && charCode <= constants_1.lastKorComb) {
            var choCharCode = Math.floor((charCode - constants_1.firstKorComb) / 588);
            var jungCharCode_1 = Math.floor((charCode - constants_1.firstKorComb - choCharCode * 588) / 28);
            var jongCharCode = charCode - constants_1.firstKorComb - choCharCode * 588 - jungCharCode_1 * 28 - 1;
            var jungCharCode1_1 = jungCharCode_1, jungCharCode2_1 = -1, jongCharCode1 = jongCharCode, jongCharCode2 = -1;
            if (jungCharCode_1 == constants_1.jungSung.indexOf("ㅘ"))
                (jungCharCode1_1 = constants_1.korSyllabi.indexOf("ㅗ")),
                    (jungCharCode2_1 = constants_1.korSyllabi.indexOf("ㅏ"));
            else if (jungCharCode_1 == constants_1.jungSung.indexOf("ㅙ"))
                (jungCharCode1_1 = constants_1.korSyllabi.indexOf("ㅗ")),
                    (jungCharCode2_1 = constants_1.korSyllabi.indexOf("ㅐ"));
            else if (jungCharCode_1 == constants_1.jungSung.indexOf("ㅚ"))
                (jungCharCode1_1 = constants_1.korSyllabi.indexOf("ㅗ")),
                    (jungCharCode2_1 = constants_1.korSyllabi.indexOf("ㅣ"));
            else if (jungCharCode_1 == constants_1.jungSung.indexOf("ㅝ"))
                (jungCharCode1_1 = constants_1.korSyllabi.indexOf("ㅜ")),
                    (jungCharCode2_1 = constants_1.korSyllabi.indexOf("ㅓ"));
            else if (jungCharCode_1 == constants_1.jungSung.indexOf("ㅞ"))
                (jungCharCode1_1 = constants_1.korSyllabi.indexOf("ㅜ")),
                    (jungCharCode2_1 = constants_1.korSyllabi.indexOf("ㅔ"));
            else if (jungCharCode_1 == constants_1.jungSung.indexOf("ㅟ"))
                (jungCharCode1_1 = constants_1.korSyllabi.indexOf("ㅜ")),
                    (jungCharCode2_1 = constants_1.korSyllabi.indexOf("ㅣ"));
            else if (jungCharCode_1 == constants_1.jungSung.indexOf("ㅢ"))
                (jungCharCode1_1 = constants_1.korSyllabi.indexOf("ㅡ")),
                    (jungCharCode2_1 = constants_1.korSyllabi.indexOf("ㅣ"));
            if (jongCharCode == constants_1.jongSung.indexOf("ㄳ"))
                (jongCharCode1 = constants_1.korSyllabi.indexOf("ㄱ")),
                    (jongCharCode2 = constants_1.korSyllabi.indexOf("ㅅ"));
            else if (jongCharCode == constants_1.jongSung.indexOf("ㄵ"))
                (jongCharCode1 = constants_1.korSyllabi.indexOf("ㄴ")),
                    (jongCharCode2 = constants_1.korSyllabi.indexOf("ㅈ"));
            else if (jongCharCode == constants_1.jongSung.indexOf("ㄶ"))
                (jongCharCode1 = constants_1.korSyllabi.indexOf("ㄴ")),
                    (jongCharCode2 = constants_1.korSyllabi.indexOf("ㅎ"));
            else if (jongCharCode == constants_1.jongSung.indexOf("ㄺ"))
                (jongCharCode1 = constants_1.korSyllabi.indexOf("ㄹ")),
                    (jongCharCode2 = constants_1.korSyllabi.indexOf("ㄱ"));
            else if (jongCharCode == constants_1.jongSung.indexOf("ㄻ"))
                (jongCharCode1 = constants_1.korSyllabi.indexOf("ㄹ")),
                    (jongCharCode2 = constants_1.korSyllabi.indexOf("ㅁ"));
            else if (jongCharCode == constants_1.jongSung.indexOf("ㄼ"))
                (jongCharCode1 = constants_1.korSyllabi.indexOf("ㄹ")),
                    (jongCharCode2 = constants_1.korSyllabi.indexOf("ㅂ"));
            else if (jongCharCode == constants_1.jongSung.indexOf("ㄽ"))
                (jongCharCode1 = constants_1.korSyllabi.indexOf("ㄹ")),
                    (jongCharCode2 = constants_1.korSyllabi.indexOf("ㅅ"));
            else if (jongCharCode == constants_1.jongSung.indexOf("ㄾ"))
                (jongCharCode1 = constants_1.korSyllabi.indexOf("ㄹ")),
                    (jongCharCode2 = constants_1.korSyllabi.indexOf("ㅌ"));
            else if (jongCharCode == constants_1.jongSung.indexOf("ㄿ"))
                (jongCharCode1 = constants_1.korSyllabi.indexOf("ㄹ")),
                    (jongCharCode2 = constants_1.korSyllabi.indexOf("ㅍ"));
            else if (jongCharCode == constants_1.jongSung.indexOf("ㅀ"))
                (jongCharCode1 = constants_1.korSyllabi.indexOf("ㄹ")),
                    (jongCharCode2 = constants_1.korSyllabi.indexOf("ㅎ"));
            else if (jongCharCode == constants_1.jongSung.indexOf("ㅄ"))
                (jongCharCode1 = constants_1.korSyllabi.indexOf("ㅂ")),
                    (jongCharCode2 = constants_1.korSyllabi.indexOf("ㅅ"));
            // 복모음이 아니라면
            if (jungCharCode2_1 === -1)
                jungCharCode1_1 = constants_1.korSyllabi.indexOf(constants_1.jungSung[jungCharCode_1]);
            // 복자음이 아니라면
            if (jongCharCode2 === -1)
                jongCharCode1 = constants_1.korSyllabi.indexOf(constants_1.jongSung[jongCharCode]);
            return [
                choCharCode,
                jungCharCode1_1,
                jungCharCode2_1,
                jongCharCode1,
                jongCharCode2
            ];
        }
        else if (charCode >= constants_1.firstElement && charCode <= constants_1.lastElement) {
            if (constants_1.choSung.indexOf(kor) > -1) {
                var 초 = constants_1.korSyllabi.indexOf(kor);
                return [초, -1, -1, -1, -1];
            }
            else if (constants_1.jungSung.indexOf(kor) > -1) {
                var jungCharCode = constants_1.jungSung.indexOf(kor);
                var jungCharCode1 = jungCharCode, jungCharCode2 = -1;
                if (jungCharCode == constants_1.jungSung.indexOf("ㅘ"))
                    (jungCharCode1 = constants_1.korSyllabi.indexOf("ㅗ")),
                        (jungCharCode2 = constants_1.korSyllabi.indexOf("ㅏ"));
                else if (jungCharCode == constants_1.jungSung.indexOf("ㅙ"))
                    (jungCharCode1 = constants_1.korSyllabi.indexOf("ㅗ")),
                        (jungCharCode2 = constants_1.korSyllabi.indexOf("ㅐ"));
                else if (jungCharCode == constants_1.jungSung.indexOf("ㅚ"))
                    (jungCharCode1 = constants_1.korSyllabi.indexOf("ㅗ")),
                        (jungCharCode2 = constants_1.korSyllabi.indexOf("ㅣ"));
                else if (jungCharCode == constants_1.jungSung.indexOf("ㅝ"))
                    (jungCharCode1 = constants_1.korSyllabi.indexOf("ㅜ")),
                        (jungCharCode2 = constants_1.korSyllabi.indexOf("ㅓ"));
                else if (jungCharCode == constants_1.jungSung.indexOf("ㅞ"))
                    (jungCharCode1 = constants_1.korSyllabi.indexOf("ㅜ")),
                        (jungCharCode2 = constants_1.korSyllabi.indexOf("ㅔ"));
                else if (jungCharCode == constants_1.jungSung.indexOf("ㅟ"))
                    (jungCharCode1 = constants_1.korSyllabi.indexOf("ㅜ")),
                        (jungCharCode2 = constants_1.korSyllabi.indexOf("ㅣ"));
                else if (jungCharCode == constants_1.jungSung.indexOf("ㅢ"))
                    (jungCharCode1 = constants_1.korSyllabi.indexOf("ㅡ")),
                        (jungCharCode2 = constants_1.korSyllabi.indexOf("ㅣ"));
                // 복모음이 아니라면
                if (jungCharCode2 === -1)
                    jungCharCode1 = constants_1.korSyllabi.indexOf(constants_1.jungSung[jungCharCode]);
                return [-1, jungCharCode1, jungCharCode2, -1, -1];
            }
        }
        return [-1, -1, -1, -1, -1];
    };
    //   is한글 -> isKorean
    Inko.prototype.isKorean = function (char) {
        if (char.length > 1)
            throw new Error("한 글자가 아닙니다.");
        return /[ㄱ-ㅎ|ㅏ-ㅣ|기-힣]/.test(char);
    };
    return Inko;
}());
exports.Inko = Inko;
