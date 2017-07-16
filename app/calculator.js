const moment = require('moment')
const taxRateTable = require('taxRateTable')

const calculator = {}

calculator.getIncomeTax = (salary, startDate) => {
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
    console.log(`Tax rates for ${taxYear} doesn't exist, please try again after update ${taxYear} tax rates `)
    process.exit(1)
  }

}

calculator.getGrossIncome = (salary) => (Math.round(salary /12))

calculator.getNetIncome = (grossIncome, incomeTax) => (
  Math.round(grossIncome - incomeTax)
)

calculator.getSuper = (grossIncome, superRate) => (
  Math.round(grossIncome * superRate)
)

module.exports = calculator