const 영어 = "rRseEfaqQtTdwWczxvgkoiOjpuPhynbml";
const 한글 = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅏㅐㅑㅒㅓㅔㅕㅖㅗㅛㅜㅠㅡㅣ";
const 초성 = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const 중성 = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
const 종성 = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";
const 첫모음 = 19;


class Enko {
    en2ko(input) {
        let result = '';
        if (input === '' || input === undefined) return result;
        let _초성 = -1, _중성 = -1, _종성 = -1;
    
        /*
            1. 초성 + 중성 + 종성
            2. 초성 + 중성
            3. 초성
            4. 중성
        */
        for (let i = 0; i < input.length; i++) {
            let char = input[i];
            let index = 영어.indexOf(char);
            let _한글 = 한글[index];
            // console.log(index);
            // 한글이 아니라면
            if (index === -1) {
                const 새글자 = this.한글생성(_초성, _중성, _종성);
                // 전에 글자가 한글일 경우에만 새 글자 추가
                if(this.is한글(새글자)) result += 새글자;
                _초성 = -1, _중성 = -1, _종성 = -1;
                result += char;
            }
            // 자음이라면
            else if (index < 19) {
                // 초성이 없다면
                if (_초성 === -1) _초성 = 초성.indexOf(_한글);
                // 초성, 중성이 있고 종성이 없다면
                else if (_초성 !== -1 && _중성 !== -1 && _종성 === -1) {
                    // 다음 글자가 모음이라면
                    if (i + 1 !== input.length && 영어.indexOf(input[i + 1]) >= 첫모음) {
                        result += this.한글생성(_초성, _중성, _종성);
                        _초성 = 초성.indexOf(_한글);
                        _중성 = -1;
                    } 
                    // 다음 글자가 자음이라면
                    else {
                        _종성 = 종성.indexOf(_한글);
                    }
                }
                // 초성, 중성도 있고 종성도 있다면 (복자음)
                else if (_초성 !== -1 && _중성 !== -1 && _종성 !== -1) {
                    if (_종성 === 종성.indexOf('ㄱ') && index === 한글.indexOf('ㅅ')) _종성 = 종성.indexOf('ㄳ');   // 복자음 ㄳ
                    else if (_종성 === 종성.indexOf()) {
                        if (index === 한글.indexOf('ㅈ')) _종성 = 종성.indexOf('ㄵ');                            // 복자음 ㄵ
                        else if (index === 한글.indexOf('ㅎ')) _종성 = 종성.indexOf('ㄶ');                       // 복자음 ㄶ
                    }
                    else if (_종성 === 종성.indexOf('ㄹ')) {
                        if (index === 한글.indexOf('ㄱ')) _종성 = 종성.indexOf('ㄺ');                            // 복자음 ㄺ
                        else if (index === 한글.indexOf('ㅁ')) _종성 = 종성.indexOf('ㄻ');                       // 복자음 ㄻ
                        else if (index === 한글.indexOf('ㅂ')) _종성 = 종성.indexOf('ㄼ');                       // 복자음 ㄼ
                        else if (index === 한글.indexOf('ㅅ')) _종성 = 종성.indexOf('ㄽ');                       // 복자음 ㄽ
                        else if (index === 한글.indexOf('ㅌ')) _종성 = 종성.indexOf('ㄾ');                       // 복자음 ㄾ
                        else if (index === 한글.indexOf('ㅍ')) _종성 = 종성.indexOf('ㄿ');                       // 복자음 ㄿ
                        else if (index === 한글.indexOf('ㅎ')) _종성 = 종성.indexOf('ㅀ');                       // 복자음 ㅀ
                    }
                    else if (_종성 === 종성.indexOf('ㅂ') && index === 한글.indexOf('ㅅ')) _종성 = 종성.indexOf('ㅄ');  // 복자음 ㅄ
                    // 복자음이 아니라면 이전의 초, 중, 종 조합으로 한글을 생성한다.
                    else {
                        result += this.한글생성(_초성, _중성, _종성);
                        _초성 = -1, _중성 = -1, _종성 = -1;
                        _초성 = 초성.indexOf(_한글);
                    }
                }
            }
            // 모음이라면
            else {
                // 초성이 없다면 모음이 하나 왔다는 의미
                if (_초성 === -1) _중성 = 중성.indexOf(_한글);
                // 초성이 있고 중성이 없다면
                else if (_초성 !== -1 && _중성 === -1) _중성 = 중성.indexOf(_한글);
                // 초성이 있고 중성도 있다면 (복모음)
                else if (_초성 !== -1 && _중성 !== -1) {
                    if (_중성 === 중성.indexOf('ㅗ')) {
                        if (index === 한글.indexOf('ㅏ')) _중성 = 중성.indexOf('ㅘ');                               // 복모음 ㅘ
                        else if (index === 한글.indexOf('ㅐ')) _중성 = 중성.indexOf('ㅙ');                          // 복모음 ㅙ
                        else if (index === 한글.indexOf('ㅣ')) _중성 = 중성.indexOf('ㅚ');                          // 복모음 ㅚ
                    }
                    else if (_중성 === 중성.indexOf('ㅜ')) {
                        if (index === 한글.indexOf('ㅓ')) _중성 = 중성.indexOf('ㅝ');                               // 복모음 ㅝ
                        else if (index === 한글.indexOf('ㅔ')) _중성 = 중성.indexOf('ㅞ');                          // 복모음 ㅞ
                        else if (index === 한글.indexOf('ㅣ')) _중성 = 중성.indexOf('ㅟ');                          // 복모음 ㅟ
                    }
                    else if (_중성 === 중성.indexOf('ㅡ') && index === 한글.indexOf('ㅣ')) _중성 = 중성.indexOf('ㅢ');  // 복모음 ㅢ
                    // 복모음이 아니라면 이전의 초, 중 조합으로 한글을 생성한다.
                    else {
                        result += this.한글생성(_초성, _중성, _종성);
                        _초성 = -1, _중성 = -1, _종성 = -1;
                        _중성 = 중성.indexOf(_한글);
                    }
                }
            }
        }
        if (_초성 !== -1) {
            result += this.한글생성(_초성, _중성, _종성);
            _초성 = -1, _중성 = -1, _종성 = -1;
        }
        return result;
    }
    
    한글생성(초, 중, 종) {
        return String.fromCharCode(44032 + 초 * 588 + 중 * 28 + 종 + 1);
    }
    
    is한글(char) {
        if (char.length > 1) throw new Error("한글자가 아닙니다.");
        return /[ㄱ-ㅎ|ㅏ-ㅣ|기-힣]/.test(char);
    }
}

var enko = new Enko();
console.log(enko.en2ko('anjgo qnpfrqnpfr'));
console.log(enko.en2ko('qjshs  123'));
console.log(enko.en2ko('tpdy!'));
console.log(enko.en2ko('fnffnfkffk'));
// console.log(한글생성(-1,-1,-1));
// console.log(is한글("f"));

module.exports = Enko;