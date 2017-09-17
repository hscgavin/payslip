const moment = require('moment')
const taxRateTable = require('./taxRateTable')

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
// all input validation should be already handled
// just need to focus on calculation

class Taxation {
  static getIncomeTax(salary, startDate) {
    const isWithinRange = (element) => {
      return (salary <= element.max && salary > element.min)
    }
    const taxRates = taxRateTable[this.getTaxYearByDate(startDate)]
    const rate = taxRates.find(isWithinRange)
    const incomeTax = rate ? Math.round((rate.fixed + (salary - rate.min) * rate.rate) / 12) : 0
    return incomeTax
  }


  static getTaxYearByDate(startDate) {
    const momentDate = moment(startDate)
    // if month is July or over, tax year + 1 e.g 2017-07: tax year should be 2018
    let taxYear = momentDate.year()
    if (momentDate.month() >= 6) {
      taxYear = taxYear + 1
    }
    return taxYear.toString()
  }

  static getGrossIncome(salary) {
    return Math.round(parseInt(salary, 10) / 12)
  }

  static getNetIncome(grossIncome, incomeTax) {
    return Math.round(grossIncome - incomeTax)
  }

  static getSuper(grossIncome, superRate) {
    const rate = parseFloat(superRate.split('%')[0]) / 100
    return Math.round(grossIncome * rate)
  }

  static getPaymentMonth(startdate) {
    return months[moment(startdate).month()]
  }
}

module.exports = Taxation