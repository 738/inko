var assert = require('assert');
var en2ko = require('../en2ko');

describe('en2ko', () => {
    it('영타 -> 한글', () => {
        assert.equal(en2ko('dkssud'), '안녕');
        assert.equal(en2ko('dkssudgktpdy'), '안녕하세요');
        assert.equal(en2ko('rkskekfk'), '가나다라');
        assert.equal(en2ko('rldjrsktpdy?'), '기억나세요?');
        assert.equal(en2ko('anjgoqnpfrqnpfr'), '뭐해 뷁뷁');
        assert.equal(en2ko('rldjr wjvusdp wjrk todrkrsk'), '기억 저편에 너가 생각나');
    });
});
