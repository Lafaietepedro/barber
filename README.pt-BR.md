[Read in English](./README.md)

# BarberElite — Template de Agendamento com Painel Admin

Template Next.js 15 pronto para produção para negócios baseados em serviços. Inclui sistema público de agendamento, painel admin protegido e camada de autenticação customizada — totalmente configurado e pronto para deploy na Vercel em minutos.

**Demo ao vivo:** https://barberelite.vercel.app

![Preview do Dashboard](./public/screenshot.png)

## O que você recebe

- **Formulário público de agendamento** — clientes agendam selecionando serviço, data e horário; dados salvos diretamente no MongoDB
- **Painel administrativo** — visualize, filtre e gerencie todos os agendamentos com controles de status (pendente / concluído / cancelado)
- **Auth customizada** — sessão via cookie httpOnly com tokens assinados por HMAC e validação no servidor; sem biblioteca de autenticação de terceiros
- **Arquitetura config-first** — altere nome do negócio, serviços, preços, horários e contato em um único arquivo de configuração
- **TypeScript em todo o projeto** — tipagem estrita em componentes, rotas de API e utilitários
- **Deploy em um clique** — otimizado para Vercel; basta adicionar as variáveis de ambiente

## Stack

| Tecnologia | Uso |
|---|---|
| Next.js 15 (App Router) | Frontend e rotas de API |
| React 19 | Componentes de UI |
| TypeScript | Tipagem estática |
| Tailwind CSS | Estilização e layout responsivo |
| MongoDB (driver nativo) | Persistência de dados |
| bcryptjs | Hash de senhas |
| Vercel | Deploy |

## Customize em 15 Minutos

Toda a configuração do negócio fica em `src/config/`:

**`site.ts`** — nome, contato, endereço, redes sociais

**`booking.ts`** — serviços, preços e horários disponíveis

**`auth.ts`** — nome do cookie e duração da sessão

Sem necessidade de alterar componentes ou rotas de API.

## Como Começar

### 1. Clone e instale

```bash
git clone https://github.com/Lafaietepedro/barber.git
cd barber
npm install
```

### 2. Configure as variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha os valores:

```bash
cp .env.example .env.local
```
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/
MONGODB_DB=nome-do-banco
ADMIN_SESSION_SECRET=seu-segredo-aqui  # gere com: openssl rand -base64 32

### 3. Crie o usuário admin

```bash
npm run seed:admin
```

### 4. Atualize os arquivos de config

Edite `src/config/site.ts`, `src/config/booking.ts` e `src/config/auth.ts` com os dados do seu negócio.

### 5. Rode localmente

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Estrutura do Projeto
src/
app/           # Páginas App Router e rotas de API
components/    # Componentes de UI e admin
config/        # Configuração do negócio (site, booking, auth)
lib/           # Conexão MongoDB e utilitários de sessão
scripts/
seed-admin.ts  # Script de criação do usuário admin
public/          # Arquivos estáticos
.env.example     # Referência de variáveis de ambiente

## Deploy na Vercel

1. Suba para o GitHub
2. Importe o repositório na [Vercel](https://vercel.com)
3. Adicione as variáveis de ambiente nas configurações do projeto
4. Deploy

## Autor

Desenvolvido por [Lafaiete Almeida](https://linkedin.com/in/lafaiete-almeida-dev) — [GitHub](https://github.com/Lafaietepedro)
