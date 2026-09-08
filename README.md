# Resolve Aí — Backend

API REST do projeto **Resolve Aí**, desenvolvida com **NestJS**, **TypeScript**, **TypeORM** e **SQLite**.

O backend é responsável pelo cadastro e gerenciamento de usuários, profissionais, categorias e serviços.

## Tecnologias utilizadas

- [NestJS](https://nestjs.com/)
- TypeScript
- TypeORM
- SQLite com `better-sqlite3`
- Jest
- ESLint
- Prettier

## Estrutura do projeto

```text
src/
├── categoria/
│   ├── categoria.ts
│   ├── categoria.controller.ts
│   ├── categoria.service.ts
│   ├── categoria.repository.ts
│   └── categoria.module.ts
│
├── database/
│   └── database.module.ts
│
├── profissional/
│   ├── profissional.ts
│   ├── profissional.controller.ts
│   ├── profissional.service.ts
│   ├── profissional.repository.ts
│   └── profissional.module.ts
│
├── servico/
│   ├── servico.ts
│   ├── servico.controller.ts
│   ├── servico.service.ts
│   ├── servico.repository.ts
│   └── servico.module.ts
│
├── usuario/
│   ├── usuario.ts
│   ├── usuario.controller.ts
│   ├── usuario.service.ts
│   ├── usuario.repository.ts
│   └── usuario.module.ts
│
├── app.controller.ts
├── app.service.ts
├── app.module.ts
└── main.ts
```

A aplicação segue uma separação simples entre **Controller**, **Service**, **Repository** e **Entity**:

- **Controller:** recebe as requisições HTTP.
- **Service:** concentra as regras de negócio e validações.
- **Repository:** realiza as operações no banco de dados.
- **Entity:** define a estrutura das tabelas.

## Banco de dados

O projeto utiliza **SQLite** através do TypeORM.

O banco é criado em:

```text
database/resolve-ai.sqlite
```

A aplicação cria a pasta `database` automaticamente caso ela ainda não exista.

As tabelas utilizadas são:

- `usuarios`
- `profissionais`
- `categorias`
- `servicos`

O projeto está configurado com `synchronize: true`, permitindo que o TypeORM sincronize a estrutura das tabelas durante o desenvolvimento.

## Como executar

### 1. Instalar as dependências

Depois de clonar o projeto, entre na pasta do backend:

```bash
cd pi-backend
```

Instale as dependências:

```bash
npm install
```

### 2. Iniciar em modo de desenvolvimento

```bash
npm run start:dev
```

A API ficará disponível, por padrão, em:

```text
http://localhost:3000
```

Também é possível definir outra porta através da variável `PORT`.

Exemplo:

```bash
PORT=3001 npm run start:dev
```

## Scripts disponíveis

| Comando | Função |
|---|---|
| `npm run start` | Inicia a aplicação |
| `npm run start:dev` | Inicia em modo desenvolvimento |
| `npm run start:debug` | Inicia em modo debug |
| `npm run start:prod` | Executa a versão compilada |
| `npm run build` | Compila o projeto |
| `npm run format` | Formata os arquivos |
| `npm run lint` | Executa o ESLint |
| `npm test` | Executa os testes |
| `npm run test:watch` | Executa os testes em modo watch |
| `npm run test:cov` | Executa os testes com cobertura |
| `npm run test:e2e` | Executa os testes end-to-end |

# Endpoints

## Usuários

Base URL:

```text
/usuarios
```

| Método | Rota | Função |
|---|---|---|
| POST | `/usuarios` | Cadastrar usuário |
| GET | `/usuarios` | Listar usuários |
| GET | `/usuarios/:id` | Buscar usuário por ID |
| PUT | `/usuarios/:id` | Atualizar usuário |
| DELETE | `/usuarios/:id` | Remover usuário |

### Exemplo — POST `/usuarios`

```json
{
  "nome": "Carlos Henrique Oliveira",
  "email": "carlos.oliveira@email.com",
  "cpf": "12345678901",
  "telefone": "62999990001",
  "data_nascimento": "1995-03-15"
}
```

### Regras principais

- Nome, e-mail e CPF são obrigatórios.
- E-mail deve ser único.
- CPF deve ser único.
- Telefone é opcional.
- Data de nascimento é opcional.

---

## Profissionais

Base URL:

```text
/profissionais
```

| Método | Rota | Função |
|---|---|---|
| POST | `/profissionais` | Cadastrar profissional |
| GET | `/profissionais` | Listar profissionais |
| GET | `/profissionais/:id` | Buscar profissional por ID |
| PUT | `/profissionais/:id` | Atualizar profissional |
| DELETE | `/profissionais/:id` | Remover profissional |

### Exemplo — POST `/profissionais`

```json
{
  "nome": "João da Silva",
  "email": "joao.silva@email.com",
  "telefone": "62999990011",
  "cidade": "Ceres",
  "categoriaId": 1
}
```

O cadastro verifica se a categoria informada existe e impede o uso de um e-mail já cadastrado.

---

## Categorias

Base URL:

```text
/categorias
```

| Método | Rota | Função |
|---|---|---|
| POST | `/categorias` | Cadastrar categoria |
| GET | `/categorias` | Listar categorias |
| GET | `/categorias/:id` | Buscar categoria por ID |
| PUT | `/categorias/:id` | Atualizar categoria |
| DELETE | `/categorias/:id` | Remover categoria |

### Exemplo — POST `/categorias`

```json
{
  "nome": "Eletricista",
  "sigla": "ELE",
  "descricao": "Serviços elétricos residenciais"
}
```

Nome e sigla possuem unicidade no banco.

---

## Serviços

Base URL:

```text
/servicos
```

| Método | Rota | Função |
|---|---|---|
| POST | `/servicos` | Cadastrar serviço |
| GET | `/servicos` | Listar serviços |
| GET | `/servicos/:id` | Buscar serviço por ID |
| PATCH | `/servicos/:id` | Atualizar serviço |
| DELETE | `/servicos/:id` | Remover serviço |
| GET | `/servicos/profissional/:profissionalId` | Listar serviços de um profissional |
| GET | `/servicos/categoria/:categoriaId` | Listar serviços de uma categoria |

### Exemplo — POST `/servicos`

```json
{
  "nome": "Instalação elétrica",
  "descricao": "Instalação e manutenção elétrica residencial",
  "categoriaId": 1,
  "profissionalId": 1
}
```

No cadastro e na atualização, o backend verifica se a categoria e o profissional informados existem.

## Fluxo básico

O funcionamento das requisições segue o fluxo:

```text
Cliente
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Repository
   │
   ▼
SQLite
```

Por exemplo, ao cadastrar um serviço:

1. O cliente envia uma requisição `POST /servicos`.
2. O `ServicoController` recebe os dados.
3. O `ServicoService` valida os dados.
4. O Service verifica a existência da categoria e do profissional.
5. O `ServicoRepository` salva os dados.
6. O SQLite armazena o registro.
7. O resultado é retornado pela API.

## Testando a API

A API pode ser testada utilizando ferramentas como:

- Postman
- Insomnia
- Thunder Client
- Frontend da aplicação

Exemplo de requisição:

```http
GET http://localhost:3000/usuarios
```

Ou:

```http
POST http://localhost:3000/categorias
Content-Type: application/json
```

```json
{
  "nome": "Eletricista",
  "sigla": "ELE",
  "descricao": "Serviços elétricos residenciais"
}
```

## Status HTTP utilizados

O backend utiliza exceções do NestJS para informar erros de validação e registros não encontrados.

- `200 OK` — operação realizada com sucesso.
- `201 Created` — registro criado.
- `400 Bad Request` — dados inválidos ou regra de negócio não atendida.
- `404 Not Found` — registro não encontrado.

## Desenvolvimento

Para iniciar o projeto durante o desenvolvimento:

```bash
npm install
npm run start:dev
```

Para gerar a versão compilada:

```bash
npm run build
```

Para executar a versão compilada:

```bash
npm run start:prod
```

---

## Projeto Integrador

**Resolve Aí — Backend**

API desenvolvida para o Projeto Integrador, com o objetivo de fornecer a estrutura de backend para gerenciamento de usuários, profissionais, categorias e serviços.
