// global calculator state
const calculator = {
    currentNum: "",
    currentResult: "",
    operator: null,
    numNext: false,
    add: function () { return (+this.currentResult + +this.currentNum).toString() },
    subtract: function () { return (+this.currentResult - +this.currentNum).toString() },
    multiply: function () { return (+this.currentResult * +this.currentNum).toString() },
    divide: function () {
        return (this.currentResult / this.currentNum).toString();
    },
    equals: function () {
        return this.currentResult;
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
        calculator.currentNum += text;
    }
    if (text === "AC") {
        calculator.currentNum = "";
        calculator.operator = null;
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
    if (["+","-","x","&#247;","="].includes(text)) {
        calculator.currentResult = calculator.currentResult ? calculator.operator() : calculator.currentNum;
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
        if (text === "&#247;") {
            calculator.operator = calculator.divide;
        }

        if (text === "=") {
            calculator.operator = calculator.equals;
        }
    }
    if (text === "%"){
        calculator.currentNum /= 100;
    }
    if (text === ".") {
        if (!calculator.currentNum.includes(".")){
            calculator.currentNum = calculator.currentNum.concat(".");
        }
    }

    updateDisplay();
}

function updateDisplay() {
    let text = calculator.numNext ? +calculator.currentResult : +calculator.currentNum;
    display.innerText = text;
}