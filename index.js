//  (c) 2018 Jon Jee
//  Inko may be freely distributed or modified under the MIT license.

(function () {
    // constants
    var 영어 = "rRseEfaqQtTdwWczxvgASDFGZXCVkoiOjpuPhynbmlYUIHJKLBNM";                         // 33 + 19개
    var 한글 = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅁㄴㅇㄹㅎㅋㅌㅊㅍㅏㅐㅑㅒㅓㅔㅕㅖㅗㅛㅜㅠㅡㅣㅛㅕㅑㅗㅓㅏㅣㅠㅜㅡ";      // 33 + 19개
    var 초성 = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";                          // 19개
    var 중성 = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";                       // 21개
    var 종성 = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";              // 27개
    var 첫모음 = 28;
    var 가 = 44032;
    var 힣 = 55203;
    var ㄱ = 12593;
    var ㅣ = 12643;

    var 영어index = (function (en) {
        var x = {};
        for (var i = 0; i < en.length; ++i) x[en[i]] = i;
        return x;
    }(영어));

    var 한글index = (function (kr) {
        var x = {};
        for (var i = 0; i < kr.length; ++i) x[kr[i]] = i;
        return x;
    }(한글));

    var connectableConsonant = {
        'ㄱㅅ': 'ㄳ',
        'ㄴㅈ': 'ㄵ',
        'ㄴㅎ': 'ㄶ',
        'ㄹㄱ': 'ㄺ',
        'ㄹㅁ': 'ㄻ',
        'ㄹㅂ': 'ㄼ',
        'ㄹㅅ': 'ㄽ',
        'ㄹㅌ': 'ㄾ',
        'ㄹㅍ': 'ㄿ',
        'ㄹㅎ': 'ㅀ',
        'ㅂㅅ': 'ㅄ'
    };

    var connectableVowel = {
        'ㅗㅏ': 'ㅘ',
        'ㅗㅐ': 'ㅙ',
        'ㅗㅣ': 'ㅚ',
        'ㅜㅓ': 'ㅝ',
        'ㅜㅔ': 'ㅞ',
        'ㅜㅣ': 'ㅟ',
        'ㅡㅣ': 'ㅢ'
    };

    var isVowel = function (e) {
        return 한글index[e] >= 첫모음;
    };

    // constructor
    function Inko(_option) {
        var option = _option || {};
        this._allowDoubleConsonant = typeof option.allowDoubleConsonant !== 'undefined' ?
            option.allowDoubleConsonant : false;
        return this;
    }

    Inko.prototype.config = function(_option) {
        var option = _option || {};
        this._allowDoubleConsonant = typeof option.allowDoubleConsonant !== 'undefined' ?
            option.allowDoubleConsonant : false;
    }

    Inko.prototype.VERSION = '1.1.1';

    Inko.prototype.en2ko = function (input, _option) {
        var option = _option || {};

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

        var last = function (list) {
            return list[list.length - 1];
        };

        var combine = function (arr) {
            var group = [];
            arr.forEach(function (cur, i) {
                var h = 한글[cur];
                if (i === 0 || isVowel(last(group)[0]) !== isVowel(h)) {
                    group.push([]);
                }
                last(group).push(h);
            });

            group = group.map(function connect(e) {
                var w = e.join('');
                return connectableConsonant[w] || connectableVowel[w] || w;
            });

            if (group.length === 1) return group[0];

            var charSet = [초성, 중성, 종성];
            var code = group.map(function (w, i) {
                return charSet[i].indexOf(w);
            });

            if (code.length < 3) code.push(-1);

            return self.한글생성.apply(self, code);
        };

        return (function () {
            var length = input.length;
            var last = -1;
            var result = [];
            var state = 0;
            var tmp = [];

            var flush = function () {
                if (tmp.length > 0) result.push(combine(tmp));
                tmp = [];
            };

            for (var i = 0; i < length; ++i) {
                var chr = input[i];
                var cur = 영어index[chr];
                if (typeof cur === 'undefined') {
                    state = 0;
                    flush();
                    result.push(chr);
                } else {
                    var transition = (function () {
                        var c = (한글[last] || '') + 한글[cur];
                        var lastIsVowel = isVowel(한글[last]);
                        var curIsVowel = isVowel(한글[cur]);
                        if (!curIsVowel) {
                            if (lastIsVowel) {
                                return 'ㄸㅃㅉ'.indexOf(한글[cur]) === -1 ? 0 : 1;
                            }
                            if (state === 1 && !allowDoubleConsonant) return 1;
                            return connectableConsonant[c] ? 0 : 1;
                        } else if (lastIsVowel) {
                            return connectableVowel[c] ? 2 : 3;
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
    };

    Inko.prototype.ko2en = function (input) {
        var result = '';
        if (input === '' || input === undefined) return result;
        var _분리 = [-1, -1, -1, -1, -1];

        for (var i = 0; i < input.length; i++) {
            var _한글 = input[i];
            var _코드 = _한글.charCodeAt();
            // 가 ~ 힣 사이에 있는 한글이라면
            if ((_코드 >= 가 && _코드 <= 힣) || (_코드 >= ㄱ && _코드 <= ㅣ)) {
                _분리 = this.한글분리(_한글);
            }
            // 한글이 아니라면
            else {
                result += _한글;
                // 분리 배열 초기화
                _분리 = [-1, -1, -1, -1, -1];
            }

            for (var j = 0; j < _분리.length; j++) {
                if (_분리[j] !== -1)
                    result += 영어[_분리[j]];
            }
        }
        return result;
    }

    // 초성, 중성, 종성의 charCode를 받아서 합친 한글의 charCode를 반환함
    Inko.prototype.한글생성 = function (초, 중, 종) {
        return String.fromCharCode(44032 + 초 * 588 + 중 * 28 + 종 + 1);
    }

    // 한글 입력값으로 받아서 초성, 중성, 종성 분리해줌
    Inko.prototype.한글분리 = function (_한글) {
        var 코드 = _한글.charCodeAt();

        if (코드 >= 가 && 코드 <= 힣) {
            var 초 = Math.floor((코드 - 가) / 588);
            var 중 = Math.floor((코드 - 가 - 초 * 588) / 28);
            var 종 = 코드 - 가 - 초 * 588 - 중 * 28 - 1;
            var 중1 = 중, 중2 = -1, 종1 = 종, 종2 = -1;

            if (중 == 중성.indexOf("ㅘ")) 중1 = 한글.indexOf("ㅗ"), 중2 = 한글.indexOf("ㅏ");
            else if (중 == 중성.indexOf("ㅙ")) 중1 = 한글.indexOf("ㅗ"), 중2 = 한글.indexOf("ㅐ");
            else if (중 == 중성.indexOf("ㅚ")) 중1 = 한글.indexOf("ㅗ"), 중2 = 한글.indexOf("ㅣ");
            else if (중 == 중성.indexOf("ㅝ")) 중1 = 한글.indexOf("ㅜ"), 중2 = 한글.indexOf("ㅓ");
            else if (중 == 중성.indexOf("ㅞ")) 중1 = 한글.indexOf("ㅜ"), 중2 = 한글.indexOf("ㅔ");
            else if (중 == 중성.indexOf("ㅟ")) 중1 = 한글.indexOf("ㅜ"), 중2 = 한글.indexOf("ㅣ");
            else if (중 == 중성.indexOf("ㅢ")) 중1 = 한글.indexOf("ㅡ"), 중2 = 한글.indexOf("ㅣ");

            if (종 == 종성.indexOf("ㄳ")) 종1 = 한글.indexOf("ㄱ"), 종2 = 한글.indexOf("ㅅ");
            else if (종 == 종성.indexOf("ㄵ")) 종1 = 한글.indexOf("ㄴ"), 종2 = 한글.indexOf("ㅈ");
            else if (종 == 종성.indexOf("ㄶ")) 종1 = 한글.indexOf("ㄴ"), 종2 = 한글.indexOf("ㅎ");
            else if (종 == 종성.indexOf("ㄺ")) 종1 = 한글.indexOf("ㄹ"), 종2 = 한글.indexOf("ㄱ");
            else if (종 == 종성.indexOf("ㄻ")) 종1 = 한글.indexOf("ㄹ"), 종2 = 한글.indexOf("ㅁ");
            else if (종 == 종성.indexOf("ㄼ")) 종1 = 한글.indexOf("ㄹ"), 종2 = 한글.indexOf("ㅂ");
            else if (종 == 종성.indexOf("ㄽ")) 종1 = 한글.indexOf("ㄹ"), 종2 = 한글.indexOf("ㅅ");
            else if (종 == 종성.indexOf("ㄾ")) 종1 = 한글.indexOf("ㄹ"), 종2 = 한글.indexOf("ㅌ");
            else if (종 == 종성.indexOf("ㄿ")) 종1 = 한글.indexOf("ㄹ"), 종2 = 한글.indexOf("ㅍ");
            else if (종 == 종성.indexOf("ㅀ")) 종1 = 한글.indexOf("ㄹ"), 종2 = 한글.indexOf("ㅎ");
            else if (종 == 종성.indexOf("ㅄ")) 종1 = 한글.indexOf("ㅂ"), 종2 = 한글.indexOf("ㅅ");

            // 복모음이 아니라면
            if (중2 === -1) 중1 = 한글.indexOf(중성[중]);

            // 복자음이 아니라면
            if (종2 === -1) 종1 = 한글.indexOf(종성[종]);

            return [초, 중1, 중2, 종1, 종2];
        } else if (코드 >= ㄱ && 코드 <= ㅣ) {
            if (초성.indexOf(_한글) > -1) {
                var 초 = 한글.indexOf(_한글);
                return [초, -1, -1, -1, -1];
            } else if (중성.indexOf(_한글) > -1) {
                var 중 = 중성.indexOf(_한글);
                var 중1 = 중, 중2 = -1;
                if (중 == 중성.indexOf("ㅘ")) 중1 = 한글.indexOf("ㅗ"), 중2 = 한글.indexOf("ㅏ");
                else if (중 == 중성.indexOf("ㅙ")) 중1 = 한글.indexOf("ㅗ"), 중2 = 한글.indexOf("ㅐ");
                else if (중 == 중성.indexOf("ㅚ")) 중1 = 한글.indexOf("ㅗ"), 중2 = 한글.indexOf("ㅣ");
                else if (중 == 중성.indexOf("ㅝ")) 중1 = 한글.indexOf("ㅜ"), 중2 = 한글.indexOf("ㅓ");
                else if (중 == 중성.indexOf("ㅞ")) 중1 = 한글.indexOf("ㅜ"), 중2 = 한글.indexOf("ㅔ");
                else if (중 == 중성.indexOf("ㅟ")) 중1 = 한글.indexOf("ㅜ"), 중2 = 한글.indexOf("ㅣ");
                else if (중 == 중성.indexOf("ㅢ")) 중1 = 한글.indexOf("ㅡ"), 중2 = 한글.indexOf("ㅣ");

                // 복모음이 아니라면
                if (중2 === -1) 중1 = 한글.indexOf(중성[중]);

                return [-1, 중1, 중2, -1, -1];
            }
        }
        return [-1, -1, -1, -1, -1];
    }

    Inko.prototype.is한글 = function (char) {
        if (char.length > 1) throw new Error("한 글자가 아닙니다.");
        return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(char);
    }

    // CommonJS module
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Inko;
        }
        exports.Inko = Inko;
    }

    // Register as an anonymous AMD module
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return Inko;
        });
    }

    // if there is a importsScrips object define chance for worker
    // allows worker to use full Chance functionality with seed
    if (typeof importScripts !== 'undefined') {
        inko = new Inko();
        self.Inko = Inko;
    }

    // If there is a window object, that at least has a document property,
    // instantiate and define chance on the window
    if (typeof window === "object" && typeof window.document === "object") {
        window.Inko = Inko;
        window.inko = new Inko();
    }
})();
