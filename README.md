# How to use the Risk assessment service

## Prerequisites

- Node >= v10.24.1
- Terminal or postman installed

## Usage

1. from the root directory run 'npm install' to install dependencies.
2. run 'npm start' to launch the server application

#### Postman

<pre>Use the following POST configuration:</pre>

* Method :POST
* URL: http://localhost:3000/api/v1
* Request Example:

```json
{
  "age": 22,
  "dependents": 2,
  "house": {
    "ownership_status": "owned"
  },
  "income": 0,
  "marital_status": "married",
  "risk_questions": [1, 1, 1],
  "vehicles": {
    "year": 4
  }
}
```

#### curl

<pre>From any terminal run the following</pre>

```bash
curl -X POST  -H 'Content-Type: application/json' -d '{"age": 35,"dependents": 2,"house": {"ownership_status": "owned"},"income": 0,"marital_status": "married","risk_questions": [0, 1, 0],"vehicle": {"year": 2018}}' localhost:3000/api/v1
```

###   Tests
This application uses mocha test framework, with some usage of chai and sinon to assert and stub.
<br/>
run tests from commandline by executing <b>'npm test'</b>

## Design

* The API has a single POST entry point 'localhost:3000/api/v1', it is versioned to make it easy to support new demands while staying backward
  compatible.

* Each incoming request (json object) will first go through the riskRequestValidatorMiddleWare, which is a middleware function, Making use
  of the simple [node_rules]('https://www.npmjs.com/package/node-rules') module, to evaluate the request and throw an error (400 bad request) if found.
  A list of static evaluation rules is created once when server loads, and when a request arrives the rules engine evaluates it after being wrapped by the
  RiskProfileRequest class that all it does is handling the request body into a formed class object.
  
* After passing the initial evaluation the router uses RiskAdvisingHandler to perform the risk calculation.
  RiskAdvisingHandler in turn is constructed with a list of simple evaluation rules (EvaluationRule) each one contains to 2 callback functions.
  One to evaluate the condition, and the other to define which action to take in case the rule is evaluated as true.
  This rules list is initiated in a class called RiskEvaluationRules, and can be easily extended by adding new EvaluationRule(conditionCallback(),actionCallback())

  <b>RiskAdvisingHandler</b> is nothing but a wrapper above the main risk score calculation util called scoreCalculationEngine.
  This scoring utility exposes one interface called calculateScore, which initiates a base evaluation request and iterates though the list of rules provided to it, in order to eventually 
  calculate the risk assessment response.
  Finally, the calculation result is spread into a structured response (RiskProfileResponse) to be sent back to the caller.
  
  The main design purpose is to maintain the SRP principle so code is testable and changes are simple

#### API Model

### Request

```json
{
  "age": 35,
  "dependents": 2,
  "house": {
    "ownership_status": "owned"
  },
  "income": 0,
  "marital_status": "married",
  "risk_questions": [
    0,
    1,
    0
  ],
  "vehicle": {
    "year": 2018
  }
}
```

### Error Response
Http status : 400 
```json
{
  "success": false,
  "error": "error message"
}
```

### Response
Http status: 200
```json
{
  "auto": {
    "auto": "ineligible",
    "disability": "ineligible",
    "home": "regular",
    "life": "regular"
  }
}
```