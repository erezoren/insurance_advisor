let express = require('express')
let router = express.Router();
let RiskProfileRequest = require('../lib/model/RiskProfileRequest')
const riskAdvisingHandler = require('../lib/RiskAdvisingHandler');

router.post('/',
    (req, res) => {
      let riskResponse = riskAdvisingHandler.advise(new RiskProfileRequest(req.body));
      res.json(riskResponse);
    })

module.exports = router;