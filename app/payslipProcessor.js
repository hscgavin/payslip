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


const payslipProcessor = {}

payslipProcessor.getIncomeTax = (salary, startDate) => {
  const momentDate = moment(startDate)
  // if month is July or over, tax year + 1 e.g 2017-07: tax year should be 2018
  let taxYear = momentDate.year()
  if (momentDate.month() >= 6) {
    taxYear = taxYear + 1
  }
  // Check if tax rate for this year exists
  const taxRates = taxRateTable[taxYear.toString()]
  if (taxRates) {
    let result = 0
    taxRates.forEach((rule) => {
      if (salary <= rule.max && salary > rule.min) {
        result = Math.round((rule.fixed + (salary - rule.min) * rule.rate) /12)
      }
    })
    return result
  } else {
    console.log(`Tax rates for ${taxYear} tax year doesn't exist, please try again after update ${taxYear} taxRateTable `)
    process.exit(1)
  }

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