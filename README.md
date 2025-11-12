# App Next - Sistema de Categorias com Next.js

Sistema completo de gerenciamento de categorias desenvolvido com Next.js 16, React 19, Prisma, Better Auth e ShadcN UI.

## 🚀 Tecnologias Utilizadas

- **Frontend**: Next.js 16.0.1 + React 19 + TypeScript
- **UI Components**: ShadcN UI + Radix UI + Tailwind CSS
- **Database**: SQLite + Prisma ORM
- **Autenticação**: Better Auth
- **Drag & Drop**: @dnd-kit
- **Gráficos**: Recharts
- **Notificações**: Sonner

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Git

## 🛠️ Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/MatheusGatto78/app-next.git
cd app-next
```

### 2. Instale as dependências

```bash
# Usando npm (recomendado - usa o lockfile)
npm ci

# Ou usando npm install
npm install
```

### 3. Configure as variáveis de ambiente

O arquivo `.env` já está configurado com:
```env
DATABASE_URL="file:./prisma/dev.db"
BETTER_AUTH_SECRET=3E9NJYGFiNxupPZ2CTcMSOfsg5raBcGE
BETTER_AUTH_URL=http://localhost:3000
```

### 4. Gere o cliente Prisma

```bash
npx prisma generate
```

### 5. (Opcional) Aplique as migrações

```bash
# Para aplicar migrações existentes
npx prisma migrate deploy

# Ou para desenvolvimento (interativo)
npx prisma migrate dev
```

### 6. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em: **http://localhost:3000**

## 🧪 Como Testar o Projeto

### 1. Acesso Inicial
- Abra o navegador em `http://localhost:3000`
- Você será redirecionado para a página de login

### 2. Teste de Autenticação

#### Registro de Usuário
1. Clique em "Criar conta" ou acesse `/registro`
2. Preencha os campos:
   - Nome completo
   - Email válido
   - Senha (mínimo 6 caracteres)
3. Clique em "Criar conta"
4. Verifique se o usuário foi criado com sucesso

#### Login
1. Na página de login (`/login`)
2. Use as credenciais criadas no registro
3. Clique em "Entrar"
4. Verifique se foi redirecionado para o dashboard

### 3. Teste do Dashboard

#### Navegação Principal
- Verifique se o sidebar está funcionando
- Teste a navegação entre as páginas:
  - Dashboard (`/dashboard`)
  - Categorias (`/painel/categorias`)
  - Produtos (`/painel/produtos`)
  - Pedidos (`/painel/pedidos`)

#### Menu do Usuário
- Clique no avatar/nome do usuário no header
- Verifique se o dropdown aparece com opções
- Teste a funcionalidade de logout

### 4. Teste Completo do CRUD de Categorias

#### Listagem de Categorias
1. Acesse `/painel/categorias`
2. Verifique se a página carrega sem erros
3. Observe o layout com cards das categorias

#### Criar Nova Categoria
1. Clique no botão "Nova Categoria" ou "+"
2. Preencha o nome da categoria no modal/form
3. Clique em "Salvar" ou "Criar"
4. Verifique se:
   - A categoria aparece na lista
   - Uma notificação de sucesso é exibida
   - O modal fecha automaticamente

#### Editar Categoria
1. Clique no botão "Editar" de uma categoria existente
2. Modifique o nome da categoria
3. Clique em "Salvar"
4. Verifique se:
   - As alterações são refletidas na lista
   - Notificação de sucesso aparece

#### Excluir Categoria
1. Clique no botão "Excluir" de uma categoria
2. Confirme a ação no modal de confirmação
3. Verifique se:
   - A categoria é removida da lista
   - Notificação de sucesso aparece

### 5. Teste da Interface e UX

#### Responsividade
- Teste em diferentes tamanhos de tela:
  - Desktop (1920x1080)
  - Tablet (768x1024)
  - Mobile (375x667)
- Verifique se o sidebar colapsa em telas menores

