# 🚀 Como Subir o Projeto para o GitHub

## ✅ Passo 1: Criar o Repositório no GitHub

1. Acesse: https://github.com/new
2. Preencha:
   - **Repository name**: `barbearia` (ou o nome que você quiser)
   - **Description**: "Sistema de agendamento para barbearia com painel do barbeiro"
   - **Visibilidade**: Escolha **Public** ou **Private** (recomendo Private se tiver dados sensíveis)
   - **NÃO marque** "Add a README file" (já temos um)
   - **NÃO marque** "Add .gitignore" (já temos um)
   - **NÃO marque** "Choose a license"
3. Clique em **"Create repository"**

## ✅ Passo 2: Conectar e Fazer Push

Depois de criar o repositório, o GitHub vai mostrar uma página com instruções. 

**Copie a URL do seu repositório** (algo como: `https://github.com/barbozaaaa/barbearia.git`)

Depois, execute estes comandos no terminal (substitua `SUA_URL_AQUI` pela URL que você copiou):

```bash
git remote add origin SUA_URL_AQUI
git branch -M main
git push -u origin main
```

## 📝 Exemplo Completo

Se sua URL for `https://github.com/barbozaaaa/barbearia.git`, os comandos seriam:

```bash
git remote add origin https://github.com/barbozaaaa/barbearia.git
git branch -M main
git push -u origin main
```

## ⚠️ Importante

- O arquivo `src/firebase.ts` está no `.gitignore` e **NÃO será enviado** para o GitHub (isso é bom, pois contém suas credenciais)
- Todos os outros arquivos do projeto serão enviados, incluindo:
  - ✅ Site de agendamento (`App.tsx`)
  - ✅ Painel do barbeiro (`Barbeiro.tsx`)
  - ✅ Serviços e configurações
  - ✅ Documentação do Firebase

## 🔐 Depois de Subir

Depois que o projeto estiver no GitHub, você pode:
1. Fazer deploy no Vercel/Netlify conectando ao repositório
2. Compartilhar o código com outros desenvolvedores
3. Manter um backup do seu projeto

---

**Dica**: Se você quiser, posso executar os comandos para você! Só me passe a URL do repositório que você criou no GitHub.






