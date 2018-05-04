var assert = require('assert');
var en2ko = require('../en2ko');

describe('en2ko', () => {
    it('should return 안녕하세요 when the input is dkssudgktpdy', () => {
        assert.equal(en2ko('dkssudgktpdy'), '안녕하세요');
    });
});