#### Interatividade
- Teste hover effects nos botões
- Verifique animações de loading
- Teste keyboard navigation (Tab, Enter, Esc)

#### Notificações
- Verifique se todas as ações mostram feedback visual
- Teste diferentes tipos de notificação (sucesso, erro, info)

## 📊 Demonstração de Funcionalidades

### Screenshots Recomendados

1. **Tela de Login**
   - Capture a página `/login` com o formulário
   - Mostre validação de campos

2. **Dashboard Principal**
   - Capture a página `/dashboard` completa
   - Mostre o sidebar expandido e colapsado

3. **Lista de Categorias**
   - Capture `/painel/categorias` com várias categorias
   - Mostre os cards organizados

4. **Modal de Criação**
   - Capture o modal aberto para criar categoria
   - Mostre o formulário preenchido

5. **Modal de Edição**
   - Capture o processo de edição
   - Mostre o formulário com dados preenchidos

6. **Confirmação de Exclusão**
   - Capture o modal de confirmação
   - Mostre a mensagem de aviso

7. **Notificações**
   - Capture diferentes tipos de toast/notificação
   - Mostre feedback de sucesso e erro

### Video Walkthrough (Opcional)

Grave um vídeo de 2-3 minutos mostrando:
1. Processo completo de registro e login
2. Navegação pelo dashboard
3. CRUD completo de categorias
4. Responsividade em diferentes telas

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Produção
npm run build        # Gera build de produção
npm start            # Inicia servidor de produção

# Linting
npm run lint         # Executa ESLint

# Prisma
npx prisma studio    # Abre interface visual do banco
npx prisma generate  # Gera cliente Prisma
npx prisma migrate dev    # Aplica migrações em dev
npx prisma migrate reset  # Reseta banco (cuidado!)
```

## 🗃️ Estrutura do Banco de Dados

### Tabelas Principais

- **User**: Usuários do sistema
- **Session**: Sessões de autenticação
- **Account**: Contas de autenticação
- **Verification**: Tokens de verificação
- **Categorias**: Categorias do sistema

### Schema Prisma
```prisma
model Categorias {
  id   String @id @default(uuid())
  nome String
}
```

## 🐛 Solução de Problemas Comuns

### Porta 3000 ocupada
```bash
# Use outra porta
npm run dev -- -p 3001
```

### Erro de dependências
```bash
# Reinstale dependências
rm -rf node_modules package-lock.json
npm install
```

### Erro do Prisma
```bash
# Regenere o cliente
npx prisma generate

# Verifique o arquivo .env
cat .env
```

### Aviso do Next.js sobre múltiplos lockfiles
- Normal se houver outros projetos na pasta pai
- Não afeta funcionamento
- Para silenciar: configure `turbopack.root` em `next.config.ts`

## 📝 Checklist de Testes

### ✅ Funcionalidades Básicas
- [ ] Página inicial carrega
- [ ] Registro de usuário funciona
- [ ] Login funciona
- [ ] Logout funciona
- [ ] Redirecionamento de rotas protegidas

### ✅ CRUD de Categorias
- [ ] Listagem de categorias
- [ ] Criar nova categoria
- [ ] Editar categoria existente
- [ ] Excluir categoria
- [ ] Validação de formulários

### ✅ Interface e UX
- [ ] Sidebar funciona (expandir/colapsar)
- [ ] Navegação entre páginas
- [ ] Responsividade mobile/desktop
- [ ] Notificações aparecem
- [ ] Loading states funcionam

### ✅ Segurança e Dados
- [ ] Rotas protegidas bloqueiam acesso não autorizado
- [ ] Dados persistem após refresh
- [ ] Sessão mantém usuário logado
- [ ] Formulários validam dados

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte o repositório no Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras plataformas
- Railway
- Render
- Netlify

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👥 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📧 Contato

- GitHub: [@MatheusGatto78](https://github.com/MatheusGatto78)
- Projeto: [https://github.com/MatheusGatto78/app-next](https://github.com/MatheusGatto78/app-next)