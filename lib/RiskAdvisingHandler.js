const calculateScore = require("./rules/scoreCalculationEngine");
const RiskProfileResponse = require("./model/RiskProfileResponse");
const RiskEvaluationRules = require("./rules/RiskEvaluationRules");

class RiskAdvisingHandler {
  constructor(evaluationRules) {
    console.log("initializing rules");
    this.evaluationRules = evaluationRules;
  }

  advise(request) {
    let calculatedScore = calculateScore(request, this.evaluationRules);
    return new RiskProfileResponse(calculatedScore)
  }

}

module.exports = new RiskAdvisingHandler( new RiskEvaluationRules().getRiskEvaluationRules())