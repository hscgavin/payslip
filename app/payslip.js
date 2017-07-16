#!/usr/bin/env node

const inputValidationEngine = require('./inputValidationEngine')
const payslipProcessor = require('./payslipProcessor')

const args = process.argv.slice(2)

if (args && args.length === 5) {
  // input args are correct
  // start processing the data
  const fName = args[0]
  const lName = args[1]
  const salary = args [2]
  const superRate = args[3]
  const startDate = args[4]

  // log validation error to screen
  const logError = (error) => {
    if (error) {
      console.log(error)
      process.exit(1)
    }
  }

  const report = (reportInfo) => {
    console.log('------------------------------------')
    console.log('Pay Slip Details:')
    console.log(`Name: ${reportInfo.firstName} ${reportInfo.lastName}`)
    console.log(`Payment Month : ${reportInfo.paymentMonth}`)
    console.log(`Gross income : ${reportInfo.grossIncome}`);
    console.log(`Income tax : ${reportInfo.incomeTax}`);
    console.log(`Net income : ${reportInfo.netIncome}`);
    console.log(`Super : ${reportInfo.super}`)
    console.log('------------------------------------')
  }

  // validation mappers
  const validationFuncs = [
    {'func': 'checkName', 'value': fName},
    {'func': 'checkName', 'value': lName},
    {'func': 'checkSalary', 'value': salary},
    {'func': 'checkSuperRate', 'value': superRate},
    {'func': 'checkStartDate', 'value': startDate},
  ]

  // main execute function
  const main = (fName, lName, salary, superRate, startDate) => {
    validationFuncs.forEach((item) => {
      inputValidationEngine[item.func](item.value, (error) => {
        logError(error)
      })
    })

    // all good
    var reportInfo = {}
    reportInfo.firstName = fName
    reportInfo.lastName = lName
    reportInfo.paymentMonth = payslipProcessor.getPaymentMonth(startDate)
    reportInfo.grossIncome = payslipProcessor.getGrossIncome(salary)
    reportInfo.incomeTax = payslipProcessor.getIncomeTax(salary, startDate)
    reportInfo.netIncome = payslipProcessor.getNetIncome(reportInfo.grossIncome, reportInfo.incomeTax)
    reportInfo.super = payslipProcessor.getSuper(reportInfo.grossIncome, superRate)

    report(reportInfo)

  }

  main(fName, lName, salary, superRate, startDate)


} else {
  console.log(`Not enough non-option arguments: got ${args.length}, need at least 5`)
}