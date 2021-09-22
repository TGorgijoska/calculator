 const digits = document.querySelectorAll('.number');
 const operators = document.querySelectorAll('.operator');
 const clearBtn = document.querySelector('.btn');
 const displayBox = document.querySelector('#display-value');

 let firstNum = "", 
    secondNum = "",
    operator = "",
    result = 0,
    isEqual = false;
let clearDisplayBool = false;

digits.forEach(digit => digit.addEventListener('click', () => {
        // if the last choice was "=", clear everything
        if(isEqual){
            clearAll();
        }
        // new value
        let digitValue = getDigit(digit);
        storeNumber(digitValue);
        // if we are entering second number => clear 
        if(clearDisplayBool){
            clearDisplay();
        }
        updateDisplay(digitValue);
        clearDisplayBool = false;
        })
);
operators.forEach(op => op.addEventListener('click', () => { 
    operatorSelectedDisplay(op);
    // change choice from = to some other operator
    if(isEqual){
        setOperator(op);
        isEqual = false;
    }   
    // if we got both naumbers, do the math and updateDisplay result
    if(secondNum != ""){
        operate(operator, Number(firstNum), Number(secondNum));
        if(result.toString().length > 10){
            result = Number.parseFloat(result).toFixed(5);
        }
        firstNum = result;
        secondNum = "";
        operator = "";

        clearDisplay();
        updateDisplay(result);
    }
    setOperator(op);
    clearDisplayBool = true;

}));
clearBtn.addEventListener('click', clearAll);

function clearAll(){
    firstNum = "";
    secondNum = "";
    result = "";
    isEqual = false;
    clearDisplay();
}
function setOperator(symbol) {
    operator = symbol.dataset.operator;
    if (operator == "="){
        isEqual = true;
    }
}
function storeNumber(value) {
    if(operator == "" || firstNum == ""){
        firstNum += value;
    } else {
        secondNum += value;
    }
}
function getDigit(digit){
    return digit.dataset.numbervalue;
}
function clearDisplay() {
    displayBox.textContent = "";
}
function updateDisplay(value) {
    displayBox.textContent += value;
}

// operate
function operate(operator, x, y) {
    switch (operator){
        case "+": 
            add(x, y);
            break;
        case "-":
            subtract(x, y);
            break;
        case "*":
            multiply(x, y);
            break;
        case "/":
            divide(x, y);
            break;
    }     
}
function add(x, y){
    result = x+y;
}
function subtract(x, y){
    result = x-y;
}
function multiply(x,y) {
    result = x*y;
}
function divide(x, y) {
    if(y == 0){
        displayBox.textContent = "can't do that man";
    } else {
    result = x/y;
    }
}

// DISPLAY CHANGING FUNCTIONS
function operatorSelectedDisplay(op) {
    if(operator != ""){
        let remove = document.querySelector(`[data-operator="${operator}"]`);
        remove.classList.remove('selected');
    }
    op.classList.add('selected');
}