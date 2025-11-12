# App Next - Sistema de Gestão Completo# App Next - Sistema de Categorias com Next.js



Sistema completo de gerenciamento com CRUD de categorias, produtos e pedidos desenvolvido com Next.js 16, React 19, Prisma, Better Auth e ShadcN UI.Sistema completo de gerenciamento de categorias desenvolvido com Next.js 16, React 19, Prisma, Better Auth e ShadcN UI.



## 🚀 Tecnologias Utilizadas## 🚀 Tecnologias Utilizadas



- **Frontend**: Next.js 16.0.1 + React 19 + TypeScript- **Frontend**: Next.js 16.0.1 + React 19 + TypeScript

- **UI Components**: ShadcN UI + Radix UI + Tailwind CSS- **UI Components**: ShadcN UI + Radix UI + Tailwind CSS

- **Database**: SQLite + Prisma ORM- **Database**: SQLite + Prisma ORM

- **Autenticação**: Better Auth- **Autenticação**: Better Auth

- **Validação**: Zod- **Drag & Drop**: @dnd-kit

- **Notificações**: Sonner- **Gráficos**: Recharts

- **Ícones**: Lucide React- **Notificações**: Sonner



## 📋 Funcionalidades## 📋 Pré-requisitos



### 🔐 Autenticação- Node.js (versão 18 ou superior)

- Sistema completo de registro e login- npm ou yarn

- Proteção de rotas com middleware- Git

- Gerenciamento de sessões

- Interface responsiva de autenticação## 🛠️ Instalação e Configuração



### 📂 Gestão de Categorias### 1. Clone o repositório

- ✅ Criar nova categoria

- ✅ Listar todas as categorias```bash

- ✅ Editar categoria existentegit clone https://github.com/MatheusGatto78/app-next.git

- ✅ Excluir categoria (com confirmação)cd app-next

- Interface em cards responsivos```



### 🛍️ Gestão de Produtos### 2. Instale as dependências

- ✅ Criar produto com categoria associada

- ✅ Listar produtos com preço e categoria```bash

- ✅ Editar produto e sua categoria# Usando npm (recomendado - usa o lockfile)

- ✅ Excluir produto (com confirmação)npm ci

- Validação de preços e dados obrigatórios

- Interface em cards com informações detalhadas# Ou usando npm install

npm install

### 📋 Gestão de Pedidos```

- ✅ Criar pedido com dados do cliente

- ✅ Adicionar múltiplos produtos ao pedido### 3. Configure as variáveis de ambiente

- ✅ Calcular total automaticamente

- ✅ Editar pedido e produtos associadosO arquivo `.env` já está configurado com:

- ✅ Excluir pedido completo```env

- Interface em tabela com todas as informaçõesDATABASE_URL="file:./prisma/dev.db"

- Visualização de produtos por pedidoBETTER_AUTH_SECRET=3E9NJYGFiNxupPZ2CTcMSOfsg5raBcGE

BETTER_AUTH_URL=http://localhost:3000

### 🎨 Interface e UX```

- Design responsivo para desktop, tablet e mobile

- Sidebar colapsível com navegação### 4. Gere o cliente Prisma

- Notificações toast para feedback

- Modais para formulários```bash

- Estados de loading e validaçãonpx prisma generate

- Confirmações de exclusão```



## 🛠️ Instalação e Configuração### 5. (Opcional) Aplique as migrações



### 1. Clone o repositório```bash

# Para aplicar migrações existentes

```bashnpx prisma migrate deploy

git clone https://github.com/MatheusGatto78/app-next.git

cd app-next# Ou para desenvolvimento (interativo)

```npx prisma migrate dev

```

### 2. Instale as dependências

### 6. Inicie o servidor de desenvolvimento

```bash

npm ci```bash

```npm run dev

```

### 3. Configure as variáveis de ambiente

O projeto estará disponível em: **http://localhost:3000**

O arquivo `.env` já está configurado para desenvolvimento:

```env## 🧪 Como Testar o Projeto

DATABASE_URL="file:./prisma/dev.db"

BETTER_AUTH_SECRET=3E9NJYGFiNxupPZ2CTcMSOfsg5raBcGE### 1. Acesso Inicial

BETTER_AUTH_URL=http://localhost:3000- Abra o navegador em `http://localhost:3000`

```- Você será redirecionado para a página de login



### 4. Configure o banco de dados### 2. Teste de Autenticação



```bash#### Registro de Usuário

# Gerar cliente Prisma1. Clique em "Criar conta" ou acesse `/registro`

npx prisma generate2. Preencha os campos:

   - Nome completo

