const moment = require('moment')
const helper = require('./helper')


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


const PayslipProcessor = function () {}


PayslipProcessor.prototype.getIncomeTax = (salary, startDate) => {
  const taxRates = helper.getTaxRateByTaxYear(startDate)
  let result = 0
  // taxRates should be true as all data has been validated
  // Defensive programming
  if (taxRates) {
    for (let i = 0; i < taxRates.length; i++) {
      if(salary <= taxRates[i].max && salary > taxRates[i].min) {
        result = Math.round((taxRates[i].fixed + (salary - taxRates[i].min) * taxRates[i].rate) / 12)
        break
      }
    }
  }
  return result
}

PayslipProcessor.prototype.getGrossIncome = (salary) => (
  Math.round(parseInt(salary, 10) / 12)
)

PayslipProcessor.prototype.getNetIncome = (grossIncome, incomeTax) => (
  Math.round(grossIncome - incomeTax)
)

PayslipProcessor.prototype.getSuper = (grossIncome, superRate) => {
  const rate = parseFloat(superRate.split('%')[0]) / 100
  return Math.round(grossIncome * rate)
}

PayslipProcessor.prototype.getPaymentMonth = (startdate) => (
  months[moment(startdate).month()]
)

module.exports = PayslipProcessor