# Projeto Calculadora

## Descrição

Este é um projeto de uma calculadora simples, desenvolvida com HTML, CSS e JavaScript, que suporta operações básicas, incluindo soma, subtração, multiplicação e divisão. O projeto também implementa funcionalidades adicionais, como manipulação de parênteses e suporte a números decimais com vírgulas.

---

## Funcionalidades

- **Operações básicas**: Adição, subtração, multiplicação e divisão.
- **Parênteses**: Suporte para agrupamento de operações utilizando parênteses.
- **Números decimais**: Entrada de números com vírgulas como separador decimal.
- **Botão "C"**: Limpa o visor e redefine a entrada.
- **Interação responsiva**: Efeitos visuais ao clicar nos botões.
- **Entrada pelo teclado**: Suporte à tecla _Enter_ para calcular diretamente.

---

## Tecnologias Utilizadas

- **HTML**: Estrutura do layout da calculadora.
- **CSS**: Estilização da interface, com uso de grid layout para organização dos botões.
- **JavaScript**: Lógica de funcionamento da calculadora, incluindo:
  - Conversão de expressões infixas para pós-fixas (Notação Polonesa Reversa).
  - Cálculo do resultado com base na notação pós-fixa.
  - Manipulação do DOM para interações com os botões e o visor.

---

## Estrutura do Projeto

```plaintext
.
├── index.html          # Arquivo principal da interface
├── css/
│   └── estilo.css      # Arquivo de estilos da calculadora
└── javascript/
    └── calculadora.js  # Lógica e funcionalidade da calculadora
```
