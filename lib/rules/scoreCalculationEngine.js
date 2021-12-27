const {disability_ineligible} = require("../model/constants");
const {LiteralScores} = require("../model/constants");
const _ = require('underscore')

calculateScore = (baseRequest, rules) => {

  let baseScore = _.reduce(baseRequest.risk_questions,
      function (memo, num) {
        return memo + num;
        0
      })

  let baseEvaluationRequest = {
    ...baseRequest,
    auto_score: baseScore,
    disability_score: baseScore,
    home_score: baseScore,
    life_score: baseScore,
  };
  for (let rule of rules) {
    rule.evaluate(baseEvaluationRequest);
  }

  return summarize(baseEvaluationRequest)
}

function summarize(baseEvaluationRequest) {
  let result = {};
  result['auto'] = calculateByScore(baseEvaluationRequest.auto,
      baseEvaluationRequest.auto_score);
  result['disability'] = calculateByScore(
      baseEvaluationRequest.disability, baseEvaluationRequest.disability_score);
  result['home'] = calculateByScore(baseEvaluationRequest.home,
      baseEvaluationRequest.home_score);
  result['life'] = calculateByScore(
      baseEvaluationRequest.life, baseEvaluationRequest.life_score);
  return result;

}

function calculateByScore(ineligibility, score) {
  if (ineligibility) {
    return disability_ineligible;
  }
  if (score <= 0) {
    return LiteralScores.economic;
  } else if (score == 1 || score == 2) {
    return LiteralScores.regular;
  } else {
    return LiteralScores.responsible;
  }

}

module.exports = calculateScore