# Brev.ly API – Backend

Este é o back-end da aplicação **Brev.ly**, responsável por encurtar URLs, rastrear acessos e exportar relatórios em CSV. A API é construída com **Fastify**, **TypeScript** e **Drizzle ORM**, e utiliza o **PostgreSQL** como banco de dados.

---

## 📦 Tecnologias e Ferramentas

- [x] TypeScript
- [x] Fastify
- [x] Drizzle ORM
- [x] PostgreSQL
- [x] Cloudflare R2 (armazenamento dos arquivos CSV)
- [x] Docker

---

## ⚙️ Funcionalidades Implementadas

- [x] Criar link encurtado
  - [x] Validação de formato
  - [x] Verificação de duplicidade
- [x] Deletar link
- [x] Obter URL original por short code
- [x] Incrementar contagem de acessos
- [x] Listar todos os links
- [x] Exportar links em CSV
  - [x] Geração com nome aleatório único
  - [x] Armazenamento em CDN (Cloudflare R2)
  - [x] Acesso via link público

---

## 📂 Estrutura do Projeto

```
server/
├── src/
│   ├── env.ts                # Variáveis de ambiente com validação Zod
│   ├── app.ts                # Configuração principal da aplicação
│   ├── infra/
│   │   ├── db/
│   │   │   ├── schemas/      # Schemas do Drizzle ORM
│   │   │   ├── migrations/   # Migrations geradas
│   │   └── http/
│   │       └── server.ts     # Inicialização do servidor Fastify
│   └── modules/              # Casos de uso e rotas da aplicação
│
├── drizzle.config.ts         # Configuração do Drizzle Kit
├── Dockerfile                # Dockerfile com multistage build
├── docker-compose.yml        # PostgreSQL local
├── .env.example              # Exemplo de variáveis ambiente
└── README.md
```

---

## 🚀 Como rodar localmente

1. Clone o repositório

2. Copie o arquivo `.env.example` para `.env` e preencha com suas credenciais:

   ```bash
   cp .env.example .env
   ```

3. Suba o banco de dados com Docker:

   ```bash
   docker compose up -d
   ```

4. Instale as dependências:

   ```bash
   npm install
   ```

5. Rode as migrations:

   ```bash
   npm run db:migrate
   ```

6. Inicie o servidor em modo dev:

   ```bash
   npm run dev
   ```

---

## 🐳 Build com Docker

Para gerar a imagem da aplicação:

```bash
docker build -t brevly-server .
```

---

## 🧪 Testes

Os testes foram omitidos neste desafio, conforme permitido no enunciado.

---

## 🌍 Variáveis de Ambiente

O arquivo `.env` deve conter:

```env
PORT=3333
NODE_ENV=development

# Banco de dados
DATABASE_URL=postgresql://docker:docker@localhost:5432/brevly

# URL base dos short links (usado para CSV)
SHORT_LINK_DOMAIN=##

# Cloudflare R2
CLOUDFLARE_ACCOUNT_ID=""
CLOUDFLARE_ACCESS_KEY_ID=""
CLOUDFLARE_SECRET_ACCESS_KEY_ID=""
CLOUDFLARE_BUCKET="upload-server"
CLOUDFLARE_PUBLIC_URL="https://pub-xxxx.r2.dev"
```

---

## 🧠 Observações

- O projeto segue boas práticas de organização e tipagem com Zod.
- O redirecionamento dos short links é feito diretamente via rota no back-end (`GET /:shortCode`).
- Toda a persistência e leitura de dados é feita com **Drizzle ORM**.

---

## 📄 Licença

Este projeto é de uso educacional para fins de desafio prático.
