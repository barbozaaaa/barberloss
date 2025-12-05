// 🔥 CONFIGURAÇÃO DO FIREBASE
// 
// PASSO 1: Acesse https://console.firebase.google.com
// PASSO 2: Crie um projeto (dê um nome, ex: "barber-loss")
// PASSO 3: Vá em Firestore Database > Criar banco > Modo teste
// PASSO 4: Vá em ⚙️ Configurações > Seus apps > Web > Copie as credenciais
// PASSO 5: Cole abaixo substituindo os valores "COLE_AQUI"

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// ⚠️ COLE SUAS CREDENCIAIS AQUI (você pega no Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyB-mWZvUnNJF1IvyZaeaJVfO-zEDpHqCfk",
  authDomain: "barber-loss.firebaseapp.com",
  projectId: "barber-loss",
  storageBucket: "barber-loss.firebasestorage.app",
  messagingSenderId: "512938209130",
  appId: "1:512938209130:web:e3a1e52eca9a8fac67bf13"
}

// Verificar se as credenciais foram preenchidas
const credenciaisPreenchidas = 
  firebaseConfig.apiKey !== "COLE_AQUI" &&
  firebaseConfig.projectId !== "COLE_AQUI"

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
