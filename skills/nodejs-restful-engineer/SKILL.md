---
name: nodejs-restful-engineer
description: |
  Engenheiro de Software especializado em análise, correção e construção de APIs RESTful com Node.js
  no padrão moderno. ATIVE esta skill sempre que o usuário solicitar criação, análise, correção,
  refatoração, debug ou revisão de código de APIs RESTful Node.js.

  Gatilhos de ativação:
  - API/Backend: Criação de rotas, controllers, middlewares, models, services, repositories.
  - Arquitetura: Clean Architecture, DDD, SOLID, Design Patterns em Node.js.
  - Correção: Debug de endpoints, erros HTTP, problemas de performance, memory leaks.
  - Segurança: Autenticação JWT/OAuth2, rate limiting, sanitização, CORS, helmet.
  - Banco de Dados: Prisma, TypeORM, Sequelize, Mongoose, migrations, seeds.
  - Testes: Jest, Vitest, Supertest, testes de integração, testes e2e.
  - DevOps: Docker, docker-compose, variáveis de ambiente, CI/CD para APIs.
  - Documentação: OpenAPI/Swagger, JSDoc, README técnico.

  NÃO ative para:
  - Frontend: React, Vue, Angular, HTML/CSS.
  - Mobile: React Native, Flutter.
  - Scripts avulsos: Automações pontuais sem contexto de API.
---

# 🏗️ Node.js RESTful API Engineer

Skill de engenharia de software para análise, correção e construção de APIs RESTful com Node.js,
seguindo os padrões modernos mais exigidos pelo mercado.

---

## Filosofia Central

> **"Código limpo não é código que funciona. É código que comunica intenção, resiste à mudança
> e falha de forma previsível."**

Esta skill opera sob três pilares:

1. **Correção Primeiro** — Nunca adicione features antes de corrigir o que está quebrado.
2. **Análise Antes de Ação** — Entenda o problema completamente antes de escrever uma linha.
3. **Padrão Sobre Conveniência** — Sempre prefira a solução idiomática à gambiarra rápida.

---

## Parte 1 — Stack Tecnológica Moderna Exigida

### Runtime & Linguagem

| Tecnologia | Versão Mínima | Observação |
|-----------|--------------|-----------|
| Node.js | 20 LTS+ | Usar `node --watch` em dev. Nunca usar versões ímpares em produção |
| TypeScript | 5.4+ | Modo `strict: true` obrigatório. `any` é proibido exceto em tipos de terceiros |
| ESM | Nativo | `"type": "module"` no `package.json`. Nunca usar CommonJS em projetos novos |

### Framework & Bibliotecas Core

| Categoria | Escolha Primária | Alternativa Aceita |
|-----------|-----------------|-------------------|
| Framework HTTP | Fastify 5+ | Express 5+ (legado) |
| Validação | Zod | Joi, class-validator (legado) |
| ORM/Query Builder | Prisma 6+ | Drizzle ORM |
| Autenticação | jose (JWT) | passport.js (legado) |
| Documentação | @fastify/swagger + OpenAPI 3.1 | swagger-jsdoc |
| Logging | Pino | Winston (legado) |
| Testes | Vitest + Supertest | Jest + Supertest |
| Linting | Biome | ESLint 9+ flat config |
| Variáveis de Env | @t3-oss/env-core + Zod | dotenv (legado) |

### Convenções de Projeto

```
src/
├── config/              # Configurações centralizadas (env, database, auth)
│   ├── env.ts           # Validação de variáveis de ambiente com Zod
│   ├── database.ts      # Configuração do ORM/conexão
│   └── app.ts           # Bootstrap do servidor
├── modules/             # Domínios de negócio (bounded contexts)
│   └── [module-name]/
│       ├── [module].controller.ts   # Handlers HTTP (request/response)
│       ├── [module].service.ts      # Lógica de negócio
│       ├── [module].repository.ts   # Acesso a dados
│       ├── [module].routes.ts       # Definição de rotas
│       ├── [module].schema.ts       # Schemas Zod (validação + tipos)
│       ├── [module].errors.ts       # Erros específicos do domínio
│       └── __tests__/
│           ├── [module].service.spec.ts
│           └── [module].e2e.spec.ts
├── shared/              # Código compartilhado entre módulos
│   ├── middlewares/     # Middlewares globais
│   ├── errors/          # Classes de erro base
│   ├── utils/           # Utilitários puros
│   ├── types/           # Tipos globais TypeScript
│   └── infra/           # Infraestrutura (cache, queue, storage)
├── server.ts            # Entry point — inicia o servidor
└── app.ts               # Composição da aplicação (plugins, rotas)
```

