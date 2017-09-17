class Display {
  static printMsg(msg) {
    console.log (msg)
  }
  static report (payslipInfo) {
    console.log('------------------------------------')
    console.log('------------------------------------')
    console.log('Pay Slip Details:')
    console.log(`Name: ${payslipInfo.firstName} ${payslipInfo.lastName}`)
    console.log(`Payment Month: ${payslipInfo.paymentMonth}`)
    console.log(`Gross income: ${payslipInfo.grossIncome}`);
    console.log(`Income tax: ${payslipInfo.incomeTax}`);
    console.log(`Net income: ${payslipInfo.netIncome}`);
    console.log(`Super: ${payslipInfo.super}`)
    console.log('------------------------------------')
    console.log('------------------------------------')
  }

}
module.exports = Display