# 🔥 Configuração do Firebase (Opcional)

Para que **TODOS** os agendamentos apareçam no painel do barbeiro, independente de qual cliente fez, você precisa configurar o Firebase.

## Por que Firebase?

Atualmente, os agendamentos são salvos no `localStorage` do navegador. Isso significa:
- ❌ Cada cliente vê apenas seus próprios agendamentos
- ❌ O barbeiro vê apenas os agendamentos salvos no navegador dele
- ❌ Não sincroniza entre dispositivos diferentes

Com Firebase:
- ✅ Todos os agendamentos são salvos na nuvem
- ✅ O barbeiro vê TODOS os agendamentos de TODOS os clientes
- ✅ Funciona em qualquer dispositivo/navegador

## Como configurar:

### 1. Criar projeto no Firebase

1. Acesse: https://console.firebase.google.com
2. Clique em "Adicionar projeto"
3. Dê um nome (ex: "barber-loss")
4. Continue com as configurações padrão

### 2. Criar banco de dados Firestore

1. No painel do Firebase, vá em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha "Modo de teste" (para começar)
4. Escolha uma localização (ex: southamerica-east1 para Brasil)

### 3. Configurar regras de segurança

No Firestore, vá em "Regras" e cole:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /agendamentos/{document=**} {
      // Permitir leitura e escrita para todos (ajuste conforme necessário)
      allow read, write: if true;
    }
  }
}
```

⚠️ **Importante**: Essas regras permitem qualquer pessoa ler/escrever. Para produção, configure autenticação.

### 4. Obter credenciais

1. No Firebase, vá em ⚙️ "Configurações do Projeto"
2. Role até "Seus apps" e clique no ícone `</>`
3. Dê um nome para o app (ex: "Barber Loss Web")
4. Copie as credenciais que aparecem

### 5. Configurar no código

1. Abra o arquivo `src/firebase.ts`
2. Substitua as credenciais:

```typescript
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
}
```

### 6. Instalar dependências

```bash
npm install firebase
```

### 7. Pronto!

Agora todos os agendamentos serão salvos no Firebase e aparecerão no painel do barbeiro, independente de qual cliente fez o agendamento.

---

## Alternativa: Usar apenas localStorage

Se você não quiser configurar Firebase agora, o sistema funciona com localStorage, mas:
- Cada navegador terá seus próprios agendamentos
- O barbeiro só verá agendamentos feitos no navegador dele
- Não sincroniza entre dispositivos

Para usar apenas localStorage, não precisa fazer nada - já está funcionando assim por padrão.

