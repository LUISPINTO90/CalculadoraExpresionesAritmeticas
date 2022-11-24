//  DOM EVENTS
import Tree from "../src/Tree.js";

// Calculate Expresion Button
document.getElementById("calculateExpresion").addEventListener("click", () => {
  let expresion = document.getElementById("expresionInput").value;

  if (expresion == "") {
    Swal.fire({
      buttonsStyling: false,
      customClass: {
        confirmButton: "swalBtnColor",
      },
      icon: "error",
      title: "ERROR",
      text: "NO SE HA INGRESADO NINGUNA EXPRESIÓN.",
    });
  } else {
    let tree = new Tree(expresion);
    tree.expressionToTree();
    console.log(tree);
    document.getElementById("result").innerHTML = tree.result();
  }
});
