/**
 * Input validation engine
 * Validate all input value before proceed to next stage
 * Use ES6
 * @type {{}}
 */

const moment = require('moment')

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
    errorMsg = 'name should be characters only'
  }
  callback(errorMsg)
}

// make sure salary is positve integer or o
inputValidationEngine.checkSalary = function (salary, callback) {
  const s = Math.floor(Number(salary))
  let errorMsg = null
  if (String(s) === salary && s >= DEFAULTSCHEMA.minsalary) {
    errorMsg = `salary must be greater or equal ${DEFAULTSCHEMA.minsalary} and should be integer`
  }
}

inputValidationEngine.checkSuperRate = function (superRate, callback) {
  let errorMsg = null
  const convertedSuperRate = parseFloat(superRate)
  if (!isNaN(convertedSuperRate)) {
    if (convertedSuperRate >=DEFAULTSCHEMA.minsuperrate && convertedSuperRate <= DEFAULTSCHEMA.minsuperrate) {
      return callback(errorMsg)
    }
  }
  errorMsg = `Super Rate should within ${DEFAULTSCHEMA.minsuperrate} and ${DEFAULTSCHEMA.maxsuperrate}%`
  callback(errorMsg)
}

inputValidationEngine.checkStartDate = function (date, callback) {
  let errorMsg = null
  if (!moment(date).isValid()) {
    errorMsg = 'Please provide a correct date format'
  }
  callback(errorMsg)
}

module.exports = inputValidationEngine
