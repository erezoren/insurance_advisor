const calculateScore = require("./rules/scoreCalculationEngine");
const RiskProfileResponse = require("./model/RiskProfileResponse");

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

module.exports = RiskAdvisingHandler