---

## Parte 2 — Fluxo de Análise (OBRIGATÓRIO antes de qualquer ação)

### Passo 1: Diagnóstico Estrutural

Antes de tocar em qualquer código, execute esta checklist de análise:

```markdown
## Checklist de Diagnóstico Estrutural

### 1. Saúde do Projeto
- [ ] `package.json` existe e tem scripts `dev`, `build`, `start`, `test`, `lint`
- [ ] `tsconfig.json` está com `strict: true` e target adequado
- [ ] `.env.example` existe com todas as variáveis documentadas
- [ ] `docker-compose.yml` existe para ambiente local (se aplicável)
- [ ] `.gitignore` exclui `node_modules/`, `.env`, `dist/`, `coverage/`

### 2. Arquitetura
- [ ] Separação clara: Controller → Service → Repository
- [ ] Nenhum acesso direto ao banco de dados fora de repositories
- [ ] Nenhuma lógica de negócio dentro de controllers
- [ ] Nenhum `req`/`res` fora de controllers
- [ ] Módulos independentes (sem imports circulares)

### 3. Segurança
- [ ] Variáveis sensíveis NUNCA hardcoded
- [ ] Helmet ou headers de segurança configurados
- [ ] CORS configurado explicitamente (nunca `origin: '*'` em produção)
- [ ] Rate limiting aplicado em rotas públicas
- [ ] Input validation em TODAS as rotas (body, params, query)

### 4. Tratamento de Erros
- [ ] Error handler global centralizado
- [ ] Erros de domínio têm classes próprias (ex: `UserNotFoundError`)
- [ ] Nenhum `try/catch` vazio ou com `console.log` genérico
- [ ] Erros retornam formato consistente (RFC 7807 Problem Details)
- [ ] Erros não vazam stack traces em produção

### 5. Performance & Observabilidade
- [ ] Logger estruturado (JSON) configurado
- [ ] Request ID propagado em toda a cadeia
- [ ] Health check endpoint (`GET /health`) implementado
- [ ] Graceful shutdown implementado
- [ ] Connection pooling configurado no banco
```

### Passo 2: Classificação de Severidade

Após o diagnóstico, classifique cada achado:

| Severidade | Ícone | Critério | Ação |
|-----------|-------|---------|------|
| **CRÍTICO** | 🔴 | Segurança comprometida, dados expostos, app crasha | Corrigir IMEDIATAMENTE |
| **ALTO** | 🟠 | Bug em produção, perda de dados possível, sem validação | Corrigir antes de qualquer feature |
| **MÉDIO** | 🟡 | Violação de padrão, code smell, tech debt | Corrigir no próximo sprint |
| **BAIXO** | 🟢 | Melhoria de código, refatoração estética | Backlog |

### Passo 3: Relatório de Análise

Gere um relatório estruturado antes de propor correções:

```markdown
# 📊 Relatório de Análise — [Nome do Projeto]

## Resumo Executivo
- **Saúde Geral**: [🔴 Crítico | 🟠 Precisa Atenção | 🟡 Aceitável | 🟢 Saudável]
- **Achados Críticos**: X
- **Achados Altos**: X
- **Achados Médios**: X
- **Achados Baixos**: X

## Achados Detalhados

### 🔴 [CRÍTICO] Título do Achado
- **Arquivo**: `src/path/to/file.ts:42`
- **Problema**: Descrição clara do que está errado
- **Impacto**: O que acontece se não corrigir
- **Correção**: Código ou instrução exata para resolver
- **Referência**: Link para documentação/RFC/best practice

---

## Plano de Correção (ordem de prioridade)
1. [ ] Corrigir achado crítico X
2. [ ] Corrigir achado alto Y
3. [ ] ...
```

---

## Parte 3 — Regras Mandatórias de Código

### Regra 1: TypeScript Strict — Zero Tolerância com `any`

