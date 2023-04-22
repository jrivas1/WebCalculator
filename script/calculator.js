// global calculator state
const calculator = {
    currentNum: "",
    currentResult: "",
    operator: this.equals,
    numNext: false,
    done: false,
    add: function () { return (+this.currentResult + +this.currentNum).toString() },
    subtract: function () { return (+this.currentResult - +this.currentNum).toString() },
    multiply: function () { return (+this.currentResult * +this.currentNum).toString() },
    divide: function () {
        return (this.currentResult / this.currentNum).toString();
    },
    equals: function () {
        return +this.currentNum;
    }
};
const display = document.querySelector(".display");

// Add a listener to all buttons

buttons = document.querySelectorAll("button");

buttons.forEach(element => {
    element.addEventListener("click", processClick);
});



function processClick(e) {
    let text = e.currentTarget.innerText;

    if (!isNaN(text)) {
        if (calculator.numNext) {
            calculator.numNext = false;
            calculator.currentNum = "";
        }
        if (calculator.currentNum.length < 8) {
            calculator.currentNum += text;
        }
    }
    if (text === "AC") {
        calculator.currentNum = "";
        calculator.operator = calculator.equals;
        calculator.currentResult = "";
        calculator.numNext = false;
    }
    if (text === "+/-" && calculator.currentNum) {
        if (calculator.currentNum.charAt(0) !== "-") {
            calculator.currentNum = "-" + calculator.currentNum;
        } else {
            calculator.currentNum = calculator.currentNum.substring(1);
        }
    }
    if (["+", "-", "x", "÷", "="].includes(text)) {
        if(!calculator.numNext || text === "="){
            calculator.currentResult = calculator.currentResult ? calculator.operator() : calculator.currentNum;
        }
        calculator.numNext = true;

        if (text === "+") {
            calculator.operator = calculator.add;
        }
        if (text === "-") {
            calculator.operator = calculator.subtract;
        }
        if (text === "x") {
            calculator.operator = calculator.multiply;
        }
        if (text === "÷") {
            calculator.operator = calculator.divide;
        }
    }
    if (text === "%") {
        calculator.currentNum /= 100;
    }
    if (text === ".") {
        if (!calculator.currentNum.includes(".")) {
            calculator.currentNum = calculator.currentNum.concat(".");
        }
    }

    updateDisplay();
}

function updateDisplay() {
    let num = calculator.numNext ? +calculator.currentResult : +calculator.currentNum;
    if (num.toString().length > 8) {
        num = num.toExponential(3);
    }
    display.innerText = num;
}