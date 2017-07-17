const helper = require('../app/helper')
const taxRateTable = require('../app/taxRateTable')


describe('Test helper function', () => {

  it('should return correct tax year when month is Jan - Jun', () =>{
    const taxYear = helper.getTaxYear('2012-05-01')
    expect(taxYear).toBe('2012')
  })


  it('should return correct tax year when month is Jul - Dec', () =>{
    const taxYear = helper.getTaxYear('2017-07-01')
    expect(taxYear).toBe('2018')
  })

  it('should return correct tax rates', () =>{
    const taxRates = helper.getTaxRateByTaxYear('2017-07-01')
    expect(taxRates).toBe(taxRateTable['2018'])
  })

})