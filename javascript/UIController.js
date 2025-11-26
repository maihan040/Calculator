// UIController.js - Handles DOM access, UI updates, and button state management

export default class UIController {
  constructor() {
    this.resultDisplay = document.getElementById('calcOP')
    this.inputButtons = document.querySelector('.input')
    this.specialButtons = document.querySelector('.specialBtns')
    this.operatorButtons = document.querySelector('.operatorBtns')
    this.acButton = document.getElementById('AC')
  }

  updateDisplay(calculator) {
    this.resultDisplay.textContent = calculator.getDisplay()
  }

  updateAcButton(calculator, switchAC = false) {
    if (calculator.isClear() || switchAC) {
      this.acButton.textContent = 'AC'
      this.acButton.dataset.val = 'allClear'
    } else {
      this.acButton.textContent = '⌫'
      this.acButton.dataset.val = 'backspace'
    }
  }
}
