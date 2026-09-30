
// Get key references

const display = document.querySelector("#display");
const keys = document.querySelectorAll('.key');
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll(".number");

// Input variables

let calculation = {
firstNumber : "",
operator : "",
secondNumber : "",
}

// Operation variables

let operationStep = "first number"; // possible values: "first number", "operator", "second number";

keys.forEach((key) => {
    key.addEventListener("mouseover", () => key.classList.add("hovered"));
    key.addEventListener("mouseout", () => key.classList.remove("hovered"));
    key.addEventListener("click", () => updateDisplay(key, calculation));
});

// Functions

    // Display manipulation
function updateDisplay (inputValue, calc) {
    const input = inputValue;

    // Check if input given is a number, update first number or second number
    if (input.classList.contains("number") && operationStep !== "operator") {
        if (operationStep === "first number") calc.firstNumber += input.textContent;
        else calc.secondNumber += input.textContent;
    }
    

    // Check if input given is an operator, change operator or calculate if equation is complete
    if (input.classList.contains("operator")) {
        if (operationStep === "second number" && calc.secondNumber !== "") {
            calculate(calc);
            calc.secondNumber = "";
        }
        if (calc.firstNumber !== "") {
        calc.operator = input.textContent;
        }
    }
    
    // Delete a character of the current operation part
    if (input.id === "backspace") {
        if (calc.secondNumber !== "") calc.secondNumber = calc.secondNumber.slice(0, calc.secondNumber.length - 1);
        else if (calc.operator !== "") calc.operator = "";
        else calc.firstNumber = calc.firstNumber.slice(0, calc.firstNumber.length - 1);
    }

    // Run the mathematical operation if the equation is complete
    if (input.id === "equal" && operationStep === "second number" && calc.secondNumber !== "") {
        calculate(calc);
        calc.operator = "";
        calc.secondNumber = "";
    }
    operationStep = calc.operator == "" ? "first number" : "second number"; 

    display.textContent = calc.firstNumber + calc.operator + calc.secondNumber;

}

    // Execute calculation
function calculate(calc) {

      switch (calc.operator) { 

        case "+":
            return calc.firstNumber = add(calc.firstNumber, calc.secondNumber);
        case "-":
            return calc.firstNumber = subtract(calc.firstNumber, calc.secondNumber);
        case "x":
            return calc.firstNumber = multiply(calc.firstNumber, calc.secondNumber);
        case "%":
            return calc.firstNumber = divide(calc.firstNumber, calc.secondNumber);
      }
}

function truncateDecimals(number) {
    return Math.trunc(number * 10**5) / 10**5;
}

    // Math operations

function add(a, b) {
    return String(truncateDecimals(Number(a) + Number(b)));
}

function subtract(a, b) {
    return String(truncateDecimals(Number(a) - Number(b)));
}

function multiply(a, b) {
    return String(truncateDecimals(Number(a) * Number(b)));
}

function divide(a, b) {
    return String(truncateDecimals(Number(a) / Number(b)));
}
0
// Input structure

/* First number + operator + second number 

Steps to functionality

1. Get active part from input structure. If input compatible, add it.
    Case 1: Click number during first number, enter number
    Case 2: Click operator during first number empty, do nothing
    Case 3: Click operator during first number filled, enter operator, move to operator step
    Case 4: Click operator during operator step, change operator
    Case 5: Click number during operator step, enter number, move to second number step
    Case 6: Click number during second number step, enter number
    Case 7: Click operator during second number step, change operator, remain on second number step
    Case 8: Click equal sign without full input structure, do nothing
    Case 9: Click equal sign with full input structure, run operation, replace first number with result, change structure

    */

    2.12345 * 10**3