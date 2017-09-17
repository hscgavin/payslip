
const moment = require('moment')
const Taxation = require('./taxation')

const DEFAULTSCHEMA = {
  minsalary: 0,
  minsuperrate: 0,
  maxsuperrate: 50,
}

class Validator {
  // make sure name is name contains characters only
  static isValidName (name) {
    const regex = /^[A-Za-z]+$/
    if(!regex.test(name)) {
       return false
    }
    return true
  }
  // make sure salary is positive integer or o
  static isValidSalary(salary) {
    const s = parseInt(salary, 10)
    if (s != salary || s < DEFAULTSCHEMA.minsalary) {
      return false
    }
    return true
  }

  static isValidSuperRate(superRate) {
    if (superRate.indexOf('%') !== -1) {
      const arr = superRate.split('%')
      if (arr.length === 2 && !arr[1]) {
        const convertedSuperRate = parseFloat(arr[0])
        if (!isNaN(convertedSuperRate)) {
          if (convertedSuperRate >= DEFAULTSCHEMA.minsuperrate && convertedSuperRate <= DEFAULTSCHEMA.maxsuperrate) {
            return true
          }
        }
      }
    }
    return false
  }

  static isValidStartDate(startDate, callback) {
    if (!moment(startDate, ['YYYY-MM-DD'], true).isValid()) {
      return false
    }
    return true
  }
  static foundTaxRate(startDate) {
    const taxRates = Taxation.getTaxYearByDate(startDate)
    if (!taxRates) {
      return false
    }
    return true

  }
  static isValidPayslip(payslip) {
    const isValidFirstName = this.isValidName(payslip.firstName)
    const isValidLastName = this.isValidName(payslip.lastName)
    const isValidSalary = this.isValidSalary(payslip.salary)
    const isValidSuperRate = this.isValidSuperRate(payslip.superRate)
    const isValidStartDate = this.isValidStartDate(payslip.startDate)
    const foundTaxRate = this.foundTaxRate(payslip.startDate)
    if (isValidFirstName &&
        isValidLastName &&
        isValidSalary &&
        isValidSuperRate &&
        isValidStartDate &&
        foundTaxRate
      ) {
      return true
    }
    else {
      return {
        isValidFirstName,
        isValidLastName,
        isValidSalary,
        isValidSuperRate,
        isValidStartDate,
        foundTaxRate
      }
    }
  }
}

module.exports = Validator