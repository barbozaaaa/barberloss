# 📅 Guia de Configuração do Google Calendar

Este guia explica como configurar a integração com o Google Calendar para que os agendamentos sejam automaticamente adicionados ao seu calendário.

## 🎯 O que esta integração faz?

Quando um cliente faz um agendamento:
- ✅ Um evento é criado automaticamente no seu Google Calendar
- ✅ O evento inclui nome do cliente, telefone, serviço e preço
- ✅ Você recebe lembretes 30 minutos antes do agendamento
- ✅ Você recebe um email 1 dia antes do agendamento

## 📋 Pré-requisitos

- Conta Google (Gmail)
- Acesso ao Google Cloud Console

## 🚀 Passo a Passo

### 1. Criar um Projeto no Google Cloud Console

1. Acesse: https://console.cloud.google.com/
2. Clique em **"Selecionar projeto"** no topo
3. Clique em **"Novo projeto"**
4. Dê um nome ao projeto (ex: "Barber Loss Calendar")
5. Clique em **"Criar"**

### 2. Habilitar a API do Google Calendar

1. No menu lateral, vá em **"APIs e Serviços"** > **"Biblioteca"**
2. Procure por **"Google Calendar API"**
3. Clique em **"Google Calendar API"**
4. Clique em **"Habilitar"**

### 3. Criar Credenciais OAuth 2.0

1. Vá em **"APIs e Serviços"** > **"Credenciais"**
2. Clique em **"Criar credenciais"** > **"ID do cliente OAuth"**
3. Se solicitado, configure a tela de consentimento:
   - Tipo de usuário: **"Externo"**
   - Nome do app: **"Barber Loss"**
   - Email de suporte: seu email
   - Clique em **"Salvar e continuar"**
   - Adicione seu email como usuário de teste
   - Clique em **"Salvar e continuar"**
   - Clique em **"Voltar ao painel"**
4. Tipo de aplicativo: **"Aplicativo da Web"**
5. Nome: **"Barber Loss Calendar"**
6. **URIs de redirecionamento autorizados**: Adicione:
   - `http://localhost:5173` (para desenvolvimento)
   - `https://seu-dominio.vercel.app` (para produção - substitua pelo seu domínio)
7. Clique em **"Criar"**
8. **IMPORTANTE**: Copie o **"ID do cliente"** e o **"Segredo do cliente"** - você vai precisar deles!

### 4. Obter Token de Acesso

Existem duas formas de obter o token:

#### Opção A: Usando o Google OAuth Playground (Mais Fácil) ⭐ RECOMENDADO

1. Acesse: https://developers.google.com/oauthplayground/
2. No canto superior direito, clique no ícone de engrenagem ⚙️
3. Marque **"Use your own OAuth credentials"**
4. Cole seu **Client ID** e **Client Secret**
5. No campo **"Select & authorize APIs"**, procure e selecione:
   - `https://www.googleapis.com/auth/calendar.events`
   - `https://www.googleapis.com/auth/calendar.readonly`
6. Clique em **"Authorize APIs"**
7. Faça login com sua conta Google
8. Clique em **"Allow"** para dar permissão
9. Clique em **"Exchange authorization code for tokens"**
10. Copie o **"Access token"** (é um token longo)
11. ⚠️ **IMPORTANTE**: Este token expira em 1 hora. Para um token permanente, veja a Opção B.

#### Opção B: Usando OAuth 2.0 Flow Completo (Token Permanente)

Para um token que não expira, você precisa:

1. Criar uma página de autorização que redireciona para o Google
2. Capturar o código de autorização
3. Trocar o código por um token de acesso e refresh token

**Implementação simplificada:**

Você pode usar este código em uma página HTML separada:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Autorizar Google Calendar</title>
</head>
<body>
  <h1>Autorizar Google Calendar</h1>
  <button onclick="autorizar()">Autorizar</button>
  <div id="resultado"></div>

  <script>
    const CLIENT_ID = 'SEU_CLIENT_ID_AQUI'
    const REDIRECT_URI = window.location.origin + window.location.pathname
    
    function autorizar() {
      const scopes = 'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly'
      const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(scopes)}&access_type=offline&prompt=consent`
      window.location.href = url
    }
    
    // Capturar código da URL
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    
    if (code) {
      document.getElementById('resultado').innerHTML = `
        <p>Código obtido! Agora você precisa trocar por um token.</p>
        <p>Código: ${code}</p>
        <p>⚠️ Para trocar por token, você precisa fazer uma requisição POST para:</p>
        <code>https://oauth2.googleapis.com/token</code>
        <p>Com os parâmetros: code, client_id, client_secret, redirect_uri, grant_type=authorization_code</p>
      `
    }
  </script>
</body>
</html>
```

### 5. Configurar no Painel do Barbeiro

1. Acesse o painel do barbeiro: `http://localhost:5173/#barbeiro` (ou seu domínio)
2. Na seção **"📅 Google Calendar"**, cole o **Access Token** no campo
3. Deixe o **ID do Calendário** como `primary` (ou coloque o ID de um calendário específico)
4. Clique em **"Salvar"**

### 6. Testar

1. Faça um agendamento de teste no site principal
2. Verifique se o evento apareceu no seu Google Calendar
3. Se aparecer, está funcionando! ✅

## 🔄 Renovação de Token

Os tokens OAuth 2.0 expiram após algum tempo. Quando isso acontecer:

1. Você verá um erro ao criar eventos
2. O token será removido automaticamente
3. Você precisará gerar um novo token seguindo os passos acima

**Para evitar isso**, use um **Refresh Token** (veja Opção B acima) que permite renovar o token automaticamente.

## 🛠️ Solução de Problemas

### Erro: "Token de acesso expirado"
- **Solução**: Gere um novo token seguindo o Passo 4

### Erro: "Insufficient permissions"
- **Solução**: Verifique se você habilitou as APIs corretas no Passo 2

### Erro: "Invalid redirect URI"
- **Solução**: Verifique se você adicionou a URI correta no Passo 3 (deve ser exatamente igual, incluindo http/https)

### Eventos não aparecem no calendário
- Verifique se o token está correto
- Verifique se o ID do calendário está correto (use `primary` para o calendário principal)
- Abra o console do navegador (F12) e veja se há erros

## 📝 Notas Importantes

- ⚠️ **Nunca compartilhe seu Client Secret publicamente**
- ⚠️ **Tokens de acesso são sensíveis - não compartilhe**
- ✅ Para produção, considere usar um backend para gerenciar tokens de forma segura
- ✅ O token atual é armazenado no localStorage do navegador

## 🎉 Pronto!

Agora todos os agendamentos serão automaticamente adicionados ao seu Google Calendar! 🎊


