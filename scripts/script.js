// Declare variables
let display = document.querySelector("#display-1");
let shadowDisplay = document.querySelector("#display-2");
let changeBtn = document.querySelector("#changeBtn");
let numeric = document.querySelectorAll(".numeric-keypad .btn");
let constant = document.querySelectorAll(".constants .btn");
let basic = document.querySelectorAll(".basic-operations-keypad .btn");
let intermediate = document.querySelectorAll(".intermediate-operations .btn");
let advanced = document.querySelectorAll(".advanced-operations-keypad .btn");
let op;
let result;
let firstNum;
let operation;

changeBtn.addEventListener("click", function () {
    let firstList = document.querySelector(".firstList");
    let secondList = document.querySelector(".secondList");

    changeBtn.classList.toggle("bg-color");
    firstList.classList.toggle("hidden");
    secondList.classList.toggle("hidden");
});

// Change clear button content
onclick = function () {
    if (display.value != "") {
        basic[0].textContent = "CE";
    } else {
        basic[0].textContent = "C";
    }

    resetVar();
};

function calculateOneNum(n1, op) {
    if (op == "x2") {
        return Math.pow(n1, 2);
    } else if (op == "2x") {
        return Math.pow(2, n1);
    } else if (op == "Log") {
        return Math.log10(n1);
    } else if (op == "2√x") {
        return Math.sqrt(n1);
    } else if (op == "10x") {
        return Math.pow(10, n1);
    } else if (op == "Ln") {
        return Math.log(n1);
    } else if (op == "ℇx") {
        return Math.pow(Math.E, n1);
    } else if (op == "x!") {
        let fact = 1;

        for (let i = n1; i > 0; i--) {
            fact *= i;
        }

        return fact;
    } else if (op == "Exp") {
        // Verificar como será feito
    } else if (op == "|x|") {
        return Math.abs(n1);
    } else if (op == "1/x") {
        return 1 / n1;
    } else if (op == "Sin") {
        return Math.sin(n1);
    } else if (op == "Cos") {
        return Math.cos(n1);
    } else if (op == "Tan") {
        return Math.tan(n1);
    }
}

// Calculate n1 & n2
function calculateTwoNums(n1, n2, op) {
    n1 = parseFloat(n1);
    n2 = parseFloat(n2);

    if (op == "+") {
        return n1 + n2;
    } else if (op == "-") {
        return n1 - n2;
    } else if (op == "*") {
        return n1 * n2;
    } else if (op == "/") {
        return n1 / n2;
    } else if (op == "^") {
        return Math.pow(n1, n2);
    } else if (op == "yroot") {
        return Math.pow(n1, 1 / n2);
    } else if (op == "Mod") {
        return n1 % n2;
    } else if (op == "base") {
        n1 = Math.log(n1);
        n2 = Math.log(n2);

        return n1 / n2;
    } else if (op == "Exp") {
        return n1 * Math.pow(10, n2);
    }
}

