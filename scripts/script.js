 const digits = document.querySelectorAll('.number');
 const operators = document.querySelectorAll('.operator');
 const dot = document.querySelector('.dot');
 const clearBtn = document.querySelector('.btn');
 const backspace = document.getElementById('backspace');
 const displayBox = document.getElementById('display-value');


 let firstNum = "", 
    secondNum = "",
    operator = "",
    result = 0,
    isEqual = false,
    numLength = 0;
let clearDisplayBool = false;
let key;

/* --- EVENT LISTENERS --- */
document.addEventListener('keyup', function(e){
    switch (e.key){
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        case '.':
            key = document.querySelector(`[data-numbervalue="${e.key}"]`);
            digitPressed(key);
            break;
        case '/':
        case '*':  
        case '+':
        case '-':
            key = document.querySelector(`[data-operator="${e.key}"]`);
            operatorPressed(key);
            break;
        case 'Enter':
            key = document.querySelector('[data-operator="="]');
            operatorPressed(key);
            break;
        case 'c':
            clearAll();
            break;
    }
}); 

digits.forEach(digit => digit.addEventListener('click',() => {digitPressed(digit) }));
operators.forEach(op => op.addEventListener('click', () => {operatorPressed(op) }));
clearBtn.addEventListener('click', clearAll);
backspace.addEventListener('click', deleteNum);
dot.addEventListener('click', dotToggle);

/* --- FUCTIONS --- */
function digitPressed(digit){
    // prevent from entering too long number
    numLength++;
    if(numLength >= 12){
        return;
    }
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
}
function operatorPressed(op){
    numLength = 0;
    // operatorSelectedDisplay(op);
    // change choice from = to some other operator
    if(isEqual){
        setOperator(op);
        isEqual = false;
    }   
    // if we got both naumbers, do the math and updateDisplay result
    if(secondNum != ""){
        operate(operator, Number(firstNum), Number(secondNum));

        fixLenght();
        
        firstNum = result;
        secondNum = "";
        operator = "";

        clearDisplay();
        updateDisplay(result);
    }
    setOperator(op);
    clearDisplayBool = true;
    dot.classList.remove('disable');
}

function fixLenght() {
    let numArr = result.toString().split('.');
    if(numArr.length == 2){
        if(result.toString().length > 12){
            let excess = result.toString().length - 12; 
            let clip = numArr[1].length - excess;
            result = Number(result.toFixed(clip));
        }
    }

}
function deleteNum() {
    displayBox.textContent = displayBox.textContent.slice(0,-1);
    let value = displayBox.textContent;
    if(result != ""){
        result = value;
        firstNum = value;
    }
    else if(operator == "" || firstNum == ""){
        firstNum = value;
        numLength--;
    } else {
        secondNum = value;
        numLength--;
    }
    
}
function dotToggle(){
    if(displayBox.textContent == "."){
        displayBox.textContent = '0.';
    }
    dot.classList.add('disable');
}

function clearAll(){
    firstNum = "";
    secondNum = "";
    result = "";
    operator = "";
    isEqual = false;
    dot.classList.remove('disable');
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
        result = 0;
    } else {
    result = x/y;
    }
}
