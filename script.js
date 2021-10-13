
const calculator = {
    displayValue: "0",
    firstOperand: null,
    secondOperandNeeded: false,
    operator: null,
};

const calculator_keys = document.querySelector(".calculator-buttons");
window.addEventListener("keydown", (e) => {
    value = e.key;
    switch (value) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "=":
            operatorHandler(value);
            break;
        case "Enter":
            operatorHandler("=");
            break;
        case ".":
            inputDecimal(value);
            break;
        case "%":
            percent();
            break;
        case "Backspace":
            deleteNumber();
            break;
        case "Escape":
            resetCalculator();
        default:
            if (Number.isInteger(parseFloat(value))) {
                inputDigits(value);
            }
    }
    updateDisplay();
});
calculator_keys.addEventListener("click", (e) => {

    const { target } = e;// Equivalent to const target = e.target;
    const { value } = target;
    if (!target.matches('button')) {
        return;
    }
    switch (value) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "=":
            operatorHandler(value);
            break;
        case ".":
            inputDecimal(value);
            break;
        case "sign":
            updateSign(value);
            break;
        case "%":
            percent();
            break;
        case "delete":
            deleteNumber();
            break;
        case "clear-all":
            resetCalculator();
            break;
        default:
            if (Number.isInteger(parseFloat(value))) {
                inputDigits(value);
            }
    }
    updateDisplay();
});


function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
        return num1 / num2;
}

function operate(num1, num2, operator) {
    if (operator == "+") {
        return add(num1, num2)
    }else if (operator == "-") {
        return subtract(num1, num2)
    }else if (operator == "*") {
        return multiply(num1, num2)
    }else if (operator == "/") {
        return divide(num1, num2)
    }
}

function updateDisplay() {
    const display = document.querySelector(".calculator-screen");
    display.value = calculator.displayValue;
    console.log(calculator);
}

function updateSign() {
    calculator.displayValue = String(-parseFloat(calculator.displayValue));
    
}
function percent() {
    let currentValue = parseFloat(calculator.displayValue);
    currentValue *= 0.01;
    calculator.displayValue = `${parseFloat(currentValue.toFixed(7))}`;

}
function inputDigits(digit) {
    const { displayValue, secondOperandNeeded } = calculator; 
    /* This means: 
    const displayValue = calculator.displayValue; 
    const SecondOperand = calculator.SecondOperand 
    */
    if (displayValue === "0") {
        calculator.displayValue = digit;
        
    }else if (secondOperandNeeded === true) {
        calculator.displayValue = digit;
        calculator.secondOperandNeeded = false;
    }
    else {
    calculator.displayValue = displayValue + digit;
    calculator.displayValue = calculator.displayValue.substring(0, 9);
    }
    console.log(calculator);
}

function inputDecimal(dot) {
    if (calculator.secondOperandNeeded === true) {
        calculator.displayValue = "0."
        calculator.secondOperandNeeded = false;
    }
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function operatorHandler(nextOperator) {
    /*This can also be wrriten as
        const firstOperand = calculator.firstOperand
        const disPlayValue = calculator.displayValue
        const operator = calculator.operator 
    */
    const {firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue); 

    if (operator && calculator.secondOperandNeeded) {
        calculator.operator = nextOperator;
        return;
    }
    //parsefloat converts the string content into a floating-point number
    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if(operator) {
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }
    calculator.secondOperandNeeded = true;
    calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator ) {
    if (operator === "+") {
        return add(firstOperand, secondOperand);
    }else if (operator === "-") {
        return subtract(firstOperand, secondOperand);
    }else if (operator === "*") {
        return multiply(firstOperand, secondOperand);
    }else if (operator === "/") {
        if (secondOperand === 0) {
            alert("You can't divide by 0!")

        } else{
            return divide(firstOperand, secondOperand);
        }
    }
    return secondOperand;
}
function deleteNumber() {
    if (calculator.displayValue === "" || calculator.displayValue.length === 1) {
        calculator.displayValue = "0";
    }else {
        calculator.displayValue = calculator.displayValue.slice(0, -1); 
    }
}
function resetCalculator() {
    calculator.displayValue = "0";
    calculator.firstOperand = null;
    calculator.secondOperandNeeded = false;
    calculator.operator = null;
}
