#!/usr/bin/env node

const fs = require('fs')
var csv = require('fast-csv')
const inputValidationEngine = require('./inputValidationEngine')
const Payslip = require('./payslip')
const args = process.argv.slice(2)
// main execute function
const main = (fName, lName, salary, superRate, startDate, logError, handlePayslipInfo) => {
  // validation mappers
  const validationFuncs = [
    {'func': 'checkName', 'value': fName},
    {'func': 'checkName', 'value': lName},
    {'func': 'checkSalary', 'value': salary},
    {'func': 'checkSuperRate', 'value': superRate},
    {'func': 'checkStartDate', 'value': startDate},
  ]
  validationFuncs.forEach((item) => {
    inputValidationEngine[item.func](item.value, (error) => {
      logError(error, item.func)
    })
  })
  // all good
  const payslip = new Payslip(fName,lName, salary, superRate, startDate)
  return handlePayslipInfo(payslip.getPayslip())
}

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

  const report = (payslipInfo) => {
    console.log('------------------------------------')
    console.log('------------------------------------')
    console.log('Pay Slip Details:')
    console.log(`Name: ${payslipInfo.firstName} ${payslipInfo.lastName}`)
    console.log(`Payment Month : ${payslipInfo.paymentMonth}`)
    console.log(`Gross income : ${payslipInfo.grossIncome}`);
    console.log(`Income tax : ${payslipInfo.incomeTax}`);
    console.log(`Net income : ${payslipInfo.netIncome}`);
    console.log(`Super : ${payslipInfo.super}`)
    console.log('------------------------------------')
    console.log('------------------------------------')
  }

  main(fName, lName, salary, superRate, startDate, logError, report)


} else if (args && args.length === 1 && args[0] && args[0].endsWith('.csv')) {
  // parse csv if csv file exists
  if (fs.existsSync(args[0])) {
    let isError
    const handleError = (error) => {
      if (error) {
        console.log(error)
        isError = error
      }
    }
    const handlePayslipInfo = (payslipInfo) => {
      return payslipInfo
    }
    csv
      .fromPath(args[0], {headers: true})
      .transform(function (obj) {
        isError = false
        const payslipInfo = main(
          obj.firstName,
          obj.lastName,
          obj.annualSalary,
          obj.superRate,
          obj.paymentStartDate,
          handleError, // function
          handlePayslipInfo // function
        )
        if (isError) {
          return {
            firstName: isError,
            lastName: '',
            paymentMonth: '',
            grossIncome: '',
            incomeTax: '',
            netIncome: '',
            super: ''
          }
        }
        return payslipInfo
      })
      .pipe(csv.createWriteStream({headers: true}))
      .pipe(fs.createWriteStream("csv/output.csv", {encoding: "utf8"}));

  } else {
    console.log(`Could not find the file ${args[0]}, please add the file to csv folder and try again`)
    process.exit(1)
  }
} else {
  console.log(`Please provide 5 arguments: got ${args.length}`)
  process.exit(1)
}