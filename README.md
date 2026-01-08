# 💈 Barber Loss - Sistema de Agendamento Online

Sistema completo de agendamento online para barbearia, desenvolvido com React, TypeScript e Firebase. Permite que clientes agendem serviços através de uma interface moderna e responsiva, enquanto barbeiros gerenciam agendamentos e controle de caixa através de um painel administrativo.

## ✨ Funcionalidades

### 👤 Para Clientes
- **Agendamento Online**: Sistema intuitivo para agendar serviços
- **Seleção de Serviços**: Visualização de todos os serviços disponíveis com preços e descrições
- **Calendário Interativo**: Navegação por datas com carrossel responsivo (4 datas por vez)
- **Seleção de Horários**: Horários disponíveis organizados em grid
- **Promoções Visuais**: Destaque para serviços em promoção com preço original riscado
- **Banner Carrossel**: Carrossel automático de imagens promocionais
- **Integração WhatsApp**: Redirecionamento automático para WhatsApp após agendamento
- **Design Responsivo**: Interface otimizada para mobile, tablet e desktop

### 💼 Para Barbeiros
- **Painel Administrativo**: Acesso via `/barbeiro` para gerenciar agendamentos
- **Visualização de Agendamentos**: Lista completa de todos os agendamentos
- **Controle de Status**: Marcar agendamentos como finalizados
- **Cancelamento**: Cancelar agendamentos quando necessário
- **Controle de Caixa**: Visualização de valores recebidos e pendentes
- **Filtros**: Filtrar por status (todos, pendentes, finalizados)
- **Sincronização em Tempo Real**: Dados sincronizados com Firebase

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Tipagem estática para maior segurança no código
- **Vite** - Build tool moderna e rápida
- **Styled Components** - Estilização CSS-in-JS
- **Firebase** - Backend como serviço (Firestore para banco de dados)
- **LocalStorage** - Fallback para persistência local quando Firebase não está disponível

## 📦 Serviços Disponíveis

| Serviço | Preço | Tag |
|---------|-------|-----|
| Corte | R$ 50 | Clássico |
| Barba | R$ 30 | Navalha quente |
| Corte e barba | ~~R$ 70~~ **R$ 50** | Combo completo |
| Corte com luzes (platinado) | R$ 100 | Destaque |
| Platinado | R$ 120 | Transformação |
| Pigmentação e Corte | R$ 70 | Cor + corte |
| Progressiva e Corte | ~~R$ 100~~ **R$ 90** | Corte |
| Progressiva | R$ 70 | Apenas progressiva |

## 🚀 Como Instalar e Executar

### Pré-requisitos
- Node.js 18.x ou superior
- npm ou yarn
- Conta Firebase (opcional, mas recomendado)

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/barbozaaaa/barberloss.git
cd barbearia
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o Firebase** (opcional)
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com)
   - Copie as credenciais do Firebase
   - Renomeie `src/firebase.example.ts` para `src/firebase.ts`
   - Cole suas credenciais no arquivo

4. **Execute o projeto em desenvolvimento**
```bash
npm run dev
```

5. **Acesse no navegador**
   - Cliente: `http://localhost:5173`
   - Painel Barbeiro: `http://localhost:5173/barbeiro`

## 📁 Estrutura do Projeto

```
barbearia/
├── src/
│   ├── App.tsx              # Componente principal (agendamento cliente)
│   ├── Barbeiro.tsx         # Painel administrativo do barbeiro
│   ├── agendamentosService.ts  # Serviço de gerenciamento de agendamentos
│   ├── firebase.ts          # Configuração do Firebase
│   ├── firebase.example.ts  # Exemplo de configuração Firebase
│   ├── main.tsx             # Ponto de entrada da aplicação
│   └── assets/              # Imagens e recursos estáticos
├── public/                  # Arquivos públicos
├── dist/                    # Build de produção
├── vercel.json              # Configuração do Vercel
└── package.json             # Dependências do projeto
```

## 🔥 Configuração do Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Crie um novo projeto
3. Ative o Firestore Database
4. Configure as regras de segurança (veja `REGRAS_FIRESTORE.txt`)
5. Copie as credenciais do projeto
6. Cole em `src/firebase.ts`

### Estrutura do Firestore

**Coleção: `agendamentos`**
```typescript
{
  id: string
  nome: string
  telefone: string
  data: string (ISO: YYYY-MM-DD)
  horario: string
  servico: string
  preco: string
  precoOriginal?: string
  emPromocao?: boolean
  finalizado: boolean
  criadoEm: timestamp
}
```

## 🎨 Características de Design

- **Tema Escuro**: Interface moderna com tema dark
- **Gradientes**: Efeitos visuais com gradientes suaves
- **Animações**: Transições suaves e feedback visual
- **Responsividade**: Layout adaptável para todos os dispositivos
- **Acessibilidade**: Componentes semânticos e navegação por teclado

## 📱 Responsividade

- **Mobile**: ≤ 480px - Layout otimizado para telas pequenas
- **Tablet**: 481px - 768px - Layout intermediário
- **Desktop**: ≥ 769px - Layout completo com mais espaçamento

## 🚢 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório GitHub ao Vercel
2. Configure:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Adicione variáveis de ambiente (se necessário)
4. Deploy automático a cada push na branch `main`

### Build de Produção

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`

## 🔐 Painel do Barbeiro

Acesse o painel administrativo em: `/barbeiro`

**Funcionalidades:**
- Visualizar todos os agendamentos
- Filtrar por status (todos, pendentes, finalizados)
- Marcar agendamentos como finalizados
- Cancelar agendamentos
- Ver controle de caixa (valores recebidos e pendentes)

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter

## 🎯 Funcionalidades Especiais

- **Bloqueio de Datas**: Sistema permite bloquear datas específicas (ex: feriados)
- **Carrossel de Datas**: Navegação por grupos de 4 datas por vez
- **Banner Promocional**: Carrossel automático de imagens promocionais
- **Promoções**: Sistema visual para destacar serviços em promoção
- **Fallback LocalStorage**: Funciona mesmo sem Firebase configurado

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e de uso exclusivo.

## 👨‍💻 Desenvolvido por

Sistema desenvolvido para **Barber Loss - Cuidando da sua autoestima**

---

**💡 Dica**: Certifique-se de configurar o Firebase para ter sincronização em tempo real dos agendamentos entre dispositivos!