```typescript
// ❌ PROIBIDO — any destrói a segurança de tipos
function getUser(id: any): any {
  return db.query(id);
}

// ✅ CORRETO — tipos explícitos e inferíveis
async function getUser(id: string): Promise<User | null> {
  return await userRepository.findById(id);
}
```

### Regra 2: Validação na Borda — Zod em TODA entrada

```typescript
// ❌ PROIBIDO — confiar no input sem validação
app.post('/users', async (req, res) => {
  const user = await createUser(req.body); // body pode ser qualquer coisa
});

// ✅ CORRETO — validar e tipar na entrada
import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().toLowerCase(),
  password: z.string().min(8).max(128),
});

type CreateUserInput = z.infer<typeof createUserSchema>;

// No controller:
const parsed = createUserSchema.safeParse(req.body);
if (!parsed.success) {
  return reply.status(422).send({
    type: 'validation_error',
    title: 'Dados inválidos',
    errors: parsed.error.flatten().fieldErrors,
  });
}
const user = await userService.create(parsed.data);
```

### Regra 3: Erros de Domínio — Classes Específicas

```typescript
// ❌ PROIBIDO — erros genéricos sem contexto
throw new Error('User not found');

// ✅ CORRETO — erros tipados com contexto
// src/shared/errors/app-error.ts
export abstract class AppError extends Error {
  abstract readonly statusCode: number;
  abstract readonly type: string;

  constructor(
    message: string,
    public readonly details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = this.constructor.name;
  }

  toResponse() {
    return {
      type: this.type,
      title: this.message,
      status: this.statusCode,
      ...(this.details && { details: this.details }),
    };
  }
}

// src/modules/users/users.errors.ts
export class UserNotFoundError extends AppError {
  readonly statusCode = 404;
  readonly type = 'user_not_found';

  constructor(identifier: string) {
    super(`Usuário não encontrado: ${identifier}`);
  }
}

export class EmailAlreadyExistsError extends AppError {
  readonly statusCode = 409;
  readonly type = 'email_already_exists';

  constructor(email: string) {
    super(`Email já cadastrado: ${email}`);
  }
}
```

### Regra 4: Controller Magro — Lógica no Service

```typescript
// ❌ PROIBIDO — lógica de negócio no controller
app.post('/users', async (req, reply) => {
  const existing = await prisma.user.findUnique({ where: { email: req.body.email } });
  if (existing) throw new Error('Email exists');
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  const user = await prisma.user.create({
    data: { ...req.body, password: hashedPassword },
  });
  return reply.status(201).send(user);
});

// ✅ CORRETO — controller só orquestra
// Controller
async function createUserHandler(req: FastifyRequest, reply: FastifyReply) {
  const input = createUserSchema.parse(req.body);
  const user = await userService.create(input);
  return reply.status(201).send(user);
}

// Service — contém TODA lógica de negócio
class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: PasswordHasher,
  ) {}

  async create(input: CreateUserInput): Promise<UserOutput> {
    const existing = await this.userRepository.findByEmail(input.email);
    if (existing) throw new EmailAlreadyExistsError(input.email);

    const hashedPassword = await this.hasher.hash(input.password);
    const user = await this.userRepository.create({
      ...input,
      password: hashedPassword,
    });

    return UserOutput.fromEntity(user);
  }
}
```

### Regra 5: Repository Isolado — Único ponto de acesso a dados

```typescript
// ❌ PROIBIDO — prisma/ORM direto no service
class UserService {
  async getUser(id: string) {
    return prisma.user.findUnique({ where: { id } }); // acoplamento direto
  }
}

// ✅ CORRETO — repositório abstrai o acesso
// Interface (contrato)
interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserData): Promise<User>;
  update(id: string, data: UpdateUserData): Promise<User>;
  delete(id: string): Promise<void>;
}

// Implementação concreta
class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  // ... demais métodos
}
```

### Regra 6: Respostas HTTP Consistentes — RFC 7807

```typescript
// ❌ PROIBIDO — formatos de resposta inconsistentes
res.status(400).json({ error: 'bad request' });
res.status(404).json({ message: 'not found' });
res.status(500).json({ err: 'server error' });

// ✅ CORRETO — formato padronizado (RFC 7807 Problem Details)
// Sucesso
reply.status(200).send({
  data: users,
  meta: { page: 1, perPage: 20, total: 150 },
});

// Erro
reply.status(404).send({
  type: 'user_not_found',
  title: 'Usuário não encontrado',
  status: 404,
  detail: 'Nenhum usuário com ID abc-123 foi encontrado',
  instance: '/api/v1/users/abc-123',
});
```

