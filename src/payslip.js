const Taxation = require('./taxation')

const Payslip = function (fname, lname, salary, superRate, startDate) {
  this.firstName = fname
  this.lastName = lname
  this.salary = salary
  this.superRate = superRate
  this.startDate = startDate
}

Payslip.prototype.getPayslip = function() {
  let grossIncome = Taxation.getGrossIncome(this.salary)
  let incomeTax = Taxation.getIncomeTax(this.salary, this.startDate)
  return {
    firstName: this.firstName,
    lastName: this.lastName,
    paymentMonth: Taxation.getPaymentMonth(this.startDate),
    grossIncome: grossIncome,
    incomeTax: incomeTax,
    netIncome: Taxation.getNetIncome(grossIncome, incomeTax),
    super: Taxation.getSuper(grossIncome, this.superRate)
  }
}

module.exports = Payslip