# 🚀 Como subir o projeto para o GitHub

## ⚠️ IMPORTANTE: Configure o Git primeiro

Antes de fazer o commit, você precisa configurar seu nome e email do Git:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

---

## 📋 PASSO A PASSO:

### 1. Configurar Git (se ainda não fez)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

### 2. Fazer o commit inicial

```bash
git add .
git commit -m "Initial commit: Site de agendamento barbearia com painel do barbeiro"
```

### 3. Criar repositório no GitHub

1. Acesse: https://github.com/new
2. **Repository name**: `barbearia` (ou outro nome)
3. **Description**: "Sistema de agendamento para barbearia com painel do barbeiro"
4. Escolha **Public** ou **Private**
5. **NÃO** marque "Initialize with README" (já temos arquivos)
6. Clique em **"Create repository"**

### 4. Conectar e fazer push

Depois de criar o repositório, o GitHub vai mostrar comandos. Execute:

```bash
git remote add origin https://github.com/SEU_USUARIO/barbearia.git
git branch -M main
git push -u origin main
```

**Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub!**

---

## 🔐 IMPORTANTE: Credenciais do Firebase

⚠️ O arquivo `src/firebase.ts` está no `.gitignore` e **NÃO será enviado** para o GitHub.

Isso é **seguro** - suas credenciais do Firebase não vão para o repositório público.

**Para outros desenvolvedores:**
- Eles precisarão criar seu próprio projeto Firebase
- Ou você pode compartilhar as credenciais de forma segura (não pelo GitHub)

---

## ✅ O QUE SERÁ ENVIADO:

- ✅ Todo o código do site
- ✅ Painel do barbeiro
- ✅ Componentes e estilos
- ✅ Configurações do projeto
- ✅ Guias de configuração (GUIA_FIREBASE.md, etc.)
- ❌ Credenciais do Firebase (protegidas)
- ❌ node_modules (não necessário)

---

## 🎯 DEPLOY NO VERCEL:

Depois de subir para o GitHub, você pode fazer deploy no Vercel:

1. Acesse: https://vercel.com
2. Conecte seu repositório do GitHub
3. O Vercel detecta automaticamente que é um projeto Vite
4. Clique em "Deploy"
5. Pronto! Seu site estará online!

---

**Boa sorte! 🚀**


