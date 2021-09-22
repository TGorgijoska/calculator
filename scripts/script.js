 const digits = document.querySelectorAll('.number');
 const operators = document.querySelectorAll('.operator');
 const clearBtn = document.querySelector('.btn');
 const displayBox = document.querySelector('#display-value');

 let firstNum = "", 
    secondNum = "",
    operator,
    result = "",
    isEqual = false;
let clearDisplayBool = false;

digits.forEach(digit => 
    digit.addEventListener('click', () => {
        let digitValue = getDigit(digit);

        if(clearDisplayBool) {
            clearDisplay()
        };
        display(digitValue);
        storeNumber(digitValue);
        clearDisplayBool = false;
        })
);
operators.forEach(op => op.addEventListener('click', () => {    
    if(secondNum != ""){
        operate(operator, Number(firstNum), Number(secondNum));
        firstNum = result;
        secondNum = "";
    }
    if(result != ""){
        clearDisplay();
        display(result);
    }
    setOperator(op);
    clearDisplayBool = true;   
}));

function setOperator(symbol) {
    operator = symbol.dataset.operator;
    if (operator == "="){
        isEqual = true;
    }
}
function storeNumber(value) {
    if(operator == null){
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
function display(value) {
    displayBox.textContent += value;
}

function equal(){
    
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
    result = x/y;
}