var riskRequestValidator = require(
    '../../lib/middleware/riskRequestValidatorMiddleWare')
const calculateScore = require("../../lib/rules/scoreCalculationEngine");
const EvaluationRule = require("../../lib/rules/EveluationRule");
const {disability_ineligible} = require("../../lib/model/constants");
const expect = require('chai').expect;

describe('scoreCalculationEngine tests', function () {

  it('test calculateScore with age rule should make disability ineligible',
      function (done) {
        let baseRequest = {
          "age": 22,
          "dependents": 2,
          "house": {
            "ownership_status": "owned"
          },
          "income": 0,
          "marital_status": "married",
          "risk_questions": [1, 1, 1],
          "vehicles": {
            "year": 4
          }
        }
        let rules = [
          new EvaluationRule((req) => req.age < 23,
              (req) => req.disability = disability_ineligible)
        ]
        let score = calculateScore(baseRequest, rules);
        expect(score).to.deep.equal({
          auto: 'responsible',
          disability: disability_ineligible,
          home: 'responsible',
          life: 'responsible'
        })
        done()
      })

});