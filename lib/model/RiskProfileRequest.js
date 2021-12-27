class RiskProfileRequest {
  constructor(bodObj) {
    bodObj && Object.assign(this, bodObj);
    this.age = bodObj.age;
    this.dependents =bodObj.dependents;
    this.house = bodObj.house;
    this.income = bodObj.income;
    this.marital_status = bodObj.marital_status;
    this.risk_questions = bodObj.risk_questions;
    this.vehicle = bodObj.vehicle;
  }

  getAge() {
    return this.age;
  }

  getDependents() {
    return this.dependents;
  }

  getHouse() {
    return this.house;
  }

  getIncome() {
    return this.income;
  }

  getMaritalStatus() {
    return this.marital_status;
  }

  getRiskQuestions() {
    return this.risk_questions;
  }

  getVehicle() {
    return this.vehicle;
  }
}

module.exports = RiskProfileRequest