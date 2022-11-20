import Node from "./Node.js";

export default class Tree {
  constructor(expression) {
    this.root = null;
    this.head = null;
    this.tail = null;

    this.expression = expression;

    this.preOrderArray = [];
    this.postOrderArray = [];
  }

  // Split the expression into an array
  splitExpression() {
    let expressionArray = this.expression.split("");

    for (let i = 0; i < expressionArray.length; i++) {
      let node = new Node(expressionArray[i]);
      this.add(node);
    }

    this.createTree();
  }

  add(node) {
    if (this.head == null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.previous = this.tail;
      this.tail = node;
    }
  }

  delete(node) {
    if (node != this.head) {
      node.previous.next = node.next;

      if (node.next != null) {
        node.next.previous = node.previous;
      } else {
        this.tail = node.previous;
      }
    } else {
      if (this.head == this.tail) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
        this.head.previous = null;
      }
    }
  }

  createTree() {
    let aux = this.head;

    while (aux != null) {
      if (aux.value == "*" || aux.value == "/") {
        aux.left = aux.previous;
        aux.right = aux.next;
        this.delete(aux.previous);
        this.delete(aux.next);
      }
      aux = aux.next;
    }

    aux = this.head;

    while (aux != null) {
      if (aux.value == "+" || aux.value == "-") {
        aux.left = aux.previous;
        aux.right = aux.next;
        this.delete(aux.previous);
        this.delete(aux.next);
      }
      aux = aux.next;
    }

    this.root = this.head;

    return this.root;
  }

  preOrder(node) {
    if (node != null) {
      this.preOrderArray.push(node.value);
      this.preOrder(node.left);
      this.preOrder(node.right);
    }

    if (this.preOrderArray[this.preOrderArray.length - 1] == undefined) {
      this.preOrderArray.pop();
    }

    return this.preOrderArray;
  }

  postOrder(node) {
    if (node != null) {
      this.postOrder(node.left);
      this.postOrder(node.right);
      this.postOrderArray.push(node.value);
    }

    if (this.postOrderArray[this.postOrderArray.length - 1] == undefined) {
      this.postOrderArray.pop();
    }

    return this.postOrderArray;
  }

  result() {
    let preOrder = this.preOrder(this.root);
    let postOrder = this.postOrder(this.root);

    let preOrderString = "";
    let postOrderString = "";

    for (let i = 0; i < preOrder.length; i++) {
      preOrderString += preOrder[i] + " ";
    }
    for (let i = 0; i < postOrder.length; i++) {
      postOrderString += postOrder[i] + " ";
    }

    return `
    <article class="title sub">RESULTADO</article>
    <p>Recorrido en PreOrder: <b>${preOrderString}</b></p><br>
    <p>Recorrido en PostOrder: <b>${postOrderString}</b></p>
    `;
  }
}
