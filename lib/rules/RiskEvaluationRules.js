
const EvaluationRule = require("./EveluationRule");
const _ = require('underscore')
const {disability_ineligible,MartialStatus,House} = require("../model/constants");

class RiskEvaluationRules {

  constructor() {
   this.evaluationRules = [
      new EvaluationRule((req) => req.income == 0,
          (req) => {
            req.disability = disability_ineligible;
          }),
      new EvaluationRule((req) => !req.vehicle,
          (req) => {
            req.auto = disability_ineligible;
          }),
      new EvaluationRule((req) => !req.house,
          (req) => {
            req.home = disability_ineligible;
          }),
      new EvaluationRule((req) => req.age > 60,
          (req) => {
            req.disability = disability_ineligible;
            req.life = disability_ineligible;
          }),
      new EvaluationRule((req) => req.age < 30,
          (req) => {
            this.changeAllLinesBy(req, -2);
          }),
      new EvaluationRule((req) => req.age >= 30 && req.age <= 40,
          (req) => {
            this.changeAllLinesBy(req, -1);
          }),
      new EvaluationRule((req) => req.income > 200000,
          (req) => {
            this.changeAllLinesBy(req, -1);
          }),
      new EvaluationRule(
          (req) => req.house && req.house.ownership_status && _.isEqual(
              req.house.ownership_status, House.mortgaged),
          (req) => {
            this.changeDisabilityScoreBy(req, 1);
            this.changeHomeScoreBy(req, 1);
          }),
      new EvaluationRule((req) => req.dependents > 0,
          (req) => {
            this.changeDisabilityScoreBy(req, 1);
            this.changeLifeScoreBy(req, 1);
          }),
      new EvaluationRule((req) => !_.isEqual(
          req.marital_status, MartialStatus.married),
          (req) => {
            this.changeDisabilityScoreBy(req, -1);
            this.changeLifeScoreBy(req, 1);
          }),
      new EvaluationRule(
          (req) => req.vehicle && req.vehicle.year && new Date().getFullYear()
              - req.vehicle.year
              <= 5,
          (req) => {
            this.changeAutScoreBy(req, 1);
          })

    ]

  }

  getRiskEvaluationRules(){
    return this.evaluationRules;
  }

  changeAllLinesBy(req, quantity) {
    req.disability_score += quantity;
    req.life_score += quantity;
    req.home_score += quantity;
    req.auto_score += quantity;
  }

  changeDisabilityScoreBy(req, quantity) {
    req.disability_score += quantity;
  }

  changeHomeScoreBy(req, quantity) {
    req.home_score += quantity;
  }

  changeLifeScoreBy(req, quantity) {
    req.life_score += quantity;
  }

  changeAutScoreBy(req, quantity) {
    req.auto_score += quantity;
  }

}

module.exports = RiskEvaluationRules;

