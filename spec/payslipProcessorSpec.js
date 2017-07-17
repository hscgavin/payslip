const PayslipProcessor = require('../app/payslipProcessor')


describe('Pay slip processor', () => {

  let payslipProcessor
  let salary
  let startDate
  //This will be called before running each spec
  beforeEach(function() {
    payslipProcessor = new PayslipProcessor()
    salary = 60050
    startDate = '2012-07-01'
  })

  describe("when payslipProcessor is used to perform basic tax operations", () => {

    it('should calcalate the correct income tax when tax year is found', () =>{
      const incomeTax = payslipProcessor.getIncomeTax(salary, startDate)
      expect(incomeTax).toBe(922)
    })

    it('income tax should be 0 when tax year is not found', () =>{
      const incomeTax = payslipProcessor.getIncomeTax(salary, '2012-05-01')
      expect(incomeTax).toBe(0)
    })

    it('should return correct gross income', () =>{
      const grossIncome = payslipProcessor.getGrossIncome(salary, startDate)
      expect(grossIncome).toBe(5004)
    })

    it('should return correct net income', () =>{
      const incomeTax = payslipProcessor.getIncomeTax(salary, startDate)
      const grossIncome = payslipProcessor.getGrossIncome(salary, startDate)
      const netIncome = payslipProcessor.getNetIncome(grossIncome, incomeTax)
      expect(netIncome).toBe(4082)
    })

    it('should return correct super', () => {
      const grossIncome = payslipProcessor.getGrossIncome(salary, startDate)
      const superRate = '9%'
      const superanation = payslipProcessor.getSuper(grossIncome, superRate)
      expect(superanation).toBe(450)
    })

    it('should return correct payment month', () => {
      const paymentMonth = payslipProcessor.getPaymentMonth(startDate)
      expect(paymentMonth).toBe('July')
    })
  })
})