const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const riskRequestValidator = require('./lib/middleware/riskRequestValidatorMiddleWare')
let api = require('./routes/insuranceAdvisorController')
let app = express();
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1/', riskRequestValidator)
app.use('/api/v1/', api);
module.exports = app;
