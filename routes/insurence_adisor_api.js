let express = require('express')
let router = express.Router();
let RiskProfileRequest = require('../lib/model/RiskProfileRequest')
const RiskAdvisingHandler = require("../lib/RiskAdvisingHandler");
const RiskEvaluationRules = require('../lib/rules/RiskEvaluationRules')
const riskAdvisingHandler = new RiskAdvisingHandler(
    new RiskEvaluationRules().getRiskEvaluationRules());

router.post('/',
    (req, res) => {
      let riskResponse = riskAdvisingHandler.advise(new RiskProfileRequest(req.body));
      res.json(riskResponse);
    })

module.exports = router;