# Aplicar migrações (se necessário)   - Email válido

npx prisma migrate deploy   - Senha (mínimo 6 caracteres)

```3. Clique em "Criar conta"

4. Verifique se o usuário foi criado com sucesso

### 5. Inicie o servidor

#### Login

```bash1. Na página de login (`/login`)

npm run dev2. Use as credenciais criadas no registro

```3. Clique em "Entrar"

4. Verifique se foi redirecionado para o dashboard

Acesse: **http://localhost:3000**

### 3. Teste do Dashboard

## 🧪 Guia de Teste Completo

#### Navegação Principal

### 1. Teste de Autenticação- Verifique se o sidebar está funcionando

1. Acesse `http://localhost:3000`- Teste a navegação entre as páginas:

2. Clique em "Criar conta" no formulário de login  - Dashboard (`/dashboard`)

3. Preencha: Nome, Email, Senha  - Categorias (`/painel/categorias`)

4. Clique "Criar conta" → deve redirecionar para dashboard  - Produtos (`/painel/produtos`)

5. Faça logout e login novamente para testar sessão  - Pedidos (`/painel/pedidos`)



### 2. Teste de Categorias#### Menu do Usuário

1. Navegue para "Categorias" no sidebar- Clique no avatar/nome do usuário no header

2. **Criar**: Clique "Nova Categoria" → preencha nome → "Salvar"- Verifique se o dropdown aparece com opções

3. **Editar**: Clique "Editar" em uma categoria → modifique → "Salvar"- Teste a funcionalidade de logout

4. **Excluir**: Clique "Excluir" → confirme no modal

5. Crie pelo menos 3 categorias para testar produtos### 4. Teste Completo do CRUD de Categorias



### 3. Teste de Produtos#### Listagem de Categorias

1. Navegue para "Produtos" no sidebar1. Acesse `/painel/categorias`

2. **Criar**: 2. Verifique se a página carrega sem erros

   - Clique "Novo Produto"3. Observe o layout com cards das categorias

   - Preencha: Nome, Descrição, Preço, Categoria

   - Clique "Salvar"#### Criar Nova Categoria

3. **Editar**: 1. Clique no botão "Nova Categoria" ou "+"

   - Clique "Editar" em um produto2. Preencha o nome da categoria no modal/form

   - Modifique dados e categoria3. Clique em "Salvar" ou "Criar"

   - Salve alterações4. Verifique se:

4. **Excluir**: Clique "Excluir" → confirme   - A categoria aparece na lista

5. Crie vários produtos em diferentes categorias   - Uma notificação de sucesso é exibida

   - O modal fecha automaticamente

### 4. Teste de Pedidos

1. Navegue para "Pedidos" no sidebar#### Editar Categoria

2. **Criar Pedido**:1. Clique no botão "Editar" de uma categoria existente

   - Clique "Novo Pedido"2. Modifique o nome da categoria

   - Preencha dados do cliente: Nome, Endereço, Telefone3. Clique em "Salvar"

   - Adicione produtos:4. Verifique se:

     - Selecione produto no dropdown   - As alterações são refletidas na lista

     - Defina quantidade   - Notificação de sucesso aparece

     - Clique "+" para adicionar

     - Repita para múltiplos produtos#### Excluir Categoria

   - Verifique total calculado automaticamente1. Clique no botão "Excluir" de uma categoria

   - Clique "Salvar"2. Confirme a ação no modal de confirmação

3. **Editar Pedido**:3. Verifique se:

   - Clique "Editar" em um pedido   - A categoria é removida da lista

   - Modifique dados do cliente   - Notificação de sucesso aparece

   - Adicione/remova produtos

   - Salve alterações### 5. Teste da Interface e UX

4. **Excluir Pedido**: Clique "Excluir" → confirme

#### Responsividade

### 5. Validação e Testes de Erro- Teste em diferentes tamanhos de tela:

- **Campos obrigatórios**: Tente salvar sem preencher campos required  - Desktop (1920x1080)

- **Validação de preço**: Teste valores negativos ou inválidos  - Tablet (768x1024)

- **Produtos duplicados**: Tente adicionar o mesmo produto duas vezes  - Mobile (375x667)

- **Pedido sem produtos**: Tente criar pedido sem adicionar produtos- Verifique se o sidebar colapsa em telas menores

- **Validação de dados**: Teste caracteres especiais e limites

#### Interatividade

### 6. Responsividade- Teste hover effects nos botões

- Teste em diferentes resoluções:- Verifique animações de loading

  - Desktop: 1920x1080- Teste keyboard navigation (Tab, Enter, Esc)

  - Tablet: 768x1024 

  - Mobile: 375x667#### Notificações

