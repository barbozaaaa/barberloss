# 💇 Barber Loss - Sistema de Agendamento

Sistema completo de agendamento para barbearia com painel administrativo do barbeiro.

## 🚀 Funcionalidades

- ✅ **Site de Agendamento**: Interface para clientes agendarem serviços
- ✅ **Painel do Barbeiro**: Sistema administrativo para gerenciar agendamentos
- ✅ **Integração Firebase**: Sincronização em tempo real entre dispositivos
- ✅ **Contador de Caixa**: Controle financeiro diário
- ✅ **Design Responsivo**: Interface moderna e adaptável

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Firebase (para sincronização em tempo real)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/barbozaaaa/barberloss.git
cd barberloss
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o Firebase:
   - Copie o arquivo `src/firebase.example.ts` para `src/firebase.ts`
   - Siga as instruções em `CONFIGURAR_FIREBASE_AGORA.md`
   - Cole suas credenciais do Firebase no arquivo `src/firebase.ts`

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🔥 Configuração do Firebase

⚠️ **IMPORTANTE**: O arquivo `src/firebase.ts` não está no repositório por segurança.

Para configurar:

1. Renomeie `src/firebase.example.ts` para `src/firebase.ts`
2. Siga o guia completo em `CONFIGURAR_FIREBASE_AGORA.md`
3. Configure as regras do Firestore usando `REGRAS_FIRESTORE.txt`

## 📱 Como Usar

### Site de Agendamento
- Acesse: `http://localhost:5173`
- Cliente seleciona serviço, data e horário
- Preenche dados pessoais
- Agendamento é salvo no Firebase

### Painel do Barbeiro
- Acesse: `http://localhost:5173#barbeiro`
- Visualiza todos os agendamentos organizados por data
- Marca agendamentos como finalizados
- Controla o caixa diário
- Reseta o caixa quando necessário

## 🛠️ Tecnologias

- **React** + **TypeScript**
- **Vite** - Build tool
- **Styled Components** - Estilização
- **Firebase Firestore** - Banco de dados
- **localStorage** - Fallback quando Firebase não está configurado

## 📁 Estrutura do Projeto

```
barbearia/
├── src/
│   ├── App.tsx              # Site de agendamento
│   ├── Barbeiro.tsx         # Painel do barbeiro
│   ├── firebase.example.ts  # Template de configuração
│   ├── firebase.ts          # Configuração Firebase (não commitado)
│   ├── agendamentosService.ts # Serviço de agendamentos
│   └── main.tsx             # Entry point
├── CONFIGURAR_FIREBASE_AGORA.md
├── REGRAS_FIRESTORE.txt
└── README.md
```

## 🔐 Segurança

- Credenciais do Firebase estão no `.gitignore`
- Use variáveis de ambiente em produção
- Configure regras do Firestore adequadamente

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção

## 🚀 Deploy

O projeto pode ser deployado em:
- **Vercel**: Conecte o repositório GitHub
- **Netlify**: Conecte o repositório GitHub
- **Firebase Hosting**: Use `firebase deploy`

## 📄 Licença

Este projeto é privado.

---

Desenvolvido com ❤️ para Barber Loss
