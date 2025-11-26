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
    if (this.isNewEntry) {
      this.currentValue = digit
      this.isNewEntry = false
    } else {
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
  }
}
