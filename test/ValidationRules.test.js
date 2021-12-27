const ValidationRules = require('../lib/rules/RiskEvaluationRules')
const expect = require('chai').expect;


describe('ValidationRules tests', function (done) {
  it('test getRules, should return the list size of current rules',
      function (done) {
        let grtRules = new ValidationRules().getRiskEvaluationRules();
        expect(grtRules.length).to.eq(11);
        done();
      });

});