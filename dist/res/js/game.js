let gameStatus = localStorage.getItem("gameStatus");
let gameMathName = localStorage.getItem("gameMathName");
let gameMathOperator = localStorage.getItem("gameMathOperator");
let gameMathPoint = localStorage.getItem("gameMathPoint");
let name = document.getElementById("name");
name.value = gameMathName;

if (gameStatus && gameStatus != 0 && gameStatus != null) {
   document.getElementById("first").classList.add("d-none");
   document.getElementById("last").classList.remove("d-none");
   document.getElementById("userName").innerHTML = gameMathName;
   document.getElementById("selectedOperator").innerHTML =
      gameMathOperator == 1
         ? "Addition (+)"
         : gameMathOperator == 2
         ? "Subtraction (-)"
         : gameMathOperator == 3
         ? "Division (/)"
         : gameMathOperator == 4
         ? "Multiplication (*)"
         : "Invalid Operator";
   document.getElementById("currentPoints").innerHTML = gameMathPoint;
   newQuestion(gameMathOperator);
}

function getData() {
   let name = document.getElementById("name").value;
   let operator = document.getElementById("operator").value;
   if (name == "") {
      alert("Name is required !!!");
   } else {
      localStorage.setItem("gameMathName", name);
      localStorage.setItem("gameMathOperator", operator);
      localStorage.setItem("gameMathPoint", 3);
      localStorage.setItem("gameStatus", 1);

      gameStatus = localStorage.getItem("gameStatus");
      gameMathName = localStorage.getItem("gameMathName");
      gameMathOperator = localStorage.getItem("gameMathOperator");
      gameMathPoint = localStorage.getItem("gameMathPoint");

      document.getElementById("userName").innerHTML = gameMathName;
      document.getElementById("selectedOperator").innerHTML =
         gameMathOperator == 1
            ? "Addition (+)"
            : gameMathOperator == 2
            ? "Subtraction (-)"
            : gameMathOperator == 3
            ? "Division (/)"
            : gameMathOperator == 4
            ? "Multiplication (*)"
            : "Invalid Operator";
      document.getElementById("currentPoints").innerHTML = gameMathPoint;

      document.getElementById("first").classList.add("d-none");
      document.getElementById("last").classList.remove("d-none");

      newQuestion(gameMathOperator);
   }
}

function newQuestion(gameMathOperator) {
   let num1 = Math.floor(Math.random() * 100);
   let num2 = Math.floor(Math.random() * 100);
   let operator =
      gameMathOperator == 1
         ? "+"
         : gameMathOperator == 2
         ? "-"
         : gameMathOperator == 3
         ? "/"
         : gameMathOperator == 4
         ? "*"
         : "Invalid Operator";

   document.getElementById("num1").innerHTML = num1;
   document.getElementById("num2").innerHTML = num2;
   document.getElementById("gOperator").innerHTML = operator;
}

function submit() {
   let num1 = parseInt(document.getElementById("num1").innerHTML);
   let num2 = parseInt(document.getElementById("num2").innerHTML);
   let operator = document.getElementById("gOperator").innerHTML;
   let userAnswer = document.getElementById("answer").value;
   let correctAnswer;
   let newQuestionOperator;
   if (operator == "+") {
      correctAnswer = num1 + num2;
      newQuestionOperator = 1;
   } else if (operator == "-") {
      correctAnswer = num1 - num2;
      newQuestionOperator = 2;
   } else if (operator == "/") {
      correctAnswer = num1 / num2;
      newQuestionOperator = 3;
   } else if (operator == "*") {
      correctAnswer = num1 * num2;
      newQuestionOperator = 4;
   } else {
      correctAnswer = "Invalid";
      newQuestionOperator = "Invalid Operator";
   }

   if (userAnswer == correctAnswer) {
      gameMathPoint = parseInt(gameMathPoint) + 1;
      localStorage.setItem("gameMathPoint", gameMathPoint);
      document.getElementById("currentPoints").innerHTML = gameMathPoint;
      alert("Correct !!! You have 1 more point");
      newQuestion(newQuestionOperator);
   } else {
      gameMathPoint = parseInt(gameMathPoint) - 1;
      localStorage.setItem("gameMathPoint", gameMathPoint);
      document.getElementById("currentPoints").innerHTML = gameMathPoint;
      if (gameMathPoint > 0) {
         alert(
            "Wrong Answer, The Correct Answer is " +
               correctAnswer +
               " !!! You just lost a point"
         );
         newQuestion(newQuestionOperator);
      } else {
         window.clearInterval(timer);
         alert(
            "Wrong Answer, The Correct Answer is " +
               correctAnswer +
               " !!! Game Over You have no Points Left"
         );
         document.getElementById("last").classList.add("d-none");
         document.getElementById("first").classList.remove("d-none");
         localStorage.setItem("gameStatus", 0);
         let name = document.getElementById("name");
         name.value = gameMathName;
      }
   }
}

//................SET TIMER................
let timer = setInterval(() => {
   submit();
}, 10000);

// if (gameMathPoint <= 0) {
//    clearInterval(timer);
// }

function resetGame() {
   localStorage.clear();
   window.location.reload();
}
