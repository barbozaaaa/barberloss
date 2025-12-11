# 🌐 Como Mudar o Domínio no Vercel

## 📋 Opções de Domínio no Vercel

O Vercel oferece duas opções principais:

1. **Domínio do Vercel** (gratuito): `seu-projeto.vercel.app`
2. **Domínio Personalizado** (seu próprio domínio): `www.seudominio.com.br`

---

## 🎯 Opção 1: Usar Domínio do Vercel (Gratuito)

Se você ainda não tem um domínio personalizado, o Vercel já fornece um domínio gratuito.

### Como encontrar seu domínio:
1. Acesse: https://vercel.com
2. Faça login
3. Clique no seu projeto **"barberloss"**
4. Na página do projeto, você verá:
   - **Production**: `https://barberloss.vercel.app` (ou similar)
   - **Preview**: URLs para cada branch

**Esse domínio já está funcionando!** ✅

---

## 🔧 Opção 2: Adicionar Domínio Personalizado

Se você já tem um domínio (ex: `barbearia.com.br`), siga estes passos:

### **Passo 1: Acessar Configurações do Projeto**

1. Acesse: https://vercel.com
2. Faça login
3. Clique no seu projeto **"barberloss"**
4. Vá em **Settings** (Configurações)
5. Clique em **Domains** (Domínios)

### **Passo 2: Adicionar Domínio**

1. Clique em **"Add Domain"** ou **"Adicionar Domínio"**
2. Digite seu domínio (ex: `www.barbearia.com.br` ou `barbearia.com.br`)
3. Clique em **"Add"**

### **Passo 3: Configurar DNS no Registrador**

O Vercel vai mostrar instruções específicas. Geralmente você precisa:

#### **Para domínio com www (www.seudominio.com.br):**
```
Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
```

#### **Para domínio sem www (seudominio.com.br):**
```
Tipo: A
Nome: @
Valor: 76.76.21.21
```

OU

```
Tipo: CNAME
Nome: @
Valor: cname.vercel-dns.com
```

### **Passo 4: Configurar no Seu Registrador**

1. Acesse o painel do seu registrador de domínio (ex: Registro.br, GoDaddy, Namecheap)
2. Vá em **DNS** ou **Gerenciamento de DNS**
3. Adicione os registros que o Vercel indicou
4. Salve as alterações

### **Passo 5: Aguardar Propagação**

- ⏱️ Pode levar de **5 minutos a 48 horas**
- Geralmente funciona em **15-30 minutos**
- O Vercel vai mostrar o status: **"Valid Configuration"** quando estiver pronto

---

## 🔄 Como Mudar o Domínio Padrão do Vercel

Se você quer mudar o domínio `.vercel.app`:

### **Renomear o Projeto:**

1. Acesse: https://vercel.com
2. Vá em **Settings** → **General**
3. Procure por **"Project Name"**
4. Altere o nome (ex: de `barberloss` para `barbearia`)
5. Salve
6. O novo domínio será: `https://barbearia.vercel.app`

⚠️ **Atenção**: Isso muda o nome do projeto, mas não o domínio principal se você já tiver um domínio personalizado configurado.

---

## 📝 Configurar Domínio Principal (Primary Domain)

Se você tem múltiplos domínios, pode escolher qual é o principal:

1. Vá em **Settings** → **Domains**
2. Clique nos **3 pontinhos** (⋯) ao lado do domínio
3. Selecione **"Set as Primary Domain"**

---

## ✅ Verificar se Está Funcionando

1. Acesse seu domínio no navegador
2. Deve carregar o site normalmente
3. Verifique o console do navegador (F12) para erros
4. Teste fazer um agendamento

---

## 🆓 Domínios Gratuitos do Vercel

O Vercel oferece domínios gratuitos:
- ✅ `seu-projeto.vercel.app` (sempre disponível)
- ✅ Domínios personalizados (se você já tiver um)

---

## 🔗 Links Úteis

- **Painel Vercel**: https://vercel.com/dashboard
- **Documentação Vercel**: https://vercel.com/docs/concepts/projects/domains
- **Suporte Vercel**: https://vercel.com/support

---

## ❓ Problemas Comuns

### **"Invalid Configuration"**
- ✅ Verifique se os registros DNS estão corretos
- ✅ Aguarde a propagação (pode levar até 48h)
- ✅ Verifique se digitou o domínio corretamente

### **"Domain not found"**
- ✅ Certifique-se de que o domínio está registrado
- ✅ Verifique se os registros DNS foram salvos corretamente

### **Site não carrega no domínio personalizado**
- ✅ Aguarde a propagação DNS
- ✅ Limpe o cache do navegador
- ✅ Verifique se o domínio está marcado como "Valid Configuration" no Vercel

---

## 🎯 Resumo Rápido

**Para usar domínio do Vercel:**
- ✅ Já está funcionando em `seu-projeto.vercel.app`

**Para adicionar domínio personalizado:**
1. Settings → Domains → Add Domain
2. Configure DNS no registrador
3. Aguarde propagação
4. Pronto! 🚀

---

**Precisa de ajuda?** O suporte do Vercel responde rápido! 💬


