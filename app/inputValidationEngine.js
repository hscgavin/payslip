/**
 * Input validation engine
 * Validate all input value before proceed to next stage
 * Use ES6
 * @type {{}}
 */

const moment = require('moment')
const helper = require('./helper')

const inputValidationEngine = {}

const DEFAULTSCHEMA = {
  minsalary: 0,
  minsuperrate: 0,
  maxsuperrate: 50,
}

// make sure name is name contains characters only
inputValidationEngine.checkName = function (name, callback) {
  const regex = /^[A-Za-z]+$/
  let errorMsg = null
  if(!regex.test(name)) {
    errorMsg = 'Name should be characters only'
  }
  callback(errorMsg)
}

// make sure salary is positve integer or o
inputValidationEngine.checkSalary = function (salary, callback) {
  const s = parseInt(salary, 10)
  let errorMsg = null
  if (s != salary || s < DEFAULTSCHEMA.minsalary) {
    errorMsg = `Salary must be greater than or equal to ${DEFAULTSCHEMA.minsalary} and should be integer`
  }
  callback(errorMsg)
}

inputValidationEngine.checkSuperRate = function (superRate, callback) {
  let errorMsg = null
  if (superRate.indexOf('%') !== -1) {
    const arr = superRate.split('%')
    if (arr.length === 2 && !arr[1]) {
      const convertedSuperRate = parseFloat(arr[0])
      if (!isNaN(convertedSuperRate)) {
        if (convertedSuperRate >= DEFAULTSCHEMA.minsuperrate && convertedSuperRate <= DEFAULTSCHEMA.maxsuperrate) {
          return callback(errorMsg)
        }
      }
    }
  }
  errorMsg = `Super Rate should be within ${DEFAULTSCHEMA.minsuperrate} and ${DEFAULTSCHEMA.maxsuperrate}% (e.g. 9%)`
  callback(errorMsg)
}

inputValidationEngine.checkStartDate = function (startDate, callback) {
  let errorMsg = null
  if (!moment(startDate, ['YYYY-MM-DD'], true).isValid()) {
    errorMsg = 'Please provide a correct date with format YYYY-MM-DD'
  } else {
    // check if there is tax rate info for this tax year on tax rate table
    const taxRates = helper.getTaxRateByTaxYear(startDate)
    if (!taxRates) {
      errorMsg = `Sorry, tax rates for tax year ${helper.getTaxYear(startDate)} are not available`
    }
  }
  callback(errorMsg)
}

module.exports = inputValidationEngine
