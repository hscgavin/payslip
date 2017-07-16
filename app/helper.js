const moment = require('moment')
const taxRateTable = require('./taxRateTable')
const helper = {}

helper.getTaxRateByTaxYear = (startDate) => {
  return taxRateTable[helper.getTaxYear(startDate)]
}

helper.getTaxYear = (startDate) => {
  const momentDate = moment(startDate)
  // if month is July or over, tax year + 1 e.g 2017-07: tax year should be 2018
  let taxYear = momentDate.year()
  if (momentDate.month() >= 6) {
    taxYear = taxYear + 1
  }
  return taxYear.toString()
}

module.exports = helper