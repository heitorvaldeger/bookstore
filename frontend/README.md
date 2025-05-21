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
