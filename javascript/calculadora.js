// Seleciona o visor da calculadora e os botões
const display = document.getElementById('display');
const buttons = document.querySelectorAll('#buttons .button');
let posfixa = []; // Array para armazenar a expressão em notação pós-fixa

// Atualiza o visor com o valor fornecido
function updateDisplay(value) {
  let temp = display.value + value;
  temp = temp.replace(/\s+/g, ''); // Remove espaços extras
  display.value = temp;
}

// Converte a expressão do formato infixo para pós-fixo
function infixaParaPosfixa() {
  posfixa = [];
  let pilha = [];
  const expression = display.value
    .replace(/,/g, '.')  // Substitui vírgula por ponto decimal
    .replace(/×/g, '*')  // Substitui símbolo de multiplicação
    .replace(/÷/g, '/'); // Substitui símbolo de divisão

  for (let i = 0; i < expression.length; i++) {
    let char = expression.charAt(i);

    // Verifica se é número (inclui números decimais)
    if (!isNaN(char) && char !== " " || char == ".") {
      while (i < expression.length && !isNaN(expression.charAt(i + 1)) || expression.charAt(i + 1) == ".") {
        char += expression.charAt(i + 1);
        i++;
      }
      posfixa.push(char); // Adiciona o número na notação pós-fixa
    } else if (char === '(') {
      pilha.push(char); // Empilha parênteses de abertura
    } else if (char === '+' || char === '-') {
      // Trata operadores de menor precedência
      while (pilha.length > 0 && pilha[pilha.length - 1] !== '(') {
        posfixa.push(pilha.pop());
      }
      pilha.push(char);
    } else if (char === '*' || char === '/') {
      // Trata operadores de maior precedência
      while (pilha.length > 0 && (pilha[pilha.length - 1] === '*' || pilha[pilha.length - 1] === '/')) {
        posfixa.push(pilha.pop());
      }
      pilha.push(char);
    } else if (char === ')') {
      // Desempilha até encontrar '('
      let retira = pilha.pop();
      while (retira !== '(') {
        posfixa.push(retira);
        retira = pilha.pop();
      }
    }
  }

  // Adiciona operadores restantes na pilha
  while (pilha.length > 0) {
    posfixa.push(pilha.pop());
  }
}

// Realiza o cálculo com a expressão pós-fixa
function calculate() {
  infixaParaPosfixa(); // Converte a expressão para pós-fixa
  let stack = [];

  for (let i = 0; i < posfixa.length; i++) {
    if (["+", "-", "*", "/"].includes(posfixa[i])) {
      // Realiza a operação usando os dois últimos números da pilha
      let aux1 = parseFloat(stack.pop());
      let aux2 = parseFloat(stack.pop());
      if (posfixa[i] === "+") stack.push(aux2 + aux1);
      if (posfixa[i] === "-") stack.push(aux2 - aux1);
      if (posfixa[i] === "*") stack.push(aux2 * aux1);
      if (posfixa[i] === "/") stack.push(aux2 / aux1);
    } else {
      stack.push(posfixa[i]); // Empilha números
    }
  }

  let result = stack.pop(); // Resultado final
  display.value = result.toString().replace('.', ','); // Exibe o resultado
}

// Limpa o visor
function clearDisplay() {
  display.value = '';
}

// Adiciona eventos de clique para cada botão
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent;

    if (button.dataset.number) {
      // Adiciona números ao visor
      if (display.value.charAt(display.value.length - 1) === ')') {
        updateDisplay('× ' + buttonValue);
      } else {
        updateDisplay(buttonValue);
      }
    } else if (button.dataset.operation) {
      // Adiciona operadores ao visor
      updateDisplay(`${buttonValue}`);
    } else if (button.dataset.clear) {
      clearDisplay(); // Limpa o visor
    } else if (button.dataset.equal) {
      calculate(); // Calcula a expressão
    } else if (button.dataset.decimal) {
      updateDisplay(','); // Adiciona vírgula decimal
    } else if (button.dataset.parentheses) {
      // Adiciona ou fecha parênteses
      if (
        display.value.charAt(display.value.length - 1) === '(' ||
        display.value === "" ||
        "+-×÷".includes(display.value.charAt(display.value.length - 1))
      ) {
        updateDisplay('(');
      } else {
        let stackBrackets = [];
        for (let i = 0; i < display.value.length; i++) {
          if (display.value.charAt(i) === '(') stackBrackets.push('(');
          if (display.value.charAt(i) === ')') stackBrackets.pop();
        }
        if (stackBrackets.length !== 0) {
          updateDisplay(')');
        } else {
          updateDisplay('× (');
        }
      }
    } else if (button.dataset.percentage) {
      alert("Feature ainda não implementada! Sorry :/");
    }
  });
});

// Permite calcular com a tecla "Enter"
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    calculate();
  }
});