- Verifique sidebar colapsando em mobile- Verifique se todas as ações mostram feedback visual

- Teste modais em telas pequenas- Teste diferentes tipos de notificação (sucesso, erro, info)

- Verifique tabela de pedidos com scroll horizontal

## 📊 Demonstração de Funcionalidades

## 📊 Estrutura do Banco de Dados

### Screenshots Recomendados

```prisma

model Categorias {1. **Tela de Login**

  id       String    @id @default(uuid())   - Capture a página `/login` com o formulário

  nome     String   - Mostre validação de campos

  produtos Produto[]

}2. **Dashboard Principal**

   - Capture a página `/dashboard` completa

model Produto {   - Mostre o sidebar expandido e colapsado

  id          String            @id @default(uuid())

  nome        String3. **Lista de Categorias**

  descricao   String?   - Capture `/painel/categorias` com várias categorias

  preco       Float   - Mostre os cards organizados

  categoriaId String

  categoria   Categorias        @relation(fields: [categoriaId], references: [id])4. **Modal de Criação**

  pedidos     PedidoProduto[]   - Capture o modal aberto para criar categoria

  createdAt   DateTime          @default(now())   - Mostre o formulário preenchido

  updatedAt   DateTime          @updatedAt

}5. **Modal de Edição**

   - Capture o processo de edição

model Pedido {   - Mostre o formulário com dados preenchidos

  id        String            @id @default(uuid())

  nome      String6. **Confirmação de Exclusão**

  endereco  String   - Capture o modal de confirmação

  telefone  String   - Mostre a mensagem de aviso

  produtos  PedidoProduto[]

  createdAt DateTime          @default(now())7. **Notificações**

  updatedAt DateTime          @updatedAt   - Capture diferentes tipos de toast/notificação

}   - Mostre feedback de sucesso e erro



model PedidoProduto {### Video Walkthrough (Opcional)

  id        String  @id @default(uuid())

  pedidoId  StringGrave um vídeo de 2-3 minutos mostrando:

  produtoId String1. Processo completo de registro e login

  quantidade Int    @default(1)2. Navegação pelo dashboard

  pedido    Pedido  @relation(fields: [pedidoId], references: [id])3. CRUD completo de categorias

  produto   Produto @relation(fields: [produtoId], references: [id])4. Responsividade em diferentes telas

}

```## 🔧 Scripts Disponíveis



## 🎯 Funcionalidades Implementadas```bash

# Desenvolvimento

### ✅ CRUD Categoriasnpm run dev          # Inicia servidor de desenvolvimento

- [x] Criar categoria com validação Zod

- [x] Listar categorias em cards# Produção

- [x] Editar categoria existentenpm run build        # Gera build de produção

- [x] Excluir categoria com confirmaçãonpm start            # Inicia servidor de produção

- [x] Interface responsiva

# Linting

### ✅ CRUD Produtosnpm run lint         # Executa ESLint

- [x] Criar produto vinculado a categoria

- [x] Listar produtos com preço e categoria# Prisma

- [x] Editar produto e trocar categorianpx prisma studio    # Abre interface visual do banco

- [x] Excluir produto com confirmaçãonpx prisma generate  # Gera cliente Prisma

- [x] Validação de preços e campos obrigatóriosnpx prisma migrate dev    # Aplica migrações em dev

- [x] Interface em cards com badge de categorianpx prisma migrate reset  # Reseta banco (cuidado!)

```

### ✅ CRUD Pedidos

- [x] Criar pedido com dados do cliente## 🗃️ Estrutura do Banco de Dados

- [x] Sistema de seleção múltipla de produtos

- [x] Cálculo automático de total do pedido### Tabelas Principais

- [x] Editar pedido e produtos associados

- [x] Excluir pedido completo- **User**: Usuários do sistema

- [x] Tabela ShadCN UI responsiva- **Session**: Sessões de autenticação

- [x] Relacionamento N:N com produtos- **Account**: Contas de autenticação

- **Verification**: Tokens de verificação

### ✅ Validação e Segurança- **Categorias**: Categorias do sistema

- [x] Validação com Zod em todos os formulários

- [x] Server Actions com tratamento de erros### Schema Prisma

- [x] Transações de banco para operações complexas```prisma