// Receive operation and run calculate
function runOp(e) {
    let auxCalc = 1;
    let strCopy;
    result = 0;

    if (typeof e == "string") {
        if (e == "Backspace") {
            e = "C";
        } else if (e == "Delete") {
            e = "CE";
        } else if (e == "Enter") {
            e = "=";
        }
        op = e;
    } else {
        if (e.target.tagName != "BUTTON") {
            op = e.target.parentElement.textContent;
        } else {
            op = e.target.textContent;
        }
    }

    if (
        display.value == "" &&
        shadowDisplay.value == "" &&
        op != "C" &&
        op != "CE"
    ) {
        return;
    }

    switch (op) {
        case "C":
            shadowDisplay.value = "";
            break;
        case "CE":
            display.value = "";
            break;
        case "+":
            shadowDisplay.value += `${display.value} + `;
            auxCalc = 0;
            break;
        case "-":
            shadowDisplay.value += `${display.value} - `;
            auxCalc = 0;
            break;
        case "*":
            shadowDisplay.value += `${display.value} * `;
            auxCalc = 0;
            break;
        case "/":
            shadowDisplay.value += `${display.value} / `;
            auxCalc = 0;
            break;
        case "=":
            shadowDisplay.value += `${display.value} = `;
            auxCalc = 0;
            break;
        case "x2":
            shadowDisplay.value = `sqr(${display.value}) `;
            break;
        case "xy":
            shadowDisplay.value += `${display.value} ^ `;
            auxCalc = 0;
            break;
        case "Log":
            shadowDisplay.value += `log(${display.value}) `;
            break;
        case "2√x":
            shadowDisplay.value += `√(${display.value}) `;
            break;
        case "y√x":
            shadowDisplay.value += `${display.value} yroot `;
            auxCalc = 0;
            break;
        case "ℇx":
            shadowDisplay.value += `${Math.E}^${display.value}`;
            break;
        case "10x":
            shadowDisplay.value += `10^(${display.value}) `;
            break;
        case "Ln":
            shadowDisplay.value += `Ln(${display.value}) `;
            break;
        case "2x":
            shadowDisplay.value += `2^(${display.value}) `;
            break;
        case "Logyx":
            shadowDisplay.value += `${display.value} log base `;
            auxCalc = 0;
            break;
        case "x!":
            shadowDisplay.value += `fact(${display.value}) `;
            break;
        case "Exp":
            display.value = `${display.value},e+`;
            auxCalc = 0;
            break;
        case "|x|":
            shadowDisplay.value += `abs(${display.value}) `;
            break;
        case "Mod":
            shadowDisplay.value += `${display.value} Mod `;
            auxCalc = 0;
            break;
        case "1/x":
            shadowDisplay.value += `1/(${display.value}) `;
            break;
        case "Sin":
            shadowDisplay.value += `Sin(${display.value}) `;
            break;
        case "Cos":
            shadowDisplay.value += `Cos(${display.value}) `;
            break;
        case "Tan":
            shadowDisplay.value += `Tan(${display.value}) `;
            break;
    }

    if (op != "C" && op != "CE") {
        if (auxCalc) {
            result = calculateOneNum(display.value, op);
        } else if (display.value != "" && firstNum != undefined) {
            if (operation == "Exp") {
                let auxNum = display.value.split("+");
                result = calculateTwoNums(firstNum, auxNum[1], operation);
            } else {
                result = calculateTwoNums(firstNum, display.value, operation);
            }
        }
    }

    if (op == "Exp") {
        strCopy = display.value.split(",");
    } else {
        strCopy = shadowDisplay.value.split(" ");
    }

    if (op == "Exp") {
        operation = op;
    } else if (op != "=") {
        if (auxCalc) {
            operation = shadowDisplay.value != "" ? op : "";
        } else {
            operation =
                shadowDisplay.value != "" ? strCopy[strCopy.length - 2] : "";
        }
    }

    firstNum = result == 0 ? strCopy[0] : result;

    if (op != "Exp") {
        display.value = "";
        display.setAttribute("placeholder", result);
    }
}

// Reset some important variables
function resetVar() {
    if (shadowDisplay.value.endsWith(" = ") || op == "C" || op == "CE") {
        shadowDisplay.value = null;
        display.value = null;
        op = null;
        firstNum = null;
        operation = null;
    }
}

// Loop inside numeric keypad
numeric.forEach((number) => {
    let num;
    number.addEventListener("click", function (e) {
        num = e.target.value;

        if (num == "+/-") {
            if (display.value.indexOf("-", 0) == 0) {
                display.value = display.value.replace("-", "");
            } else {
                display.value = "-" + display.value;
            }
        } else {
            display.value += num;
        }
    });
});

constant.forEach((cons) => {
    cons.addEventListener("click", function (e) {
        if (e.target.textContent == "\u03C0") {
            display.value = Math.PI;
        } else if (e.target.textContent == "\u2107") {
            display.value = Math.E;
        } else {
            runOp(e);
        }
    });
});

// Loop inside basic op keypad
basic.forEach((bas) => {
    bas.addEventListener("click", function (e) {
        runOp(e);
    });
});

intermediate.forEach((inter) => {
    inter.addEventListener("click", function (e) {
        runOp(e);
    });
});

advanced.forEach((adv) => {
    adv.addEventListener("click", function (e) {
        if (e.target.textContent != "2nd" && e.target.textContent != "nd") {
            runOp(e);
        }
    });
});

// Check number key press
document.addEventListener("keydown", function (e) {
    let keyToNum = parseInt(e.key);

    if (!isNaN(keyToNum)) {
        display.value += keyToNum;
    } else if (
        e.key == "+" ||
        e.key == "-" ||
        e.key == "*" ||
        e.key == "/" ||
        e.key == "=" ||
        e.key == "Backspace" ||
        e.key == "Delete" ||
        e.key == "Enter"
    ) {
        runOp(e.key);
    }
});
