const sinon = require("sinon");
const controller = require('../../routes/insuranceAdvisorController')
const http_mocks = require('node-mocks-http')
    , chai = require('chai');
const riskAdvisingHandler = require("../../lib/RiskAdvisingHandler");

describe('insuranceAdvisorController tests', function () {
  it('when call / should return api response', function (done) {
    let stub = sinon.stub(riskAdvisingHandler, "advise");
    stub.returns({"response": "response"});
    let response = http_mocks.createResponse(
        {eventEmitter: require('events').EventEmitter})
    let request = http_mocks.createRequest({
      method: 'POST',
      url: '/',
    })
    response.on('end', function () {
      chai.expect(response.statusCode).to.eq(200);
      chai.expect(response._getData()).to.deep.equal('{"response":"response"}');
      done()
    })

    controller.handle(request, response)
  })

})