- [x] Proteção de rotas com autenticaçãomodel Categorias {

- [x] Sanitização de dados de entrada  id   String @id @default(uuid())

  nome String

### ✅ Interface e UX}

- [x] Design system consistente com ShadcN UI```

- [x] Notificações toast para feedback

- [x] Estados de loading em formulários## 🐛 Solução de Problemas Comuns

- [x] Confirmações para ações destrutivas

- [x] Responsividade completa### Porta 3000 ocupada

- [x] Navegação fluida com sidebar```bash

# Use outra porta

## 🚀 Scripts Disponíveisnpm run dev -- -p 3001

```

```bash

# Desenvolvimento### Erro de dependências

npm run dev          # Servidor de desenvolvimento```bash

npm run build        # Build de produção# Reinstale dependências

npm start            # Servidor de produçãorm -rf node_modules package-lock.json

npm run lint         # ESLintnpm install

```

# Banco de dados

npx prisma studio    # Interface visual do banco### Erro do Prisma

npx prisma generate  # Gerar cliente Prisma```bash

npx prisma migrate dev    # Nova migração# Regenere o cliente

npx prisma migrate deploy # Aplicar migraçõesnpx prisma generate

npx prisma migrate reset  # Reset completo

```# Verifique o arquivo .env

cat .env

## 🎨 Demonstração Visual```



### Capturas de Tela Recomendadas### Aviso do Next.js sobre múltiplos lockfiles

- Normal se houver outros projetos na pasta pai

1. **Dashboard Principal** - Visão geral com sidebar- Não afeta funcionamento

2. **Login/Registro** - Formulários de autenticação- Para silenciar: configure `turbopack.root` em `next.config.ts`

3. **Categorias** - Cards de categorias com ações

4. **Produtos** - Cards mostrando preço e categoria## 📝 Checklist de Testes

5. **Pedidos - Tabela** - Lista completa com produtos

6. **Criar Pedido** - Modal com seleção múltipla### ✅ Funcionalidades Básicas

7. **Responsivo Mobile** - Sidebar colapsada- [ ] Página inicial carrega

8. **Notificações** - Toasts de sucesso/erro- [ ] Registro de usuário funciona

- [ ] Login funciona

### Video Walkthrough Sugerido (3-5 min)- [ ] Logout funciona

- [ ] Redirecionamento de rotas protegidas

1. **Login** (30s) - Registro → Login → Dashboard

2. **Categorias** (1min) - Criar → Editar → Listar### ✅ CRUD de Categorias

3. **Produtos** (1.5min) - Criar com categoria → Mostrar cards → Editar/Excluir- [ ] Listagem de categorias

4. **Pedidos** (2min) - Criar pedido complexo → Mostrar tabela → Editar- [ ] Criar nova categoria

5. **Responsividade** (30s) - Mobile/Desktop- [ ] Editar categoria existente

- [ ] Excluir categoria

## 🔧 Solução de Problemas- [ ] Validação de formulários



### Porta ocupada### ✅ Interface e UX

```bash- [ ] Sidebar funciona (expandir/colapsar)

npm run dev -- -p 3001- [ ] Navegação entre páginas

```- [ ] Responsividade mobile/desktop

- [ ] Notificações aparecem

### Erro de dependências- [ ] Loading states funcionam

```bash

rm -rf node_modules package-lock.json### ✅ Segurança e Dados

npm install- [ ] Rotas protegidas bloqueiam acesso não autorizado

```- [ ] Dados persistem após refresh

- [ ] Sessão mantém usuário logado

### Problemas com Prisma- [ ] Formulários validam dados

```bash

npx prisma generate## 🚀 Deploy

npx prisma migrate reset --force

npx prisma migrate dev### Vercel (Recomendado)

```1. Conecte o repositório no Vercel

2. Configure as variáveis de ambiente

### Query engine bloqueado (Windows)3. Deploy automático a cada push

- Reinicie o terminal

- Use `npx prisma generate` novamente### Outras plataformas

- Railway

## 📄 Licença- Render

- Netlify

MIT License - veja LICENSE para detalhes.

## 📄 Licença

## 👥 Contribuição

Este projeto está sob licença MIT. Veja o arquivo LICENSE para mais detalhes.

1. Fork o projeto

2. Crie uma branch (`git checkout -b feature/NovaFeature`)## 👥 Contribuição

3. Commit (`git commit -m 'Add NovaFeature'`)

4. Push (`git push origin feature/NovaFeature`)1. Fork o projeto

5. Pull Request2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)

3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)

---4. Push para a branch (`git push origin feature/AmazingFeature`)

5. Abra um Pull Request

**🎉 Sistema completo implementado com CRUD de Categorias, Produtos e Pedidos seguindo todas as especificações solicitadas!**
## 📧 Contato

- GitHub: [@MatheusGatto78](https://github.com/MatheusGatto78)
- Projeto: [https://github.com/MatheusGatto78/app-next](https://github.com/MatheusGatto78/app-next)