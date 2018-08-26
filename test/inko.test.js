var assert = require('assert');
var Inko = require('../inko');
var inko = new Inko();

describe('inko', () => {
    console.log(`The version of inkojs is ${inko.VERSION}`);
    it('is한글', () => {
        const 한글배열 = ['ㄱ', 'ㄴ', 'ㅇ', 'ㅎ', 'ㅍ', 'ㅋ', '기', '긹', '닙', 'ㅜ', 'ㅢ', '뷁', '챀', '팥'];
        const 다른배열 = ['s', '1', 'D', '#', 'R', 'B', 'C', '9', 'a', ';', '=', '6', '3', 'P'];
        한글배열.forEach(value => {
            assert.equal(inko.is한글(value), true, `is한글(${value})에 잘못된 값이 나왔습니다.`);
        });
        다른배열.forEach(value => {
            assert.equal(inko.is한글(value), false, `is한글(${value})에 잘못된 값이 나왔습니다.`);
        });
    });

    it('한글생성', () => {
        assert.equal(inko.한글생성(0, 0, 0), '각');
        assert.equal(inko.한글생성(3, 3, 3), '댼');
        assert.equal(inko.한글생성(1, 10, 10), '꽯');
        assert.equal(inko.한글생성(4, 6, 8), '뗡');
        assert.equal(inko.한글생성(14, 15, 13), '췚');
    });

    it('한글분리', () => {
        assert.deepEqual(inko.한글분리('님'), [2, 41, -1, 6, -1]);
        assert.deepEqual(inko.한글분리('가'), [0, 28, -1, -1, -1]);
        assert.deepEqual(inko.한글분리('뷁'), [7, 38, 33, 5, 0]);
        assert.deepEqual(inko.한글분리('없'), [11, 32, -1, 7, 9]);
    });

    it('영타 -> 한글 (복자음 허용 X)', () => {
        assert.equal(inko.en2ko('dkssud'), '안녕');
        assert.equal(inko.en2ko('dkssudgktpdy'), '안녕하세요');
        assert.equal(inko.en2ko('rkskekfk'), '가나다라');
        assert.equal(inko.en2ko('rldjrsktpdy?'), '기억나세요?');
        assert.equal(inko.en2ko('anjgoqnpfrqnpfr'), '뭐해뷁뷁');
        assert.equal(inko.en2ko('anjgktpdy'), '뭐하세요');
        assert.equal(inko.en2ko('apfhd'), '메롱');
        assert.equal(inko.en2ko('fnffnfkffk'), '룰루랄라');
        assert.equal(inko.en2ko('rldjr wjvusdp sjrk todrkrsk'), '기억 저편에 너가 생각나');
        assert.equal(inko.en2ko('dmlrlthcla'), '의기소침');
        assert.equal(inko.en2ko('dho wjgksxp rmfjtpdy?'), '왜 저한테 그러세요?');
        assert.equal(inko.en2ko('woalTwlaks woaldjqtek.'), '재밌지만 재미없다.');
        assert.equal(inko.en2ko('dbfrhrdldltjstodsladms djswpsk skgksxp clswjfgktuTek.'), '율곡이이선생님은 언제나 나한테 친절하셨다.');
        assert.equal(inko.en2ko('alclwldksgrhtjdi rmfjf tn djqtdmf rjtdlek.'), '미치지않고서야 그럴 수 없을 것이다.');
        assert.equal(inko.en2ko('difralqtWyfq'), '얅밊쬷');
        assert.equal(inko.en2ko('diffkfldiffkdtud'), '얄라리얄랑셩');
        assert.equal(inko.en2ko('DKSSUD'), '안녕');
        assert.equal(inko.en2ko('dUDn'), '여우');
        assert.equal(inko.en2ko('rrrr'), 'ㄱㄱㄱㄱ');
        assert.equal(inko.en2ko('hhhh'), 'ㅗㅗㅗㅗ');
        assert.equal(inko.en2ko('r s e f a q t d w c z x v g'), 'ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ');
        assert.equal(inko.en2ko('hlhl'), 'ㅚㅚ');
        assert.equal(inko.en2ko('QlEkrgkrp'), '삐딱하게');
        assert.equal(inko.en2ko('ekfkawnl gjs cptqkznldp xkrhvk'), '다람쥐 헌 쳇바퀴에 타고파');
        assert.equal(inko.en2ko('EKFKAWNL GJS CPTQKZNLDP XKRHVK'), '따람쮜 헌 촀빠퀴예 타꼬파');
        assert.equal(inko.en2ko('rtk'), 'ㄱ사');

        // different by allowDoubleConsonant option
        assert.equal(inko.en2ko('rtrt'), 'ㄱㅅㄱㅅ');
        assert.equal(inko.en2ko('rtrt', { allowDoubleConsonant: false }), 'ㄱㅅㄱㅅ');
        assert.equal(inko.en2ko('rsefaqtdwczxvg', { allowDoubleConsonant: false }), 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ');
    });

    it('영타 -> 한글 (복자음 허용 O)', () => {
        const o = () => ({ allowDoubleConsonant: true });
        assert.equal(inko.en2ko('dkssud', o()), '안녕');
        assert.equal(inko.en2ko('dkssudgktpdy', o()), '안녕하세요');
        assert.equal(inko.en2ko('rkskekfk', o()), '가나다라');
        assert.equal(inko.en2ko('rldjrsktpdy?', o()), '기억나세요?');
        assert.equal(inko.en2ko('anjgoqnpfrqnpfr', o()), '뭐해뷁뷁');
        assert.equal(inko.en2ko('anjgktpdy', o()), '뭐하세요');
        assert.equal(inko.en2ko('apfhd', o()), '메롱');
        assert.equal(inko.en2ko('fnffnfkffk', o()), '룰루랄라');
        assert.equal(inko.en2ko('rldjr wjvusdp sjrk todrkrsk', o()), '기억 저편에 너가 생각나');
        assert.equal(inko.en2ko('dmlrlthcla', o()), '의기소침');
        assert.equal(inko.en2ko('dho wjgksxp rmfjtpdy?', o()), '왜 저한테 그러세요?');
        assert.equal(inko.en2ko('woalTwlaks woaldjqtek.', o()), '재밌지만 재미없다.');
        assert.equal(inko.en2ko('dbfrhrdldltjstodsladms djswpsk skgksxp clswjfgktuTek.', o()), '율곡이이선생님은 언제나 나한테 친절하셨다.');
        assert.equal(inko.en2ko('alclwldksgrhtjdi rmfjf tn djqtdmf rjtdlek.', o()), '미치지않고서야 그럴 수 없을 것이다.');
        assert.equal(inko.en2ko('difralqtWyfq', o()), '얅밊쬷');
        assert.equal(inko.en2ko('diffkfldiffkdtud', o()), '얄라리얄랑셩');
        assert.equal(inko.en2ko('DKSSUD', o()), '안녕');
        assert.equal(inko.en2ko('dUDn', o()), '여우');
        assert.equal(inko.en2ko('rrrr', o()), 'ㄱㄱㄱㄱ');
        assert.equal(inko.en2ko('hhhh', o()), 'ㅗㅗㅗㅗ');
        assert.equal(inko.en2ko('r s e f a q t d w c z x v g', o()), 'ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ');
        assert.equal(inko.en2ko('hlhl', o()), 'ㅚㅚ');
        assert.equal(inko.en2ko('QlEkrgkrp', o()), '삐딱하게');
        assert.equal(inko.en2ko('ekfkawnl gjs cptqkznldp xkrhvk', o()), '다람쥐 헌 쳇바퀴에 타고파');
        assert.equal(inko.en2ko('EKFKAWNL GJS CPTQKZNLDP XKRHVK', o()), '따람쮜 헌 촀빠퀴예 타꼬파');
        assert.equal(inko.en2ko('rtk', o()), 'ㄱ사');

        // different by allowDoubleConsonant option
        assert.equal(inko.en2ko('rtrt', o()), 'ㄳㄳ');
        assert.equal(inko.en2ko('rsefaqtdwczxvg', o()), 'ㄱㄴㄷㄻㅄㅇㅈㅊㅋㅌㅍㅎ');
    });

    it('설정 부여 관련', () => {
        it('constructor에 allowDoubleConsonant: true 설정 부여', () => {
            let inko2 = new Inko({ allowDoubleConsonant: true });
            assert.equal(inko2.en2ko('rtrt'), 'ㄳㄳ');
            assert.equal(inko2.en2ko('rsefaqtdwczxvg'), 'ㄱㄴㄷㄻㅄㅇㅈㅊㅋㅌㅍㅎ');
        });

        it('constructor에 allowDoubleConsonant: false 설정 부여', () => {
            let inko3 = new Inko({ allowDoubleConsonant: false });
            assert.equal(inko3.en2ko('rtrt'), 'ㄱㅅㄱㅅ');
            assert.equal(inko3.en2ko('rsefaqtdwczxvg'), 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ');

            it('config 함수로 설정 부여', () => {
                inko3.config({ allowDoubleConsonant: true });
                assert.equal(inko3.en2ko('rtrt'), 'ㄳㄳ');
                assert.equal(inko3.en2ko('rsefaqtdwczxvg'), 'ㄱㄴㄷㄻㅄㅇㅈㅊㅋㅌㅍㅎ');
                inko3.config({ allowDoubleConsonant: false });
                assert.equal(inko3.en2ko('rtrt'), 'ㄱㅅㄱㅅ');
                assert.equal(inko3.en2ko('rsefaqtdwczxvg'), 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ');

                it('en2ko 함수에서 인자로 설정 부여', () => {
                    assert.equal(inko3.en2ko('rtrt', { allowDoubleConsonant: true }), 'ㄳㄳ');
                    assert.equal(inko3.en2ko('rsefaqtdwczxvg', { allowDoubleConsonant: true }), 'ㄱㄴㄷㄻㅄㅇㅈㅊㅋㅌㅍㅎ');
                });
            });
        });    
    });

    it('한타 -> 영어', () => {
        assert.equal(inko.ko2en('ㅗ디ㅣㅐ'), 'hello');
        assert.equal(inko.ko2en('ㅗ디ㅣㅐ 재깅!'), 'hello world!');
        assert.equal(inko.ko2en('ㅡㅛ ㄹ갸둥 ㅑㄴ ㅗ뭉내ㅡㄷ'), 'my friend is handsome');
        assert.equal(inko.ko2en('애 ㅛㅐㅕ ㄱ드드ㅠㄷㄱ ㅡㄷ?'), 'do you remember me?');
    });
});
