const inputValidationEngine = require('../app/inputValidationEngine')

describe('Input validation', () => {
  it('should pass name validation', () => {
    inputValidationEngine.checkName('hello', (error) => {
      expect(error).toBe(null)
    })
  })

  it('should fail pass name validation', () => {
    inputValidationEngine.checkName('123xx', (error) => {
      expect(error).not.toBe(null)
    })
  })

  it('should pass the salary validation', () => {
    inputValidationEngine.checkSalary('123', (error) => {
      expect(error).toBe(null)
    })
  })

  it('should fail the salary validation with an negative num', () => {
    inputValidationEngine.checkSalary('-1111', (error) => {
      expect(error).not.toBe(null)
    })
  })

  it('should fail the salary validation with a non number', () => {
    inputValidationEngine.checkSalary('hello', (error) => {
      expect(error).not.toBe(null)
    })
  })

  it('should fail the salary validation with a decimal', () => {
    inputValidationEngine.checkSalary('1200.55', (error) => {
      expect(error).not.toBe(null)
    })
  })

  it('should pass the super rate validation', () => {
    inputValidationEngine.checkSuperRate('3%', (error) => {
      expect(error).toBe(null)
    })
  })

  it('should fail the super rate validation with wrong format', () => {
    inputValidationEngine.checkSuperRate('3%fff', (error) => {
      expect(error).not.toBe(null)
    })
  })

  it('should fail the super rate validation with more than 50%', () => {
    inputValidationEngine.checkSuperRate('51%', (error) => {
      expect(error).not.toBe(null)
    })
  })

  it('should fail the super rate validation with less than 0%', () => {
    inputValidationEngine.checkSuperRate('-5%', (error) => {
      expect(error).not.toBe(null)
    })
  })

  it('should pass the start date validation and tax rates are available for 2013', () => {
    inputValidationEngine.checkStartDate('2012-11-21', (error) => {
      expect(error).toBe(null)
    })
  })
  it('should fail the start date validation with a wrong format date', () => {
    inputValidationEngine.checkStartDate('12/12/2011', (error) => {
      expect(error).not.toBe(null)
    })
  })

  it('should fail the start date validation with incorrect month', () => {
    inputValidationEngine.checkStartDate('2017-13-11', (error) => {
      expect(error).not.toBe(null)
    })
  })

  it('should fail the start date validation with random string', () => {
    inputValidationEngine.checkStartDate('Iam super man', (error) => {
      expect(error).not.toBe(null)
    })
  })

  it('should fail the start date validation with incorrect day', () => {
    inputValidationEngine.checkStartDate('2017-02-30', (error) => {
      expect(error).not.toBe(null)
    })
  })

  it('should fail the start date validation with incorrect year', () => {
    inputValidationEngine.checkStartDate('0012-02-30', (error) => {
      expect(error).not.toBe(null)
    })
  })

  it('should fail the start date validation as tax rates is not found for this tax year', () => {
    inputValidationEngine.checkStartDate('2012-06-01', (error) => {
      expect(error).not.toBe(null)
    })
  })

})