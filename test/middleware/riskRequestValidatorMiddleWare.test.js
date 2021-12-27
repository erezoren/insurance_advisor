var riskRequestValidator = require(
    '../../lib/middleware/riskRequestValidatorMiddleWare')
const expect = require('chai').expect;
const sinon = require("sinon");

describe('riskRequestValidatorMiddleWare tests', function () {

  it('test valid request should call next() to continue',
      function (done) {
        const req = {
          body: {
            "age": 35,
            "dependents": 2,
            "house": {"ownership_status": "owned"},
            "income": 0,
            "marital_status": "married",
            "risk_questions": [0, 1, 0],
            "vehicle": {"year": 2018}
          }
        }
        let res = {};
        riskRequestValidator(req, res, () => {
          expect(res).to.deep.equal({})
          done();
        });

      })

  it('test invalid request due to missing mandatory age should call next() to continue',
      function (done) {
        const req = {
          body: {
            "dependents": 2,
            "house": {"ownership_status": "owned"},
            "income": 0,
            "marital_status": "married",
            "risk_questions": [0, 1, 0],
            "vehicle": {"year": 2018}
          }
        }
        let res = {
          send: (error) => expect(error).to.deep.equal(
              {success: false, error: 'Age must be present in request and > 0'})
        }
        riskRequestValidator(req, res, (arg) => {
         console.log(JSON.stringify(arg))
          expect(arg["__flags"]["object"]).to.deep.eq({
                "success": false,
                "error": "Age must be present in request and > 0"
              })
          })
          done();
        });

});