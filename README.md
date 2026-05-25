# 💈 Barbearia RESTful API

Uma API moderna, escalável e segura desenvolvida em **Node.js** para gestão completa de barbearias. A arquitetura segue os melhores padrões da indústria, separando as camadas de roteamento, regras de negócio e persistência de dados.

---

## 🛠️ Stack Tecnológica
- **Runtime:** Node.js (v20+ recomendado)
- **Linguagem:** TypeScript
- **Framework:** Express 5 (com tratamento nativo de `async/await`)
- **Dev Tooling:** Nodemon + Sucrase (Hot-reload ultra rápido)
- **Build Tooling:** Babel
- **ORM:** Prisma (v6.19.3) conectando ao MySQL
- **Autenticação:** JWT (via biblioteca `jose`)
- **Validação:** Zod (Parse strict com inferência de tipos)
- **Criptografia:** bcryptjs

---

## ⚙️ Arquitetura
A API segue o fluxo rígido de camadas **Controller → Service → Repository**:

- **Controller**: Intercepta a requisição, extrai os dados, faz o parsing (`Zod`), chama o serviço e devolve as repostas HTTP.
- **Service**: Concentra a **regra de negócio** (ex: evitar agendamentos no passado, travar criação de dois caixas abertos, aplicar limites de estoque).
- **Repository**: Única camada com permissão de interagir diretamente com o Prisma (operações de banco de dados e Transactions).

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (v20+) instalado.
- Banco de dados MySQL (v8.4+) em execução.

### 1. Instalação e Configuração
Clone o repositório e instale as dependências:
```bash
npm install
```

Crie o arquivo `.env` na raiz do projeto com as credenciais (veja as chaves exigidas no `src/config/env.ts`):
```env
PORT=3333
DATABASE_URL="mysql://usuario:senha@localhost:3306/barbearia_db"
JWT_SECRET="sua_chave_secreta_super_segura"
JWT_EXPIRES_IN="1d"
```

### 2. Sincronizar Banco de Dados (Prisma)
Atualize os schemas e gere o cliente de tipagem:
```bash
npx prisma db pull
npx prisma generate
```

### 3. Ambiente de Desenvolvimento (Dev)
Inicia o servidor utilizando Nodemon e Sucrase. As alterações nos arquivos `.ts` aplicam "hot-reload" imediato ignorando checagens lentas de tipo.
```bash
npm run dev
```

### 4. Build de Produção
O comando de build compilará todo o TypeScript limpo (sem interfaces e comentários) para a pasta `/dist` através do Babel. O servidor subirá focado em ultra-performance.
```bash
npm run build
npm start
```

---

## 📖 Endpoints da API (Overview)

A URL base da aplicação rodando localmente é: `http://localhost:3333/api/v1`

### 🔒 Autenticação (Acesso Público)
- `POST /clientes`: Cria uma nova conta de cliente.
- `POST /sessions`: Autentica o cliente (e-mail e senha plana) e retorna o Token JWT.

### 👤 Clientes (Exige Token JWT)
- `GET /clientes/me`: Visualiza o próprio perfil.

### 📅 Agendamentos (Exige Token JWT)
- `POST /agendamentos`:
  - **Body esperado:** `barbeiro_id`, `servicos_ids` (array), `data_hora_inicio`, `observacoes`.
  - **Regras:** Bloqueia conflitos de horário (overbooking), calcula duração do serviço automaticamente e impede datas no passado.

### 💰 Caixa e Transações (Exige Token JWT)
- `POST /caixa/abrir`: Abre um caixa com um fundo inicial (`valor_abertura`). Bloqueia caso outro já esteja aberto.
- `GET /caixa/status`: Verifica qual o caixa ativo.
- `POST /caixa/:id/fechar`: Encerra o caixa.
- `POST /transacoes/pagamento`:
  - Efetua o pagamento do agendamento (via transaction do banco de dados).
  - Distribui e registra a **Comissão do Barbeiro** atomicamente.

### 📦 Estoque e Produtos (Exige Token JWT)
- `POST /produtos`: Cadastra um item e estabelece o `estoque_minimo`.
- `GET /produtos`: Lista todos os itens ativos.
- `GET /produtos/alertas`: Lista os itens cujo saldo está abaixo da linha mínima recomendada.
- `POST /produtos/:id/movimentacoes`: 
  - Registra a movimentação (`entrada`, `saida`, `ajuste`).
  - Atualiza o estoque em cascata.
  - Bloqueia saídas que causariam estoque negativo.

---

> Desenvolvido com Antigravity / Google 🌌
