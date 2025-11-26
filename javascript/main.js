//
// import the calculator class
//
import { Calculator } from './Calculator.js'

//
// get the DOM objects
//
const resultDisplay = document.getElementById('calcOP')
const inputButtons = document.querySelector('.input')
const specialButtons = document.querySelector('.specialBtns')
const operatorButtons = document.querySelector('.operatorBtns')

//
// create the calculator instance
//
const calculator = new Calculator()

//
// helper function to refresh UI
//
function updateDisplay() {
  resultDisplay.textContent = calculator.getDisplay()
}

//
// add event listener for the input buttons
//

//
// input buttons (0–9, decimal)
//
inputButtons.addEventListener('click', (event) => {
  if (event.target.matches('.inputBtn')) {
    const val = event.target.dataset.val

    if (val === '.') {
      calculator.inputDecimal()
    } else {
      calculator.inputDigit(val)
    }

    updateDisplay()
  }
})

//
// operator buttons (+, -, ×, ÷, =)
//
operatorButtons.addEventListener('click', (event) => {
  if (event.target.matches('.operators')) {
    const val = event.target.dataset.val

    if (val === '=') {
      calculator.compute()
    } else {
      calculator.setOperator(val)
    }

    updateDisplay()
  }
})

//
// special buttons (AC, +/-, %, etc.)
//
specialButtons.addEventListener('click', (event) => {
  if (event.target.matches('.extraOperators')) {
    const val = event.target.dataset.val

    switch (val) {
      case 'AC':
        calculator.clear()
        break
      case '+/-':
        calculator.toggleSign()
        break
      case '%':
        calculator.percent()
        break
    }

    updateDisplay()
  }
})

//
// initialize the display
//
updateDisplay()
