# 🔧 Como Configurar DNS para Vercel

## 📋 O que é DNS?

DNS (Domain Name System) é como um "catálogo telefônico" da internet. Ele traduz nomes de domínio (ex: `barbearia.com.br`) para endereços IP dos servidores.

Para conectar seu domínio ao Vercel, você precisa configurar os registros DNS no seu registrador.

---

## 🎯 Passo a Passo Completo

### **1. Obter as Configurações do Vercel**

Primeiro, você precisa adicionar o domínio no Vercel para obter as instruções:

1. Acesse: https://vercel.com
2. Faça login
3. Vá no seu projeto **"barberloss"**
4. Clique em **Settings** → **Domains**
5. Clique em **"Add Domain"**
6. Digite seu domínio (ex: `barbearia.com.br` ou `www.barbearia.com.br`)
7. Clique em **"Add"**

O Vercel vai mostrar exatamente quais registros DNS você precisa configurar!

---

## 📝 Tipos de Registros DNS

### **Registro A (para domínio sem www)**
```
Tipo: A
Nome: @ (ou deixe em branco)
Valor: 76.76.21.21
TTL: 3600 (ou automático)
```

### **Registro CNAME (para www ou domínio completo)**
```
Tipo: CNAME
Nome: www (ou @)
Valor: cname.vercel-dns.com
TTL: 3600 (ou automático)
```

---

## 🌐 Configuração por Registrador

### **📌 Registro.br (domínios .br)**

1. Acesse: https://registro.br
2. Faça login
3. Clique no seu domínio
4. Vá em **"DNS"** ou **"Gerenciamento de DNS"**
5. Clique em **"Adicionar"** ou **"Novo Registro"**

#### **Para domínio com www:**
```
Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
```

#### **Para domínio sem www:**
```
Tipo: A
Nome: @
Valor: 76.76.21.21
```

6. Clique em **"Salvar"**
7. Aguarde a propagação (15-30 minutos)

---

### **📌 GoDaddy**

1. Acesse: https://godaddy.com
2. Faça login
3. Vá em **"Meus Produtos"** → **"DNS"**
4. Clique no seu domínio
5. Role até **"Registros"**
6. Clique em **"Adicionar"**

#### **Para domínio com www:**
```
Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
TTL: 600 segundos
```

#### **Para domínio sem www:**
```
Tipo: A
Nome: @
Valor: 76.76.21.21
TTL: 600 segundos
```

7. Clique em **"Salvar"**
8. Aguarde a propagação

---

### **📌 Namecheap**

1. Acesse: https://namecheap.com
2. Faça login
3. Vá em **"Domain List"**
4. Clique em **"Manage"** ao lado do seu domínio
5. Vá na aba **"Advanced DNS"**
6. Clique em **"Add New Record"**

