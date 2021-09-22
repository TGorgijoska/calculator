 const digits = document.querySelectorAll('.number');
 const operators = document.querySelectorAll('.operator');
 const clearBtn = document.querySelector('.btn');
 const displayBox = document.querySelector('#display-value');

 let firstNum = "", 
    secondNum = "",
    operator = "",
    result = "",
    isEqual = false;

digits.forEach(digit => digit.addEventListener('click', () => {
        // if the last choice was "=", clear everything
        if(isEqual){
            firstNum = "";
            result = "";
            isEqual = false;
        }
        // new value
        let digitValue = getDigit(digit);
        storeNumber(digitValue);

        clearDisplay();
        display(digitValue);
        
        })
);
operators.forEach(op => op.addEventListener('click', () => { 
    operatorSelectedDisplay(op);
    // change choice from = to some other operator
    if(isEqual){
        setOperator(op);
        isEqual = false;
    }   
    // if we got both naumbers, do the math and display result
    if(secondNum != ""){
        operate(operator, Number(firstNum), Number(secondNum));
        firstNum = result;
        secondNum = "";
        operator = "";

        clearDisplay();
        display(result);
    }
    setOperator(op);

}));

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
function display(value) {
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
    result = x/y;
}

// DISPLAY CHANGING FUNCTIONS
function operatorSelectedDisplay(op) {
    if(operator != ""){
        let remove = document.querySelector(`[data-operator="${operator}"]`);
        remove.classList.remove('selected');
    }
    op.classList.add('selected');
}