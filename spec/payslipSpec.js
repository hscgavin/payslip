const Payslip = require('../app/payslip')


describe('Payslip', () => {
  let payslip
  beforeEach(function() {
    payslip = new Payslip('Gavin', 'He', '60050', '9%', '2012-08-01' );
  })
  it('should return payslip object info', () =>{
    const expected = {
      firstName: 'Gavin',
      lastName: 'He',
      paymentMonth: 'August',
      grossIncome: 5004,
      incomeTax: 922,
      netIncome: 4082,
      super: 450
    }
    expect(payslip.getPayslip()).toEqual(expected)
  })

})