#### **Para domínio com www:**
```
Tipo: CNAME Record
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

#### **Para domínio sem www:**
```
Tipo: A Record
Host: @
Value: 76.76.21.21
TTL: Automatic
```

7. Clique no ícone de **salvar** (✓)
8. Aguarde a propagação

---

### **📌 Cloudflare**

1. Acesse: https://cloudflare.com
2. Faça login
3. Selecione seu domínio
4. Vá em **"DNS"** → **"Records"**
5. Clique em **"Add record"**

#### **Para domínio com www:**
```
Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy status: DNS only (não ative o proxy)
TTL: Auto
```

#### **Para domínio sem www:**
```
Type: A
Name: @
IPv4 address: 76.76.21.21
Proxy status: DNS only (não ative o proxy)
TTL: Auto
```

6. Clique em **"Save"**
7. Aguarde a propagação

---

### **📌 Hostinger**

1. Acesse: https://hostinger.com.br
2. Faça login
3. Vá em **"Domínios"** → **"Gerenciar"**
4. Clique em **"DNS / Nameservers"**
5. Clique em **"Adicionar Registro"**

#### **Para domínio com www:**
```
Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
TTL: 3600
```

#### **Para domínio sem www:**
```
Tipo: A
Nome: @
Valor: 76.76.21.21
TTL: 3600
```

6. Clique em **"Salvar"**
7. Aguarde a propagação

---

## 🔍 Verificar se Está Funcionando

### **1. Verificar no Vercel:**
- Vá em **Settings** → **Domains**
- O status deve mudar de **"Invalid Configuration"** para **"Valid Configuration"**

### **2. Verificar propagação DNS:**
- Acesse: https://dnschecker.org
- Digite seu domínio
- Verifique se os registros aparecem corretamente

### **3. Testar no navegador:**
- Acesse seu domínio
- Deve carregar o site do Vercel
- Pode levar alguns minutos após a propagação

---

## ⚠️ Importante

### **Domínio com e sem www:**
- Se você quer que **ambos** funcionem (`barbearia.com.br` e `www.barbearia.com.br`), configure **ambos os registros**:
  - Registro A para `@` (sem www)
  - Registro CNAME para `www`

### **TTL (Time To Live):**
- Use **3600 segundos** (1 hora) ou **Automático**
- Valores menores (300) fazem propagação mais rápida, mas aumentam consultas DNS

### **Aguardar propagação:**
- ⏱️ Pode levar de **5 minutos a 48 horas**
- Geralmente funciona em **15-30 minutos**
- Não mexa nos registros durante a propagação!

---

## 🎯 Exemplo Completo: Registro.br

Vamos supor que você tem o domínio `barbearia.com.br` no Registro.br:

### **Passo 1: Adicionar no Vercel**
1. Vercel → Settings → Domains → Add Domain
2. Digite: `barbearia.com.br`
3. Clique em Add

### **Passo 2: Configurar DNS no Registro.br**
1. Acesse registro.br
2. Clique no domínio `barbearia.com.br`
3. Vá em **DNS**
4. Adicione:

**Registro 1 (sem www):**
```
Tipo: A
Nome: @
Valor: 76.76.21.21
```

**Registro 2 (com www):**
```
Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
```

5. Salve ambos

### **Passo 3: Aguardar**
- Aguarde 15-30 minutos
- Verifique no Vercel se mudou para "Valid Configuration"
- Teste acessando `barbearia.com.br` e `www.barbearia.com.br`

---

## ❓ Problemas Comuns

### **"Invalid Configuration" no Vercel**
- ✅ Verifique se digitou o valor corretamente (sem espaços)
- ✅ Certifique-se de que salvou os registros
- ✅ Aguarde mais tempo (pode levar até 48h)

### **Domínio não carrega**
- ✅ Verifique se os registros estão salvos corretamente
- ✅ Limpe o cache do navegador (Ctrl+Shift+Delete)
- ✅ Tente em modo anônimo
- ✅ Verifique se o domínio está "Valid Configuration" no Vercel

### **Erro "DNS_PROBE_FINISHED_NXDOMAIN"**
- ✅ Os registros DNS ainda não propagaram
- ✅ Aguarde mais tempo
- ✅ Verifique se digitou os valores corretos

### **Só funciona com www (ou só sem www)**
- ✅ Configure ambos os registros (A para @ e CNAME para www)
- ✅ Aguarde a propagação de ambos

---

## 🔗 Links Úteis

- **Verificar DNS**: https://dnschecker.org
- **Testar propagação**: https://www.whatsmydns.net
- **Documentação Vercel DNS**: https://vercel.com/docs/concepts/projects/domains
- **Suporte Vercel**: https://vercel.com/support

---

## 🎯 Resumo Rápido

1. ✅ Adicione o domínio no Vercel (Settings → Domains)
2. ✅ Copie as instruções DNS que o Vercel mostra
3. ✅ Acesse seu registrador (Registro.br, GoDaddy, etc.)
4. ✅ Adicione os registros DNS (A e/ou CNAME)
5. ✅ Salve e aguarde propagação (15-30 min)
6. ✅ Verifique no Vercel se está "Valid Configuration"
7. ✅ Pronto! 🚀

---

**Dica**: O Vercel mostra instruções específicas quando você adiciona o domínio. Siga exatamente o que ele indicar! 📝


