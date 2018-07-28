var assert = require('assert');
var Enko = require('../enko');
var enko = new Enko();

describe('enko', () => {
    it('is한글', () => {
        한글배열 = ['ㄱ', 'ㄴ', 'ㅇ', 'ㅎ', 'ㅍ', 'ㅋ', '기', '긹', '닙', 'ㅜ', 'ㅢ', '뷁', '챀', '팥'];
        다른배열 = ['s', '1', 'D', '#', 'R', 'B', 'C', '9', 'a', ';', '=', '6', '3', 'P'];
        한글배열.forEach(value => {
            assert.equal(enko.is한글(value), true, `is한글(${value})에 잘못된 값이 나왔습니다.`);
        });
        다른배열.forEach(value => {
            assert.equal(enko.is한글(value), false, `is한글(${value})에 잘못된 값이 나왔습니다.`);
        });
    });

    it('한글생성', () => {
        assert.equal(enko.한글생성(0, 0, 0), '각');
        // assert.equal(enko.한글생성(3, 3, 3), '댄');
        // assert.equal(enko.한글생성(1, 10, 10), '꽯');
        // assert.equal(enko.한글생성(4, 6, 8), '뗡');
        // assert.equal(enko.한글생성(14, 15, 13), '췐');
    });

    it('영타 -> 한글', () => {
        assert.equal(enko.en2ko('dkssud'), '안녕');
        assert.equal(enko.en2ko('dkssudgktpdy'), '안녕하세요');
        assert.equal(enko.en2ko('rkskekfk'), '가나다라');
        assert.equal(enko.en2ko('rldjrsktpdy?'), '기억나세요?');
        assert.equal(enko.en2ko('anjgoqnpfrqnpfr'), '뭐해뷁뷁');
        assert.equal(enko.en2ko('anjgktpdy'), '뭐하세요');
        assert.equal(enko.en2ko('apfhd'), '메롱');
        assert.equal(enko.en2ko('fnffnfkffk'), '룰루랄라');
        assert.equal(enko.en2ko('rldjr wjvusdp sjrk todrkrsk'), '기억 저편에 너가 생각나');
        assert.equal(enko.en2ko('dmlrlthcla'), '의기소침');
        assert.equal(enko.en2ko('dho wjgksxp rmfjtpdy?'), '왜 저한테 그러세요?');
        assert.equal(enko.en2ko('woalTwlaks woaldjqtek.'), '재밌지만 재미없다.');
        assert.equal(enko.en2ko('dbfrhrdldltjstodsladms djswpsk skgksxp clswjfgktuTek.'), '율곡이이선생님은 언제나 나한테 친절하셨다.');
        assert.equal(enko.en2ko('alclwldksgrhtjdi rmfjf tn djqtdmf rjtdlek.'), '미치지않고서야 그럴 수 없을 것이다.');
        assert.equal(enko.en2ko('difralqtWyfq'), '얅밊쬷');
        assert.equal(enko.en2ko('diffkfldiffkdtud'), '얄라리얄랑셩');
    });
});
