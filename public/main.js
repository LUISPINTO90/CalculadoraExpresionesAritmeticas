//  DOM EVENTS
import Tree from "../src/Tree.js";

// Calculate Expresion Button
document.getElementById("calculateExpresion").addEventListener("click", () => {
  let expresion = document.getElementById("expresionInput").value;

  if (expresion == "") {
    Swal.fire({
      customClass: {
        confirmButton: "swalBtnColor",
      },
      icon: "error",
      title: "Error",
      text: "No se ha ingresado ninguna expresión",
    });
  } else {
    if (expresion.length < 3) {
      Swal.fire({
        customClass: {
          confirmButton: "swalBtnColor",
        },
        icon: "error",
        title: "Error",
        text: "Ingresa una expresión válida",
      });
    } else {
      let tree = new Tree(expresion);
      tree.splitExpression();
      console.log(tree);

      let result = document.getElementById("result");
      result.innerHTML = tree.result();

      console.log("Recorrido en PreOrder: " + tree.preOrder(tree));
      console.log("Recorrido en PostOrder: " + tree.postOrder(tree));
    }
  }
});
