export class Calculator {
  //////////////////////////////////////////////////////////
  //                                                      //
  //                class member functions                //
  //                     and constructor                  //
  //                                                      //
  //////////////////////////////////////////////////////////
  constructor() {
    this.clear()
  }

  clear() {
    this.currentValue = '0' // raw string, no separators
    this.previousValue = null // raw string
    this.operator = null // '+', '-', '*', '/'
    this.isNewEntry = true // next digit starts a new number
  }

  // For connecting to your display element
  getDisplay() {
    return this.formatWithSeparators(this.currentValue)
  }

  // Add thousand separators to the integer part
  formatWithSeparators(valueStr) {
    // handle possible '-' sign and decimal
    const isNegative = valueStr.startsWith('-')
    let str = isNegative ? valueStr.slice(1) : valueStr

    const [intPart, decimalPart] = str.split('.')
    const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    let result = withCommas
    if (decimalPart !== undefined) {
      result += '.' + decimalPart
    }
    if (isNegative) {
      result = '-' + result
    }
    return result
  }

  inputDigit(digit) {
    // currently limit the input to
    // only 12 digits as otherwise
    // it will cause overflow on the
    // screen

    const maxLength = 12
    if (this.isNewEntry) {
      this.currentValue = digit
      this.isNewEntry = false
    } else {
      if (this.currentValue.length >= maxLength) return // reject input when max length reached
      // avoid leading zeros like "0002"
      if (this.currentValue === '0') {
        this.currentValue = digit
      } else {
        this.currentValue += digit
      }
    }
  }

  // input value 0-9
  inputDecimal() {
    if (this.isNewEntry) {
      this.currentValue = '0.'
      this.isNewEntry = false
      return
    }
    if (!this.currentValue.includes('.')) {
      this.currentValue += '.'
    }
  }

  // +/-
  toggleSign() {
    if (this.currentValue === '0') return
    if (this.currentValue.startsWith('-')) {
      this.currentValue = this.currentValue.slice(1)
    } else {
      this.currentValue = '-' + this.currentValue
    }
  }

  // %
  percent() {
    const value = parseFloat(this.currentValue)
    if (isNaN(value)) return
    this.currentValue = (value / 100).toString()
    this.isNewEntry = true
  }

  // set operators
  setOperator(op) {
    if (this.operator !== null && !this.isNewEntry) {
      this.compute()
    }
    this.operator = op
    this.previousValue = this.currentValue
    this.isNewEntry = true
  }

  backspace() {
    if (this.isNewEntry) return // nothing to delete if fresh entry
    if (this.currentValue.length <= 1) {
      this.currentValue = '0'
      this.isNewEntry = true
    } else {
      this.currentValue = this.currentValue.slice(0, -1)
    }
  }

  isClear() {
    return this.currentValue === '0' && this.isNewEntry
  }

  compute() {
    if (this.operator === null || this.previousValue === null) {
      return // no operation to perform
    }
    const prev = parseFloat(this.previousValue)
    const current = parseFloat(this.currentValue)

    let result
    switch (this.operator) {
      case '+':
        result = prev + current
        break
      case '-':
        result = prev - current
        break
      case '*':
        result = prev * current
        break
      case '/':
        if (current === 0) {
          result = 'Error' // handle division by zero
        } else {
          result = prev / current
        }
        break
      default:
        return
    }

    // member variables
    this.currentValue = result.toString()
    this.operator = null
    this.previousValue = null
    this.isNewEntry = true
  }
}
