[Read in English](./README.md)

# BarberElite
Aplicação web full-stack para agendamentos de barbearia, desenvolvida como projeto de portfólio.

**Demo ao vivo:** https://barberelite.vercel.app

![Dashboard](./public/screenshot.png)

## Stack Tecnológica

| Tecnologia | Uso |
| --- | --- |
| Next.js 15 (App Router) | Frontend e rotas de API |
| React 19 | Renderização da interface e modelo de componentes |
| TypeScript | Tipagem estática em frontend e backend |
| Tailwind CSS | Estilização e layout responsivo |
| MongoDB (driver nativo, sem Mongoose) | Persistência de agendamentos e usuários admin |
| Vercel | Deploy em produção |

## Funcionalidades

- Formulário público de agendamento que salva novos horários no MongoDB.
- Dashboard administrativo com lista de agendamentos, filtros por status e cards de estatísticas.
- Ações administrativas para marcar agendamentos como `completed` ou `cancelled`, e para excluir registros.
- Autenticação com sessão customizada via cookie `httpOnly` (sem biblioteca de autenticação de terceiros).
- Token de sessão criado em `src/lib/adminSession.ts`, definido na rota de login e validado no servidor nas rotas admin de agendamentos.
- Rotas de API administrativas protegidas retornam `401 Unauthorized` quando não há cookie de sessão válido.

## Visão Geral da Arquitetura

- Uso do App Router do Next.js para páginas e endpoints em `src/app`.
- Autenticação por cookie no servidor para endpoints administrativos, sem dependência de token gerenciado no cliente.
- Pool de conexões MongoDB por meio de uma promessa global em `src/lib/mongodb.ts`, reutilizando conexões com eficiência.

## Como Rodar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/Lafaietepedro/barber
cd barber
```
2. Instale as dependências:
```bash
npm install
```
3. Crie o `.env.local`:
```bash
MONGODB_URI=sua_string_de_conexao_mongodb
MONGODB_DB=barber
```
4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
5. Acesse `http://localhost:3000`.

## Estrutura do Projeto

```text
src/
  app/          # Páginas App Router e rotas de API
  components/   # Componentes de UI e administração
  lib/          # Utilitários de MongoDB e sessão de autenticação
  styles/       # Estilos globais e animações
data/           # Dados locais de exemplo
public/         # Arquivos estáticos
```

## Autor

- [LinkedIn](https://www.linkedin.com/in/lafaiete-almeida-dev)
- [GitHub](https://github.com/Lafaietepedro)
