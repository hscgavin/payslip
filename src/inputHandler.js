const Validator = require('./validator')
const Payslip = require('./payslip')
const Display = require('./dispaly')
const fs = require('fs')
var csv = require('fast-csv')

class InputHandler {
  static handleInputs(args) {
    if (args.length === 5) {
      // destructuring assignment
      const [fName, lName, salary, superRate, startDate] = args
      const payslip = new Payslip(fName,lName, salary, superRate, startDate)
      const result = Validator.isValidPayslip(payslip)
      if (result === true) {
        Display.report(payslip.getPayslip())
      } else {
        if (!result.isValidFirstName) Display.printMsg('first name is not valid')
        if (!result.isValidLastName) Display.printMsg('last name is not valid')
        if (!result.isValidSalary) Display.printMsg(('salary is not valid'))
        if (!result.isValidSuperRate) Display.printMsg('Super rate is not valid')
        if (!result.isValidStartDate) Display.printMsg('start date is not valid')
        if (!result.foundTaxRate) Display.printMsg('Can not find the tax rate')
      }
    } else if (args && args.length === 1 && args[0] && args[0].endsWith('.csv')) {

      if (fs.existsSync(args[0])) {
        const writableStream = fs.createWriteStream("csv/output.csv", {encoding: "utf8"})
        csv
          .fromPath(args[0], {headers: true})
          .transform(function (obj) {
            const {firstName, lastName, annualSalary, superRate, paymentStartDate} = obj
            const payslip = new Payslip(firstName, lastName, annualSalary, superRate, paymentStartDate)
            const result = Validator.isValidPayslip(payslip)
            if (result === true) {
              return payslip.getPayslip()
            } else {
              return {
                firstName: JSON.stringify(result),
                lastName: '',
                paymentMonth: '',
                grossIncome: '',
                incomeTax: '',
                netIncome: '',
                super: ''
              }
            }
          })
          .pipe(csv.createWriteStream({headers: true}))
          .pipe(writableStream)

        writableStream.on("finish", function(){
           Display.printMsg("Write to output.csv DONE!")
        })
      } else {
        Display.printMsg(`Could not find the file ${args[0]}, please add the file to csv folder and try again`)
      }
    } else {
      Display.printMsg(`Please provide 5 arguments: got ${args.length}`)
    }
  }
}
module.exports = InputHandler