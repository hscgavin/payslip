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
  const s = parseInt(salary, 10)
  let errorMsg = null
  if (s != salary || s < DEFAULTSCHEMA.minsalary) {
    errorMsg = `salary must be greater than or equal to ${DEFAULTSCHEMA.minsalary} and should be integer`
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

inputValidationEngine.checkStartDate = function (date, callback) {
  let errorMsg = null
  if (!moment(date, ['YYYY-MM-DD'], true).isValid()) {
    errorMsg = 'Please provide a correct date with format YYYY-MM-DD'
  }
  callback(errorMsg)
}

module.exports = inputValidationEngine
