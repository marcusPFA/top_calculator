//// Get references to HTML elements

const display = document.querySelector("#display");
const keys = document.querySelectorAll(".key");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const functions = document.querySelectorAll('.function');

// Calculator variables

let currentOperand = "";
let operator = "";
let queuedOperation = "";
let savedOperand = "";

let divisionByZero = "N0 ):<";

//// Set event listeners

numbers.forEach(number => {
    number.addEventListener("click", () => appendNumericalInput(number));
})

operations.forEach((operation) => {
    operation.addEventListener("click", () => selectOperation(operation));
})

functions.forEach((func) => {
    switch (func.id) { 
        case "backspace":
            func.addEventListener("click", () => currentOperand = currentOperand.slice(0, currentOperand.length-1));
            break;
        case "equal":
            func.addEventListener("click", () => {
                operate();
                operator = "="; 
            });
            break;
        case "clear":
            func.addEventListener("click", () => clearCalculator());


    }
})

keys.forEach((key) => {
    key.addEventListener("mouseover", () => highlightHovered(key));
    key.addEventListener("mouseout", () => removeHighlight(key));
    key.addEventListener("click", () => display.textContent = currentOperand); // Update display after each key press
});

//// Functions

// Hover effects

function highlightHovered(key) {
    key.classList.add("hovered");

}

function removeHighlight(key) {
    key.classList.remove("hovered");
}

// Select and clear operation

function selectOperation(operation) {
    operations.forEach(operation => operation.classList.remove("selected"));
    operation.classList.add("selected");
    operator = operation.textContent;
    operate();
    
}

// Numerical input to display

function appendNumericalInput(number) {

        if (currentOperand === divisionByZero) currentOperand = "";

        if (operator !== "") {
            savedOperand = currentOperand;
            currentOperand = "";
            queuedOperation = operator;
            operator = "";
            operations.forEach(operation => operation.classList.remove("selected"));
    }
        if (number.textContent === "." && currentOperand.includes(".")) return;
        currentOperand += number.textContent;
}

// Operate

function operate() {
if (currentOperand === "" || queuedOperation === "" || savedOperand === "") return console.log("Incomplete operation");

    switch (queuedOperation) {

        case "+":
            currentOperand = String(Number(savedOperand) + Number(currentOperand));
            break;
        case "-":
            currentOperand = String(Number(savedOperand) - Number(currentOperand));
            break;
        case "x":
            currentOperand = String(Number(savedOperand) * Number(currentOperand));
            break;
        case "%":
            if (currentOperand == "0" || currentOperand == "." || savedOperand == "0" || savedOperand == ".") {
                currentOperand = divisionByZero;
                break;
            }
            currentOperand = String(Number(savedOperand) / Number(currentOperand));
            break;
        case "mod":
            currentOperand = String(Number(savedOperand) % Number(currentOperand));
            break;
        case "^":
            currentOperand = String(Number(savedOperand) ** Number(currentOperand));
            break;
    }   

    queuedOperation = "";
    savedOperand = "";
    return currentOperand;
    }   

function clearCalculator() {
    currentOperand = "";
    savedOperand = "";
    operator = "";
    queuedOperation = "";
    operations.forEach(operation => operation.classList.remove("selected"));
}


// 1. Receive first number
// 2. Press operation 
// 3. Receive second number. Save first number in separate variable. 
// Turn off operation key when first number begins being inputted
// 4. Calculate when either another operation or "equal" key are pressed.
// 5. Continue calculation with previous result + next operation + next number.