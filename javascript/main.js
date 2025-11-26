//////////////////////////////////////////////////////////
//                                                      //
// main.js - Entry point, wires events and              //
// connects calculator logic and UI                     //
//                                                      //
//////////////////////////////////////////////////////////

//
// import modules
//
import { Calculator } from './Calculator.js'
import UIController from './UIController.js'

//
// local variables and instances
//
const calculator = new Calculator()
const ui = new UIController()

//
// Initial display setup
//
ui.updateDisplay(calculator)
ui.updateAcButton(calculator)

//////////////////////////////////////////////////////////
//                                                      //
//                set up event listeners                //
//                                                      //
//////////////////////////////////////////////////////////

//
// Input buttons
//
ui.inputButtons.addEventListener('click', (event) => {
  if (event.target.matches('.inputBtn')) {
    const val = event.target.dataset.val
    if (val === '.') {
      calculator.inputDecimal()
    } else {
      calculator.inputDigit(val)
    }
    ui.updateDisplay(calculator)
    ui.updateAcButton(calculator)
  }
})

//
// Operator buttons
//
ui.operatorButtons.addEventListener('click', (event) => {
  if (event.target.matches('.operators')) {
    const val = event.target.dataset.val
    if (val === '=') {
      calculator.compute()
      ui.updateDisplay(calculator)
      ui.updateAcButton(calculator)
    } else {
      calculator.setOperator(val)
      ui.updateDisplay(calculator)
    }
  }
})

//
// Special buttons excluding AC
//
ui.specialButtons.addEventListener('click', (event) => {
  if (event.target.matches('.extraOperators') && event.target.id !== 'AC') {
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
    ui.updateDisplay(calculator)
    ui.updateAcButton(calculator)
  }
})

// AC button solely controls clear/backspace
ui.acButton.addEventListener('click', () => {
  if (ui.acButton.dataset.val === 'allClear') {
    calculator.clear()
  } else {
    calculator.backspace()
  }
  ui.updateDisplay(calculator)
  ui.updateAcButton(calculator)
})
