# Sorteador de Números

> 🎲 **Aplicação web responsiva para sorteio de números aleatórios**

Uma ferramenta moderna e intuitiva para gerar números aleatórios com controle total sobre intervalos e repetições. Desenvolvida com foco na experiência do usuário e compatibilidade mobile.

## Preview

- **Interface responsiva** que funciona perfeitamente em mobile e desktop
- **Animações fluidas** com feedback visual em tempo real  
- **Controle avançado** de intervalos e repetições
- **Design moderno** com gradientes e identidade visual consistente

## Funcionalidades

### Interface
- Layout responsivo que se adapta a diferentes tamanhos de tela
- Design com gradientes e animações CSS
- Logo e identidade visual consistente
- Sistema de cores baseado em tons escuros

### Sorteio
- Definição de intervalo personalizado (número mínimo e máximo)
- Controle de quantidade de números a sortear
- Opção para permitir ou não repetição de números
- Validação automática dos campos de entrada
- Animação sequencial dos resultados

## Tecnologias Utilizadas

- HTML5 semântico com atributos de acessibilidade
- CSS3 com Custom Properties e design responsivo
- JavaScript vanilla para manipulação do DOM
- Abordagem mobile-first no desenvolvimento

## Estrutura do Projeto

```
Sorteador de números/
├── index.html              # Estrutura HTML principal
├── scripts.js              # Lógica JavaScript
├── styles/
│   ├── index.css           # Arquivo de importação dos estilos
│   ├── global.css          # Variáveis CSS e estilos base
│   ├── header.css          # Estilos do cabeçalho
│   ├── main.css            # Estilos do formulário e botões
│   ├── draw.css            # Estilos das animações de resultado
│   └── footer.css          # Estilos do rodapé
└── assets/
    └── images/             # Elementos visuais e ícones
```

## Sistema de Design

### Cores
- Fundo principal: tons escuros (#020202, #111012)
- Cor de destaque: verde-água (#8de7dd)
- Gradientes para botões e elementos interativos
- Hierarquia visual com diferentes tons para texto

### Componentes
- Campos de entrada com bordas em gradiente
- Toggle switch para controle de repetições
- Botão principal com efeito visual
- Círculos animados para exibir números sorteados

### Responsividade
- Mobile (até 480px): layout compacto e centralizado
- Tablet (768px+): elementos com tamanhos ampliados
- Desktop (950px+): layout horizontal
- Telas grandes (1200px+): espaçamentos aumentados

## Implementação Técnica

### Validação de Entrada
```javascript
// Remove caracteres não numéricos dos campos
input.oninput = () => {
  let value = input.value.replace(/[^0-9]/g, "");
  input.value = value.trim();
};
```

### Algoritmo de Sorteio
```javascript
function drawNumbers(amount, spaceSample) {
  const sortedNumbers = [];
  const copySpaceSample = [...spaceSample];
  
  while (sortedNumbers.length < amount) {
    const random = Math.floor(Math.random() * copySpaceSample.length);
    sortedNumbers.push(copySpaceSample[random]);
    
    if (checkbox.checked) {
      copySpaceSample.splice(random, 1); // Remove para evitar repetição
    }
  }
  return sortedNumbers;
}
```

### Animações
```javascript
// Exibe números com delay sequencial
function showNumbers() {
  if (i < sortedNumbers.length) {
    // Cria elemento DOM com animações CSS
    setTimeout(showNumbers, 3500);
  }
}
```

## Recursos de Usabilidade

### Mobile
- Elementos centralizados para facilitar o uso
- Áreas de toque adequadas para dispositivos móveis
- Teclado numérico automático nos campos de entrada
- Transições suaves entre diferentes estados

### Interatividade
- Efeitos visuais nos elementos interativos
- Feedback visual durante o processo de sorteio
- Estados claros para hover, focus e active
- Animações que indicam carregamento

### Acessibilidade
- Estrutura HTML semântica
- Contraste adequado entre elementos
- Navegação funcional via teclado
- Labels descritivos para formulários

## Conceitos Demonstrados

### Iniciantes
- Estrutura HTML básica e semântica
- CSS responsivo com media queries
- JavaScript para interatividade básica
- Manipulação de eventos DOM

### Intermediários
- CSS Grid e Flexbox para layouts
- Custom Properties (variáveis CSS)
- Manipulação avançada do DOM
- Algoritmos básicos de randomização

### Avançados
- Animações CSS profissionais
- Arquitetura CSS organizacional
- Otimização de performance
- Padrões de código limpo

## Como Funciona

1. O usuário define o intervalo (número mínimo e máximo)
2. Especifica quantos números deseja sortear
3. Escolhe se permite repetição ou não
4. Clica no botão para iniciar o sorteio
5. Os números são gerados aleatoriamente
6. Resultados são exibidos com animação sequencial

## Melhorias Possíveis

- Histórico de sorteios realizados
- Diferentes modos de sorteio
- Exportação de resultados
- Modo offline (PWA)
- Testes automatizados
- Sistema de build moderno
# sorteador
