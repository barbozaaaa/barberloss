// 🔥 CONFIGURAÇÃO DO FIREBASE
// 
// PASSO 1: Acesse https://console.firebase.google.com
// PASSO 2: Crie um projeto (dê um nome, ex: "barber-loss")
// PASSO 3: Vá em Firestore Database > Criar banco > Modo teste
// PASSO 4: Vá em ⚙️ Configurações > Seus apps > Web > Copie as credenciais
// PASSO 5: Cole abaixo substituindo os valores "COLE_AQUI"
// 
// ⚠️ IMPORTANTE: Depois de configurar, renomeie este arquivo para firebase.ts

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// ⚠️ COLE SUAS CREDENCIAIS AQUI (você pega no Firebase Console)
const firebaseConfig = {
  apiKey: "COLE_SUA_API_KEY_AQUI",
  authDomain: "COLE_SEU_AUTH_DOMAIN_AQUI",
  projectId: "COLE_SEU_PROJECT_ID_AQUI",
  storageBucket: "COLE_SEU_STORAGE_BUCKET_AQUI",
  messagingSenderId: "COLE_SEU_MESSAGING_SENDER_ID_AQUI",
  appId: "COLE_SEU_APP_ID_AQUI"
}

// Verificar se as credenciais foram preenchidas
const credenciaisPreenchidas = 
  firebaseConfig.apiKey !== "COLE_SUA_API_KEY_AQUI" &&
  firebaseConfig.projectId !== "COLE_SEU_PROJECT_ID_AQUI"

// Inicializar Firebase apenas se as credenciais estiverem configuradas
let app: any = null
let db: any = null

if (credenciaisPreenchidas) {
  try {
    app = initializeApp(firebaseConfig)
    db = getFirestore(app)
    console.log('✅ Firebase conectado com sucesso!')
  } catch (error) {
    console.error('❌ Erro ao conectar Firebase:', error)
    alert('Erro ao conectar Firebase. Verifique as credenciais no arquivo firebase.ts')
  }
} else {
  console.warn('⚠️ Firebase não configurado. Usando localStorage por enquanto.')
}

export { db, credenciaisPreenchidas }
export default app










