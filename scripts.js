// ======================================
// VALIDAÇÃO DE ENTRADA DOS CAMPOS
// ======================================

// Seleciona todos os campos de entrada de texto
const inputText = document.querySelectorAll('input[type="text"]');

// Aplica validação em tempo real para aceitar apenas números
inputText.forEach(input => {
  input.oninput = () => {
    // Remove qualquer caractere que não seja número (0-9)
    let value = input.value.replace(/[^0-9]/g, "");
    // Remove espaços em branco das extremidades
    input.value = value.trim();
  };
});

// ======================================
// SELEÇÃO DE ELEMENTOS DOM
// ======================================

// Campos do formulário
const amountNumbers = document.getElementById("draw");      // Quantidade de números
const initialValue   = document.getElementById("initial");  // Valor mínimo
const finalValue     = document.getElementById("final");    // Valor máximo

// Elementos principais da página
const main           = document.querySelector("main");     // Área principal
const form           = document.querySelector("form");     // Formulário
const checkbox       = document.querySelector('input[type="checkbox"]'); // Checkbox "não repetir"

// ======================================
// MANIPULAÇÃO DO FORMULÁRIO
// ======================================

// Evento de envio do formulário
form.onsubmit = (event) => {
  // Previne o comportamento padrão de recarregar a página
  event.preventDefault();
  
  // Coleta e converte os valores dos campos para números inteiros
  const draw = {
    amount:        parseInt(amountNumbers.value),  // Quantos números sortear
    initialSample: parseInt(initialValue.value),   // Número mínimo do intervalo
    finalSample:   parseInt(finalValue.value),     // Número máximo do intervalo
  };
  
  // ======================================
  // VALIDAÇÕES DOS DADOS DE ENTRADA
  // ======================================
  
  // Verifica se a quantidade solicitada é maior que o espaço disponível
  if (draw.amount > (draw.finalSample - draw.initialSample)) {
    alert("O valor de números a serem sorteados é maior que o espaço amostral");
    return;
  }
  
  // Verifica se o valor inicial é menor que o final
  if (draw.initialSample >= draw.finalSample) {
    alert("Space amostral não correspondente");
    return;
  }
  
  // ======================================
  // CRIAÇÃO DO ESPAÇO AMOSTRAL
  // ======================================
  
  // Cria array com todos os números possíveis no intervalo
  const spaceSample = [];
  for (let i = draw.initialSample; i <= draw.finalSample; i++) {
    spaceSample.push(i);
  }
  
  // Inicia o processo de sorteio
  drawStructure(draw, spaceSample);
};

// ======================================
// CONTROLE DE EXECUÇÕES
// ======================================

// Contador para numerar os sorteios realizados
let execute = 0;

// ======================================
// FUNÇÃO PRINCIPAL - ESTRUTURA DO SORTEIO
// ======================================

function drawStructure(draw, spaceSample) {
  try {
    // Limpa a área principal e remove classes de layout
    main.classList.remove("grid");
    main.innerHTML = "";
    
    // ======================================
    // CRIAÇÃO DOS ELEMENTOS DE RESULTADO
    // ======================================
    
    // Container principal do resultado
    const space = document.createElement("div");
    space.classList.add("space", "container");
    
    // Título principal
    const result = document.createElement("h1");
    result.textContent = "Resultado do sorteio";
    result.classList.add("result");
    
    // Subtítulo com número da execução
    const subTitle = document.createElement("h2");
    execute++; // Incrementa contador de execuções
    subTitle.textContent = `${execute}º resultado`;
    subTitle.classList.add("sub-title");
    
    // Agrupa título e subtítulo
    const title = document.createElement("div");
    title.append(result, subTitle);
    
    // Container para os números sorteados
    const divSortedNumbers = document.createElement("div");
    divSortedNumbers.classList.add("div-sorted-numbers");
    
    // Monta estrutura final
    space.append(title, divSortedNumbers);
    main.append(space);
    
    // ======================================
    // PROCESSO DE SORTEIO
    // ======================================
    
    // Realiza o sorteio dos números
    const sortedNumbers = drawNumbers(draw.amount, spaceSample);
    
    // Índice para controlar a animação sequencial
    let i = 0;
    
    // ======================================
    // ANIMAÇÃO SEQUENCIAL DOS RESULTADOS
    // ======================================
    
    function showNumbers() {
      // Verifica se ainda há números para exibir
      if (i < sortedNumbers.length) {
        // Cria elemento para o número sorteado
        const numberSorted = document.createElement("span");
        numberSorted.classList.add("number-sorted");
        numberSorted.textContent = sortedNumbers[i];
        
        // Container com animação para o número
        const animationDiv = document.createElement("div");
        animationDiv.classList.add("animation-number");
        animationDiv.append(numberSorted);
        
        // Adiciona à tela
        divSortedNumbers.append(animationDiv);
        
        // Passa para o próximo número
        i++;
        
        // Agenda próxima execução com delay de 3.5 segundos
        setTimeout(showNumbers, 3500);
      } else {
        // ======================================
        // BOTÃO PARA NOVO SORTEIO
        // ======================================
        
        // Todos os números foram exibidos, cria botão de novo sorteio
        const button = document.createElement("button");
        button.classList.add("appear-button");
        button.innerHTML = `SORTEAR NOVAMENTE<img src="./assets/images/frame.svg" alt="rotate arrow">`;
        
        // Animação de aparição do botão
        setTimeout(() => button.style.opacity = "1", 50);
        
        // Evento do botão para sortear novamente
        button.onclick = () => {
          main.innerHTML = "";
          drawStructure(draw, spaceSample); // Recursão para novo sorteio
        };
        
        main.append(button);
      }
    }
    
    // Inicia a animação após 500ms
    setTimeout(showNumbers, 500);
    
  } catch (error) {
    // Tratamento de erros
    alert("Não foi possível realizar o sorteio");
    console.error(error);
  }
}

// ======================================
// ALGORITMO DE SORTEIO
// ======================================

function drawNumbers(amount, spaceSample) {
  // Array para armazenar os números sorteados
  const sortedNumbers = [];
  
  // Cópia do espaço amostral para não modificar o original
  const copySpaceSample = [...spaceSample];
  
  // Loop até ter a quantidade desejada de números
  while (sortedNumbers.length < amount) {
    // Gera índice aleatório dentro do espaço disponível
    const random = Math.floor(Math.random() * copySpaceSample.length);
    
    // Adiciona o número sorteado ao resultado
    sortedNumbers.push(copySpaceSample[random]);
    
    // Se "não repetir" estiver marcado, remove o número sorteado
    if (checkbox.checked) {
      copySpaceSample.splice(random, 1);
    }
  }
  
  return sortedNumbers;
}
