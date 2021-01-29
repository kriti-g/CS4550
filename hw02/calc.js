var equation = "";

function Evaluate() {
  equation = eval(equation);
  document.getElementById("result").innerHTML = equation;
}

function UpdateOperator(op) {
  document.getElementById("operator").innerHTML = op;
}

function WasOp() {
  return isNaN(parseInt(equation[equation.length-1]));
}

function KeyPress(key) {
  var num_display_el = document.getElementById("result");
  if (key === "c") {
    UpdateOperator("");
    equation = "";
    num_display_el.innerHTML = "0";
  } else if (!isNaN(parseInt(key))) {
    if (num_display_el.innerHTML === "0" || (WasOp() && equation[equation.length-1] != ".")) {
      num_display_el.innerHTML = "";
    }
    num_display_el.innerHTML += key;
    equation += key;
  } else if (key === "dot") {
    if (equation[equation.length-1] != "."){
      if (WasOp) {
        num_display_el.innerHTML = "0"
      }
      num_display_el.innerHTML += ".";
      equation += ".";
    }
  } else if (!WasOp()){
    if (key === "mult") {
      Evaluate();
      UpdateOperator("*");
      equation += "*";
    } else if (key === "min") {
      Evaluate();
      UpdateOperator("-");
      equation += "-";
    } else if (key === "div") {
      Evaluate();
      UpdateOperator("/");
      equation += "/";
    } else if (key === "pleq") {
      Evaluate();
      UpdateOperator("+");
      equation += "+";
    }
  }
}

function AddListeners() {
  var ids = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "pleq", "min",
  "mult", "div", "dot", "c"];
  equation = "0";
  ids.forEach((key) => {
    var element = document.getElementById(key+"-key");
    element.addEventListener("click", () => {KeyPress(key)});
  });
}

document.onload = AddListeners();
