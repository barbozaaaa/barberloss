# 📍 PASSO 5 - ONDE ENCONTRAR AS CREDENCIAIS (SUPER DETALHADO)

## 🎯 O QUE VOCÊ ESTÁ PROCURANDO:

Você precisa encontrar a seção **"Seus apps"** ou **"Your apps"** no Firebase.

---

## 🔍 COMO ENCONTRAR (PASSO A PASSO):

### OPÇÃO 1: Pelo ícone de engrenagem

1. **No topo da tela**, ao lado do nome do seu projeto, tem um **ícone de engrenagem ⚙️**
2. Clique nele
3. Clique em **"Configurações do projeto"** ou **"Project settings"**
4. Procure pelas **abas no topo** da página
5. Clique na aba **"Seus apps"** ou **"Your apps"**

### OPÇÃO 2: Pelo menu lateral

1. **No menu lateral esquerdo**, procure por **"Configurações"** ou **"Settings"**
2. Clique em **"Configurações do projeto"** ou **"Project settings"**
3. Procure pelas **abas no topo** da página
4. Clique na aba **"Seus apps"** ou **"Your apps"**

### OPÇÃO 3: Direto pela URL

1. Se você estiver na página do Firestore, **volte para a página inicial** do projeto
2. Procure pelo **ícone de engrenagem ⚙️** em qualquer lugar
3. Ou acesse diretamente: https://console.firebase.google.com/project/SEU_PROJETO/settings/general
   (Substitua SEU_PROJETO pelo nome do seu projeto)

---

## 📱 O QUE VOCÊ VAI VER:

Na aba **"Seus apps"**, você vai ver:

- **Se NÃO tiver apps ainda**: Um botão grande **"Adicionar app"** ou ícone **`</>`** com texto **"Web"**
- **Se já tiver apps**: Uma lista de apps criados

---

## ✅ O QUE FAZER:

### Se NÃO tiver apps:

1. Clique no ícone **`</>`** (código HTML) ou botão **"Web"**
2. Vai abrir uma janela
3. **Nome do app (opcional)**: Digite `Barber Loss Web`
4. **Firebase Hosting**: DESMARQUE (se tiver essa opção)
5. Clique em **"Registrar app"** ou **"Register app"**

### Se JÁ tiver apps:

1. Procure pelo app que você criou (ou crie um novo)
2. Clique nele ou no ícone **`</>`** para criar um novo

---

## 🎯 RESULTADO ESPERADO:

Depois de clicar em "Registrar app", você vai ver um código assim:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

**ESSE É O CÓDIGO QUE VOCÊ PRECISA COPIAR!**

---

## ❓ AINDA NÃO ENCONTROU?

Me diga:
1. Em qual página você está agora? (Firestore, Dashboard, etc.)
2. O que você vê na tela?
3. Consegue ver o nome do seu projeto no topo?

Vou te ajudar a encontrar! 😊


