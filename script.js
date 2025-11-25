//
// get the DOM objects
//
const resultDisplay = document.getElementById('calcOP')
const inputButtons = document.querySelector('.input')
const specialButtons = document.querySelector('.specialBtns')
const operatorButtons = document.querySelector('.operatorBtns')

//
// add event listener for the input buttons
//

// input values
inputButtons.addEventListener('click', (event) => {
  // check whether the button that was pressed is
  // one of the input buttons
  if (event.target.matches('.inputBtn')) {
    // log it for now
    console.log(event.target.dataset.val)
    updateDisplay(event.target.dataset.val)
  }
})

// special buttons
specialButtons.addEventListener('click', (event) => {
  // check whether the button that was pressed is
  // one of the special buttons
  if (event.target.matches('.extraOperators')) {
    // log it for now
    console.log(event.target.dataset.val)

    // add switch statement to handle
    // subsequent operation
  }
})

// operator buttons
operatorButtons.addEventListener('click', (event) => {
  // check whether the button that was pressed is
  // one of the operator buttons
  if (event.target.matches('.operators')) {
    // log it for now
    console.log(event.target.dataset.val)
  }
})

// functions
function updateDisplay(val) {
  resultDisplay.textContent = val
}

function allClear() {
  resultDisplay.textContent = 0
  initialState = true
}
