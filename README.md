# Eat Eating Web-App

## Tecnologias utilizadas:

- <p>NodeJS</p>
- <p>React</p>
- <p>TypeScript</p>
- <p>Zustand</p>

# Proyecto Next.js

Este es un proyecto Next.js generado con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Comenzando

1. Certifique-se de que tem o Node.js e npm instalados em sua maquina, com os comandos:

Node.js 'node -v'
npm 'npm -v'

Caso o Node.js ou npm não estiverem instalados, você pode baixá-los em nodejs.org.

2. Clone este repositório para sua máquina local, utilizando os comandos:

git clone https://github.com/LabsIF/Eat-Eating-WebApp.git

3. Posteriormente crie um arquivo <.env.local> e adicione as variaveis de entorno com tem no arquivo <.env.example>

por examplo:

```
NEXT_PUBLIC_API_URL = https://eat-eating-api-dev-gskf.1.us-1.fl0.io

```

4. No diretório da aplicação, execute o seguinte comando para instalar as dependências: 'npm install'

- Se o admin linux nao permitir pode tentar 'npm install --force'

5. Para executar a aplicação em modo de desenvolvimento, utilize o comando:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev

A aplicação estará disponível em http://localhost:3000.
```

## Executando Testes

Este projeto utiliza o Jest como framework de testes. Para executar os testes, você pode usar o seguinte comando:

```
npm run test
# ou
yarn test
# ou
pnpm test
# ou
bun test

Isso executará os testes e exibirá os resultados no console.
```

# Guia de Rotas da Aplicação

1. Rotas principais:

- `/`: Página inicial.
- `/login`: Página para se logar no sistema.
- `/recuperacao-senha`: Página para se recuperar a senha.

2. Rotas Dinâmicas:

- `/nova-senha?token=ksdjkad`: Página para escrever nova senha.

3. Rotas protegidas:

- `/dashboard`: Página para gerenciamento das informacoes. Precisa estar logado no sistema.
