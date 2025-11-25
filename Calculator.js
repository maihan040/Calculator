class Calculator {
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

  toggleSign() {
    if (this.currentValue === '0') return
    if (this.currentValue.startsWith('-')) {
      this.currentValue = this.currentValue.slice(1)
    } else {
      this.currentValue = '-' + this.currentValue
    }
  }

  percent() {
    const value = parseFloat(this.currentValue)
    if (isNaN(value)) return
    this.currentValue = (value / 100).toString()
    this.isNewEntry = true
  }

  setOperator(nextOperator) {
    // If there is an existing operator and we are not starting fresh, compute first
    if (this.operator && !this.isNewEntry) {
      this.compute()
    } else {
      this.previousValue = this.currentValue
    }
    this.operator = nextOperator
    this.isNewEntry = true
  }

  compute() {
    if (this.operator == null || this.previousValue == null) {
      return
    }

    const prev = parseFloat(this.previousValue)
    const current = parseFloat(this.currentValue)

    if (isNaN(prev) || isNaN(current)) return

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
        // basic divide-by-zero handling
        result = current === 0 ? 0 : prev / current
        break
      default:
        return
    }

    this.currentValue = result.toString()
    this.previousValue = null
    this.operator = null
    this.isNewEntry = true
  }
}
