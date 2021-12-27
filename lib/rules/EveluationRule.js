class EvaluationRule {

  constructor(condition, action, description) {
    this.condition = condition;
    this.action = action;
    this.description = description;
  }

  evaluate(requst) {
    if (this.condition(requst)) {
      this.action(requst);
    }
  }

  getDescription() {
    return this.description;
  }

}

module.exports = EvaluationRule;