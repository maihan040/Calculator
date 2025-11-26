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
// global variables
//
const acButton = document.getElementById('AC')

////////////////////////////////////////////////////////////////////
//                                                                //
//                       helper functions                         //
//                                                                //
////////////////////////////////////////////////////////////////////

// helper function to refresh UI
function updateDisplay() {
  resultDisplay.textContent = calculator.getDisplay()
}

// helper function to swap "AC" all clear and backspace "⌫"
function updateAcButton() {
  if (calculator.isClear()) {
    acButton.textContent = 'AC'
    acButton.dataset.val = 'allClear'
  } else {
    acButton.textContent = '⌫'
    acButton.dataset.val = 'backspace'
  }
}

////////////////////////////////////////////////////////////////////
//                                                                //
//            add event listener for the input buttons            //
//                                                                //
////////////////////////////////////////////////////////////////////

// input buttons (0–9, decimal)
inputButtons.addEventListener('click', (event) => {
  if (event.target.matches('.inputBtn')) {
    const val = event.target.dataset.val

    if (val === '.') {
      calculator.inputDecimal()
    } else {
      calculator.inputDigit(val)
    }

    updateDisplay()
    updateAcButton()
  }
})

// operator buttons (+, -, ×, ÷, =)
operatorButtons.addEventListener('click', (event) => {
  if (event.target.matches('.operators')) {
    const val = event.target.dataset.val

    if (val === '=') {
      calculator.compute()
      updateDisplay()
      updateAcButton()
    } else {
      calculator.setOperator(val)
      updateDisplay()
    }

    updateDisplay()
  }
})

// special buttons (AC, +/-, %, etc.)
specialButtons.addEventListener('click', (event) => {
  if (event.target.matches('.extraOperators') && event.target.id !== 'AC') {
    // exclude AC button here
    const val = event.target.dataset.val
    switch (val) {
      case 'allClear':
        calculator.clear()
        break
      case 'backspace':
        calculator.backspace()
        break
      case 'negate':
        calculator.toggleSign()
        break
      case 'percent':
        calculator.percent()
        break
    }
    updateDisplay()
    updateAcButton()
  }
})

// AC button click solely handles clearing or backspace
acButton.addEventListener('click', () => {
  if (acButton.dataset.val === 'allClear') {
    calculator.clear()
  } else {
    calculator.backspace()
  }
  updateDisplay()
  updateAcButton()
})

////////////////////////////////////////////////////////////////////
//                                                                //
//                      initialize the display                    //
//                                                                //
////////////////////////////////////////////////////////////////////
updateDisplay()
