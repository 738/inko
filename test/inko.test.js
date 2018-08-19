var assert = require('assert');
var Inko = require('../inko');
var inko = new Inko();

describe('inko', () => {
    console.log(`The version of inkojs is ${inko.VERSION}`);
    it('is한글', () => {
        한글배열 = ['ㄱ', 'ㄴ', 'ㅇ', 'ㅎ', 'ㅍ', 'ㅋ', '기', '긹', '닙', 'ㅜ', 'ㅢ', '뷁', '챀', '팥'];
        다른배열 = ['s', '1', 'D', '#', 'R', 'B', 'C', '9', 'a', ';', '=', '6', '3', 'P'];
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

    it('영타 -> 한글', () => {
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
        assert.equal(inko.en2ko('rtrt'), 'ㄳㄳ');
        assert.equal(inko.en2ko('hlhl'), 'ㅚㅚ');
        assert.equal(inko.en2ko('QlEkrgkrp'), '삐딱하게');
        assert.equal(inko.en2ko('ekfkawnl gjs cptqkznldp xkrhvk'),'다람쥐 헌 쳇바퀴에 타고파');
        assert.equal(inko.en2ko('EKFKAWNL GJS CPTQKZNLDP XKRHVK'), '따람쮜 헌 촀빠퀴예 타꼬파');
    });

    it('한타 -> 영어', () => {
        assert.equal(inko.ko2en('ㅗ디ㅣㅐ'), 'hello');
        assert.equal(inko.ko2en('ㅗ디ㅣㅐ 재깅!'), 'hello world!');
        assert.equal(inko.ko2en('ㅡㅛ ㄹ갸둥 ㅑㄴ ㅗ뭉내ㅡㄷ'), 'my friend is handsome');
        assert.equal(inko.ko2en('애 ㅛㅐㅕ ㄱ드드ㅠㄷㄱ ㅡㄷ?'), 'do you remember me?');
    });
});
