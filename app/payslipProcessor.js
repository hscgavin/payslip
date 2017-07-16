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


const payslipProcessor = {}

payslipProcessor.getIncomeTax = (salary, startDate) => {
  const taxRates = helper.getTaxRateByTaxYear(startDate)
  let result = 0
  // taxRates should be true as all data has been validated
  // Defensive programming
  if (taxRates) {
    taxRates.forEach((rule) => {
      if (salary <= rule.max && salary > rule.min) {
        result = Math.round((rule.fixed + (salary - rule.min) * rule.rate) /12)
      }
    })
  }
  return result
}

payslipProcessor.getGrossIncome = (salary) => (
  Math.round(parseInt(salary, 10) /12)
)

payslipProcessor.getNetIncome = (grossIncome, incomeTax) => (
  Math.round(grossIncome - incomeTax)
)

payslipProcessor.getSuper = (grossIncome, superRate) => {
  const rate = parseFloat(superRate.split('%')[0])/100
  return Math.round(grossIncome * rate)
}

payslipProcessor.getPaymentMonth = (startdate) => (
  months[moment(startdate).month()]
)

module.exports = payslipProcessor