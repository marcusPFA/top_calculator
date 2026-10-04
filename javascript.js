//// Get references to HTML elements

const display = document.querySelector("#display");
const keys = document.querySelectorAll(".key");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const functions = document.querySelectorAll('.function');


// Set calculator variables

let currentOperand = "";
let operator = "";
let queuedOperation = "";
let savedOperand = "";

let divisionByZero = "N0 ):<";

// Set keyboard input variables

const numberKeys = "1234567890.";
const operationKeys = "+-*x/^%";
const functionKeys = "enter = backspace escape";


let calculatorInput = "";

//// Set event listeners

numbers.forEach(number => {
    number.addEventListener("click", () => {
        calculatorInput = number.textContent;
        appendNumericalInput(calculatorInput);
    });    
})

operations.forEach((operation) => {
    operation.addEventListener("click", () => {
        calculatorInput = operation.textContent;
        selectOperation(operation)
    });
})

functions.forEach((func) => {
    func.addEventListener("click", () => {
        calculatorInput = func.id;
        pressFunctionKey(calculatorInput)
    })
});

document.addEventListener("keydown", (input) => {
    calculatorInput = input.key.toLowerCase();
    if (numberKeys.includes(calculatorInput)) appendNumericalInput(calculatorInput);
    if (operationKeys.includes(calculatorInput)) selectOperation();
    if (functionKeys.includes(calculatorInput)) pressFunctionKey(calculatorInput);


    console.log(currentOperand);
    display.textContent = currentOperand;
});

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

function selectOperation() {

    if (calculatorInput === "*") calculatorInput = "x";
    if (calculatorInput === "/") calculatorInput = "%";

    operations.forEach(operation => {
        operation.classList.remove("selected")
        if (operation.textContent == calculatorInput) operation.classList.add("selected");
    });
    operator = calculatorInput;
    operate();
    
}

// Numerical input to display

function appendNumericalInput(input) {

        if (currentOperand === divisionByZero) currentOperand = "";

        if (operator !== "") {
            savedOperand = currentOperand;
            currentOperand = "";
            queuedOperation = operator;
            operator = "";
            operations.forEach(operation => operation.classList.remove("selected"));
    }
        if (input === "." && currentOperand.includes(".")) return;
        if (currentOperand.length < 24) currentOperand += input;

}

function pressFunctionKey(input) {
     switch (input) {
        case "delete": 
        case "backspace":
            currentOperand = currentOperand.slice(0, currentOperand.length-1);
            break;
        case "=":
        case "enter":
        case "equal":
                operate();
                operator = "="; 
            break;
        case "escape":
        case "clear":
            clearCalculator();
            break;
    }
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
            currentOperand = String(Math.trunc(Number(savedOperand) * Number(currentOperand) * 10000) / 10000);
            break;
        case "%":
            if (currentOperand == "0" || currentOperand == "." || savedOperand == "0" || savedOperand == ".") {
                currentOperand = divisionByZero;
                break;
            }
            currentOperand = String(Math.trunc(Number(savedOperand) / Number(currentOperand) * 10000) / 10000);
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