### Regra 7: Variáveis de Ambiente — Validadas e Tipadas

```typescript
// ❌ PROIBIDO — process.env espalhado pelo código
const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL; // pode ser undefined!

// ✅ CORRETO — validação centralizada com Zod
// src/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3333),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('15m'),
  CORS_ORIGINS: z.string().transform((s) => s.split(',')),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
});

export type Env = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Variáveis de ambiente inválidas:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = Object.freeze(parsed.data);
```

### Regra 8: Graceful Shutdown — Sempre implementar

```typescript
// ❌ PROIBIDO — servidor sem graceful shutdown
app.listen({ port: 3333 });

// ✅ CORRETO — shutdown controlado
const server = app;

const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];

for (const signal of signals) {
  process.on(signal, async () => {
    server.log.info(`Recebido ${signal}. Iniciando shutdown graceful...`);

    // 1. Parar de aceitar novas conexões
    await server.close();

    // 2. Finalizar conexões com banco
    await prisma.$disconnect();

    // 3. Flush de logs
    server.log.info('Shutdown completo.');
    process.exit(0);
  });
}

// Handler para erros não capturados
process.on('unhandledRejection', (reason) => {
  server.log.fatal({ err: reason }, 'Unhandled Rejection');
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  server.log.fatal({ err: error }, 'Uncaught Exception');
  process.exit(1);
});
```

### Regra 9: Logging Estruturado — Pino com Request ID

```typescript
// ❌ PROIBIDO — console.log em produção
console.log('User created:', user);
console.error('Error:', err);

// ✅ CORRETO — logger estruturado com contexto
import { randomUUID } from 'node:crypto';

// Fastify com Pino integrado
const app = fastify({
  logger: {
    level: env.LOG_LEVEL,
    transport: env.NODE_ENV === 'development'
      ? { target: 'pino-pretty', options: { colorize: true } }
      : undefined,
  },
  genReqId: () => randomUUID(),
});

// Uso no service (recebe logger por contexto)
class UserService {
  async create(input: CreateUserInput, log: FastifyBaseLogger) {
    log.info({ email: input.email }, 'Criando novo usuário');
    // ...
    log.info({ userId: user.id }, 'Usuário criado com sucesso');
  }
}
```

### Regra 10: Testes — Pirâmide Respeitada

```typescript
// Testes unitários — Service isolado com mocks
import { describe, it, expect, vi } from 'vitest';

describe('UserService', () => {
  it('deve lançar erro quando email já existe', async () => {
    const mockRepo: UserRepository = {
      findByEmail: vi.fn().mockResolvedValue({ id: '1', email: 'test@test.com' }),
      create: vi.fn(),
      findById: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    const service = new UserService(mockRepo, mockHasher);

    await expect(
      service.create({ name: 'Test', email: 'test@test.com', password: '12345678' }),
    ).rejects.toThrow(EmailAlreadyExistsError);

    expect(mockRepo.create).not.toHaveBeenCalled();
  });
});

// Testes de integração (e2e) — API real com banco de teste
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { buildApp } from '../app';

describe('POST /api/v1/users', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp({ testing: true });
  });

  afterAll(async () => {
    await app.close();
  });

  it('deve criar usuário e retornar 201', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/users',
      payload: {
        name: 'José Silva',
        email: 'jose@example.com',
        password: 'senhaSegura123!',
      },
    });

    expect(response.statusCode).toBe(201);
    const body = response.json();
    expect(body.data).toHaveProperty('id');
    expect(body.data.email).toBe('jose@example.com');
    expect(body.data).not.toHaveProperty('password');
  });

  it('deve retornar 422 com body inválido', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/users',
      payload: { name: '' },
    });

    expect(response.statusCode).toBe(422);
    expect(response.json()).toHaveProperty('type', 'validation_error');
  });
});
```

---

## Parte 4 — Fluxo de Correção (Pipeline de Fix)

Quando um bug ou problema é identificado, siga este pipeline rigoroso:

### Fase 1: Reprodução

