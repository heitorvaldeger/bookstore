# Bookstore (Frontend)

Aplicação web construída como parte do desafio técnico para a seleção de desenvolvedor web na Buzzmonitor. Essa aplicação deve ser integrada ao seu backend. O layout da aplicação segue o modelo base do figma https://www.figma.com/design/cHOmIJPhHhkFfRSls5SSgr/[buzzcreator]-Etapa-Desafio?node-id=3-69&t=J2Yq9bRIqZkYdULg-1

# Funcionalidades

- Listagem de livros
- Busca por título, autor ou descrição
- Ver os **detalhes de um livro** com descrição, imagem e preço.
- Adicionar livros ao **carrinho**.
- Visualizar o **carrinho** com os itens e o total.
- Simular o **checkout** (envio do pedido).
- Área administrativa que simula cadastro, edição e exclusão de livros

# Tecnologias

- Vite
- TailwindCSS
- Radix UI
- Vaul (Drawer Menu)
- React Hook Form
- Zod
- React Query
- Axios
- Playwright (testes end-to-end)

# Decisões Técnicas

- Uso do Vite: optei pelo uso dessa ferramenta devido ao escopo ser mais simples, com boa parte dos componentes sendo renderizado do lado do cliente
- Uso do TailwindCSS e Radix UI: optei pelo uso dessas ferramentas devido a facilidade em trabalhar com elas, com foco maior no TailwindCSS, além disso com o objetivo de deixar os layouts responsivos e mais próximos ao que foi proposto no Figma
- Uso do React Query: optei pelo seu uso devido a presença de recursos úteis no trabalho com requisições com o servidor, principalmente o seu cacheamento de dados e a presença de estados para indicar os andamento das requisições, sem falar no tratamento de retentativas caso alguma requisição apresente problema
- Sobre o projeto: optei por seguir com uma separação baseada em contextos da aplicação, por exemplo, separação dos componentes que são utilizados somente em páginas e componentes genéricos (com alguns componentes específicos nessa mesma estrutura), além de separar em **models/**, **/api (p/ requisições)**, **constans/ (p/ armazenar mensagens da aplicação)**.
- Sobre o ContextAPI: segui utilizando o ContextAPI devido a criação de pequenos estados para este projeto em específico, podendo ser escalado com ajuda do Redux ou Zustand em estados mais complexos.
- Separação da lógica de negócios da interface, uso de hooks para isso.

# Passos para execução do projeto

1. Clone o repositório:

```bash
  git clone https://github.com/heitorvaldeger/bookstore.git
  &&
  cd bookstore/frontend
```

2. Instale as dependências

```bash
  npm install
  # ou
  yarn install
```

3. Copie o arquivo .env.example

```bash
  cp .env.example .env
```

4. Preencha a variável VITE_API_URL com o endpoint para a API, por exemplo:

```bash
  # http://localhost:8080
```

5. Execute a aplicação

```bash
  npm run dev
  # ou
  yarn dev
```

6. A aplicação será iniciada na porta padrão do Vite: 5173

# Executando os testes

1. Copie o arquivo .env.example

```bash
  cp .env.example .env
```

2. Preencha a variável VITE_API_URL com o endpoint para a API, por exemplo:

```bash
  # http://localhost:8080
```

3. Execute o comando

```bash
  npm run test:e2e
  # ou
  yarn test:e2e
```

4. Caso queira visualizar o relatório de testes (Opcional)

```bash
  npx playwright show-report
```

## Recursos adicionados posteriormente

- Criação de endpoint para ler dados do usuário, esse endpoint ajuda a validar o token do lado do servidor verificando se o usuário está autenticado ou não
- Criação dos botões e modais para edição/criação/remoção de um livro
