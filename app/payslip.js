const PayslipProcessor = require('./payslipProcessor')

const payslipProcessor = new PayslipProcessor()

const Payslip = function (fname, lname, salary, superRate, startDate) {
  this.firstName = fname
  this.lastName = lname
  this.salary = salary
  this.superRate = superRate
  this.startDate = startDate
}

Payslip.prototype.getPayslip = function() {
  let grossIncome = payslipProcessor.getGrossIncome(this.salary)
  let incomeTax = payslipProcessor.getIncomeTax(this.salary, this.startDate)
  return {
    firstName: this.firstName,
    lastName: this.lastName,
    paymentMonth: payslipProcessor.getPaymentMonth(this.startDate),
    grossIncome: grossIncome,
    incomeTax: incomeTax,
    netIncome: payslipProcessor.getNetIncome(grossIncome, incomeTax),
    super: this.superRate
  }
}

module.exports = Payslip