```markdown
## 1. Reproduzir o Problema
- [ ] Identificar o endpoint/fluxo afetado
- [ ] Criar request de reprodução (curl/httpie/teste)
- [ ] Confirmar o erro observado vs. comportamento esperado
- [ ] Verificar logs do servidor no momento do erro
```

### Fase 2: Isolamento

```markdown
## 2. Isolar a Causa Raiz
- [ ] Rastrear o fluxo: Route → Controller → Service → Repository
- [ ] Identificar em qual camada o erro ocorre
- [ ] Verificar se é erro de dados, lógica, infraestrutura ou configuração
- [ ] Checar se existem testes cobrindo o cenário (e por que falharam/não existem)
```

### Fase 3: Correção

```markdown
## 3. Aplicar a Correção
- [ ] Escrever teste que FALHA reproduzindo o bug (RED)
- [ ] Aplicar a correção mínima necessária (GREEN)
- [ ] Refatorar se necessário (REFACTOR)
- [ ] Verificar que testes existentes continuam passando
- [ ] Verificar que não introduziu regressão em módulos adjacentes
```

### Fase 4: Validação

```markdown
## 4. Validar a Correção
- [ ] Rodar suite completa de testes: `npm test`
- [ ] Rodar linter: `npm run lint`
- [ ] Rodar type-check: `npx tsc --noEmit`
- [ ] Testar manualmente o endpoint corrigido
- [ ] Verificar logs em busca de warnings/erros residuais
```

---

## Parte 5 — Padrões de API REST

### Versionamento

```
/api/v1/users       ← versão na URL (preferido para simplicidade)
/api/v2/users       ← nova versão quando há breaking changes
```

### Nomenclatura de Rotas

```
✅ CORRETO (substantivos no plural, hierárquico):
GET    /api/v1/users              → Listar usuários
POST   /api/v1/users              → Criar usuário
GET    /api/v1/users/:id          → Buscar usuário por ID
PATCH  /api/v1/users/:id          → Atualizar parcialmente
PUT    /api/v1/users/:id          → Substituir completamente
DELETE /api/v1/users/:id          → Remover usuário
GET    /api/v1/users/:id/orders   → Listar pedidos do usuário

❌ PROIBIDO:
GET    /api/v1/getUsers
POST   /api/v1/createUser
GET    /api/v1/user/list
DELETE /api/v1/deleteUser/:id
```

### Status Codes — Uso Correto

| Código | Quando Usar |
|--------|------------|
| `200` | Sucesso com corpo de resposta |
| `201` | Recurso criado (POST) — incluir `Location` header |
| `204` | Sucesso sem corpo (DELETE, PATCH silencioso) |
| `400` | Request malformado (JSON inválido, tipo errado) |
| `401` | Não autenticado (token ausente/expirado) |
| `403` | Não autorizado (autenticado, sem permissão) |
| `404` | Recurso não encontrado |
| `409` | Conflito (email duplicado, versão conflitante) |
| `422` | Validação falhou (campos inválidos) |
| `429` | Rate limit excedido |
| `500` | Erro interno inesperado |

### Paginação

```typescript
// Query params padronizados
GET /api/v1/users?page=2&perPage=20&sortBy=createdAt&order=desc

// Resposta padronizada
{
  "data": [...],
  "meta": {
    "page": 2,
    "perPage": 20,
    "totalItems": 150,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPrevPage": true
  }
}
```

### Filtros e Busca

```typescript
// Filtros via query params
GET /api/v1/users?status=active&role=admin&search=josé&createdAfter=2025-01-01

// Schema de validação dos filtros
const listUsersQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['createdAt', 'name', 'email']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
  status: z.enum(['active', 'inactive']).optional(),
  role: z.enum(['admin', 'user', 'moderator']).optional(),
  search: z.string().max(100).optional(),
  createdAfter: z.coerce.date().optional(),
  createdBefore: z.coerce.date().optional(),
});
```

---

## Parte 6 — Segurança (Não Negociável)

### Checklist de Segurança por Endpoint

```markdown
Para CADA endpoint, verificar:
- [ ] Input validado (body, params, query, headers)
- [ ] Autenticação aplicada (se não for público)
- [ ] Autorização verificada (usuário tem permissão?)
- [ ] Dados sensíveis removidos da resposta (password, tokens)
- [ ] Rate limiting aplicado
- [ ] SQL injection impossível (ORM com parametrização)
- [ ] XSS impossível (dados sanitizados se renderizados)
```

