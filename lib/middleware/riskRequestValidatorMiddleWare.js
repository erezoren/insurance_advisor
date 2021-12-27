let RiskProfileRequest = require('../model/RiskProfileRequest')
let RuleEngine = require("node-rules");
let ruleEngine = new RuleEngine();
let _ = require('underscore');
const {MartialStatus} = require("../model/constants");
const {House} = require("../model/constants");

const validation_rules = [
  {
    "condition": function (R) {
      R.when(this.age == undefined || this.age <= 0);
    },
    "consequence": function (R) {
      this.result = false;
      this.reason = "Age must be present in request and > 0";
      R.stop();
    }
  },
  {
    "condition": function (R) {
      R.when(this.dependents == undefined || this.dependents < 0);
    },
    "consequence": function (R) {
      this.result = false;
      this.reason = "dependents must be present in request and >= 0";
      R.stop();
    }
  },
  {
    "condition": function (R) {
      R.when(this.income == undefined || this.income < 0);
    },
    "consequence": function (R) {
      this.result = false;
      this.reason = "income must be present in request and >= 0";
      R.stop();
    }
  },
  {
    "condition": function (R) {
      R.when(this.marital_status == undefined || (
          !_.isEqual(this.marital_status, MartialStatus.single) && !_.isEqual(
          this.marital_status, MartialStatus.married)));
    },
    "consequence": function (R) {
      this.result = false;
      this.reason = "Marital status must be present in request and can be either 'single' or 'married'";
      R.stop();
    }
  },
  {
    "condition": function (R) {
      R.when(!this.risk_questions || !_.isArray(this.risk_questions)
          || this.risk_questions.length
          != 3 || this.risk_questions.filter(
              rq => (!_.isEqual(rq, 1) && !_.isEqual(rq, 0))).length
          > 0);
    },
    "consequence": function (R) {
      this.result = false;
      this.reason = "risk_questions must be present in request and be an array of 3 booleans";
      R.stop();
    }
  },
  {
    "condition": function (R) {
      R.when(this.house && this.house.ownership_status && !(_.isEqual(
          this.house.ownership_status, House.owned) || _.isEqual(
          this.house.ownership_status, House.mortgaged)));
    },
    "consequence": function (R) {
      this.result = false;
      this.reason = "if a house is included it can be either 'owned' or 'mortgaged'";
      R.stop();
    }
  },
  {
    "condition": function (R) {
      R.when(this.vehicle && this.vehicle.year && this.vehicle.year <= 0);
    },
    "consequence": function (R) {
      this.result = false;
      this.reason = "if a vehicle is included it's year must be a positive integer'";
      R.stop();
    }
  },
]
ruleEngine.register(validation_rules)

module.exports = (req, res, next) => {
  let riskProfileRequest = new RiskProfileRequest(req.body);
  ruleEngine.execute(riskProfileRequest, function (data) {
    if (data.result) {
      next()
    } else {
      next(
          res.status(400).json({success: false, error: data.reason})
      )
    }
  });

}