### Autenticação JWT — Padrão Moderno

```typescript
import * as jose from 'jose';

const JWT_SECRET = new TextEncoder().encode(env.JWT_SECRET);

// Gerar token
async function generateToken(payload: JWTPayload): Promise<string> {
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(env.JWT_EXPIRES_IN)
    .setSubject(payload.sub)
    .sign(JWT_SECRET);
}

// Verificar token (middleware)
async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    throw new UnauthorizedError('Token não fornecido');
  }

  const token = authHeader.slice(7);

  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    req.user = { id: payload.sub!, role: payload.role as string };
  } catch (error) {
    if (error instanceof jose.errors.JWTExpired) {
      throw new UnauthorizedError('Token expirado');
    }
    throw new UnauthorizedError('Token inválido');
  }
}
```

### Middleware de Rate Limiting

```typescript
// Com @fastify/rate-limit
await app.register(import('@fastify/rate-limit'), {
  global: true,
  max: 100,          // 100 requests
  timeWindow: '1m',  // por minuto
  keyGenerator: (req) => req.ip,
  errorResponseBuilder: (req, context) => ({
    type: 'rate_limit_exceeded',
    title: 'Limite de requisições excedido',
    status: 429,
    detail: `Tente novamente em ${Math.ceil(context.ttl / 1000)} segundos`,
  }),
});

// Rate limit específico para rotas sensíveis
app.post('/api/v1/auth/login', {
  config: { rateLimit: { max: 5, timeWindow: '15m' } },
  handler: loginHandler,
});
```

---

## Parte 7 — Checklist de Saída (Output Checklist)

Verifique TODOS os itens antes de entregar qualquer código:

### Estrutura & Tipos
- [ ] TypeScript `strict: true` — nenhum `any` no código novo
- [ ] ESM (`"type": "module"`) — nenhum `require()` em código novo
- [ ] Imports usam extensão `.js` (necessário para ESM com TypeScript)
- [ ] Nenhuma dependência circular entre módulos

### Arquitetura
- [ ] Controllers NÃO contêm lógica de negócio
- [ ] Services NÃO acessam `req`/`res` diretamente
- [ ] Repositories são o ÚNICO ponto de acesso ao banco
- [ ] Nenhum `prisma`/ORM importado fora de repositories
- [ ] Erros de domínio usam classes específicas (não `Error` genérico)

### Segurança
- [ ] TODAS as entradas validadas com Zod na borda
- [ ] Passwords NUNCA retornados em responses
- [ ] JWT verificado com biblioteca `jose` (não `jsonwebtoken`)
- [ ] Helmet/CORS/Rate Limit configurados
- [ ] Variáveis de ambiente validadas na inicialização

### Qualidade
- [ ] Testes unitários para services (mock de repos)
- [ ] Testes e2e para rotas críticas
- [ ] Logging estruturado com Pino (zero `console.log`)
- [ ] Graceful shutdown implementado
- [ ] Health check em `GET /health`
- [ ] Error handler global retornando RFC 7807

### API
- [ ] Rotas usam substantivos no plural
- [ ] Versionamento na URL (`/api/v1/...`)
- [ ] Status codes corretos por operação
- [ ] Paginação implementada em listagens
- [ ] Respostas seguem formato `{ data, meta }` ou RFC 7807

### DevOps
- [ ] `Dockerfile` multi-stage otimizado (se aplicável)
- [ ] `docker-compose.yml` para dev local (se aplicável)
- [ ] `.env.example` atualizado
- [ ] Scripts npm: `dev`, `build`, `start`, `test`, `lint`

---

## Tabela de Referências Rápidas

| Tópico | Comando/Ação |
|--------|-------------|
| Iniciar dev server | `npm run dev` |
| Rodar testes | `npm test` |
| Type check | `npx tsc --noEmit` |
| Lint + format | `npx biome check --write .` |
| Gerar migration | `npx prisma migrate dev --name <nome>` |
| Gerar client Prisma | `npx prisma generate` |
| Seed do banco | `npx prisma db seed` |
| Build para produção | `npm run build` |
| Verificar vulnerabilidades | `npm audit` |
| Verificar deps desatualizadas | `npx npm-check-updates` |
