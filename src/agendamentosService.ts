// Serviço para gerenciar agendamentos
// Usa Firebase se disponível, caso contrário usa localStorage

import { db, credenciaisPreenchidas } from './firebase'
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy,
  Timestamp,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

export type ServicoId = 'corte' | 'barba' | 'corte_barba' | 'luzes' | 'pintura_global' | 'pigmentacao_corte' | 'progressiva' | 'progressiva_apenas'

export interface Agendamento {
  nome: string
  telefone: string
  data: string
  horario: string
  servico: ServicoId | string
  id?: string
  dataCriacao?: string
  finalizado?: boolean
  preco?: string
}

// Verificar se Firebase está disponível
const isFirebaseAvailable = () => {
  return credenciaisPreenchidas && db !== null && db !== undefined
}

// Salvar agendamento
export const salvarAgendamento = async (agendamento: Omit<Agendamento, 'id' | 'dataCriacao' | 'finalizado'>): Promise<void> => {
  console.log('💾 Iniciando salvamento de agendamento:', agendamento)
  
  if (isFirebaseAvailable()) {
    // Salvar no Firebase
    try {
      console.log('🔥 Tentando salvar no Firebase...')
      const docRef = await addDoc(collection(db, 'agendamentos'), {
        nome: agendamento.nome,
        telefone: agendamento.telefone,
        data: agendamento.data,
        horario: agendamento.horario,
        servico: agendamento.servico,
        preco: agendamento.preco || '',
        finalizado: false,
        dataCriacao: Timestamp.now(),
      })
      console.log('✅ Agendamento salvo no Firebase com ID:', docRef.id)
      console.log('📝 Dados salvos:', agendamento)
      
      // Criar evento no Google Calendar (se configurado)
      try {
        const { criarEventoCalendario } = await import('./googleCalendarService')
        const servicoNome = typeof agendamento.servico === 'string' ? agendamento.servico : agendamento.servico
        await criarEventoCalendario(
          agendamento.nome,
          agendamento.telefone,
          servicoNome,
          agendamento.data,
          agendamento.horario,
          agendamento.preco
        )
      } catch (calendarError) {
        // Não bloquear o agendamento se o Google Calendar falhar
        console.warn('⚠️ Erro ao criar evento no Google Calendar (não crítico):', calendarError)
      }
    } catch (error: any) {
      console.error('❌ Erro ao salvar no Firebase:', error)
      console.error('❌ Detalhes do erro:', {
        code: error?.code,
        message: error?.message,
        stack: error?.stack
      })
      
      // Fallback para localStorage
      console.log('💾 Fazendo fallback para localStorage...')
      try {
        salvarNoLocalStorage(agendamento)
        console.log('✅ Agendamento salvo no localStorage como fallback')
      } catch (localStorageError) {
        console.error('❌ Erro também no localStorage:', localStorageError)
        throw new Error('Não foi possível salvar o agendamento. Verifique sua conexão e tente novamente.')
      }
    }
  } else {
    // Salvar no localStorage
    console.log('💾 Salvando no localStorage (Firebase não disponível)')
    try {
      salvarNoLocalStorage(agendamento)
      console.log('✅ Agendamento salvo no localStorage')
    } catch (error) {
      console.error('❌ Erro ao salvar no localStorage:', error)
      throw new Error('Não foi possível salvar o agendamento. Verifique sua conexão e tente novamente.')
    }
    
    // Criar evento no Google Calendar (se configurado)
    try {
      const { criarEventoCalendario } = await import('./googleCalendarService')
      const servicoNome = typeof agendamento.servico === 'string' ? agendamento.servico : agendamento.servico
      await criarEventoCalendario(
        agendamento.nome,
        agendamento.telefone,
        servicoNome,
        agendamento.data,
        agendamento.horario,
        agendamento.preco
      )
    } catch (calendarError) {
      // Não bloquear o agendamento se o Google Calendar falhar
      console.warn('⚠️ Erro ao criar evento no Google Calendar (não crítico):', calendarError)
    }
  }
}

// Salvar no localStorage (fallback)
const salvarNoLocalStorage = (agendamento: Omit<Agendamento, 'id' | 'dataCriacao' | 'finalizado'>) => {
  try {
    const agendamentosSalvos = localStorage.getItem('agendamentos')
    const agendamentosExistentes = agendamentosSalvos ? JSON.parse(agendamentosSalvos) : []
    const novoAgendamento: Agendamento = {
      ...agendamento,
      id: Date.now().toString(),
      dataCriacao: new Date().toISOString(),
      finalizado: false,
    }
    const novosAgendamentos = [...agendamentosExistentes, novoAgendamento]
    localStorage.setItem('agendamentos', JSON.stringify(novosAgendamentos))
    console.log('✅ Agendamento salvo no localStorage')
  } catch (error) {
    console.error('❌ Erro ao salvar no localStorage:', error)
  }
}

// Buscar todos os agendamentos
export const buscarAgendamentos = async (): Promise<Agendamento[]> => {
  if (isFirebaseAvailable()) {
    // Buscar do Firebase
    try {
      const q = query(
        collection(db, 'agendamentos'), 
        orderBy('dataCriacao', 'desc')
      )
      const querySnapshot = await getDocs(q)
      const agendamentos: Agendamento[] = []
      
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        // Garantir que finalizado seja boolean
        const finalizado = data.finalizado === true || data.finalizado === 'true' || false
        
        agendamentos.push({
          id: doc.id,
          nome: data.nome || '',
          telefone: data.telefone || '',
          data: data.data || '',
          horario: data.horario || '',
          servico: data.servico || '',
          dataCriacao: data.dataCriacao?.toDate?.()?.toISOString() || new Date().toISOString(),
          finalizado: finalizado,
          preco: data.preco || '',
        })
        
        console.log('📝 Agendamento processado do Firebase:', {
          id: doc.id,
          nome: data.nome,
          data: data.data,
          horario: data.horario,
          finalizado: data.finalizado,
          finalizadoProcessado: finalizado
        })
      })
      
      console.log(`✅ ${agendamentos.length} agendamentos carregados do Firebase`)
      if (agendamentos.length > 0) {
        console.log('📋 Primeiro agendamento:', agendamentos[0])
      }
      return agendamentos
    } catch (error) {
      console.error('❌ Erro ao buscar do Firebase:', error)
      // Fallback para localStorage
      return buscarDoLocalStorage()
    }
  } else {
    // Buscar do localStorage
    return buscarDoLocalStorage()
  }
}

// Buscar do localStorage (fallback)
const buscarDoLocalStorage = (): Agendamento[] => {
  try {
    const agendamentosSalvos = localStorage.getItem('agendamentos')
    if (agendamentosSalvos) {
      const agendamentos = JSON.parse(agendamentosSalvos)
      console.log(`✅ ${agendamentos.length} agendamentos carregados do localStorage`)
      return agendamentos
    }
    return []
  } catch (error) {
    console.error('❌ Erro ao ler localStorage:', error)
    return []
  }
}

// Marcar agendamento como finalizado
export const marcarFinalizado = async (id: string): Promise<void> => {
  if (isFirebaseAvailable()) {
    try {
      const agendamentoRef = doc(db, 'agendamentos', id)
      await updateDoc(agendamentoRef, {
        finalizado: true
      })
      console.log('✅ Agendamento marcado como finalizado no Firebase')
    } catch (error) {
      console.error('❌ Erro ao atualizar no Firebase:', error)
      marcarFinalizadoLocalStorage(id)
    }
  } else {
    marcarFinalizadoLocalStorage(id)
  }
}

const marcarFinalizadoLocalStorage = (id: string) => {
  try {
    const agendamentosSalvos = localStorage.getItem('agendamentos')
    if (agendamentosSalvos) {
      const agendamentos: Agendamento[] = JSON.parse(agendamentosSalvos)
      const atualizados = agendamentos.map(ag => 
        ag.id === id ? { ...ag, finalizado: true } : ag
      )
      localStorage.setItem('agendamentos', JSON.stringify(atualizados))
      console.log('✅ Agendamento marcado como finalizado no localStorage')
    }
  } catch (error) {
    console.error('❌ Erro ao atualizar localStorage:', error)
  }
}

// Cancelar/remover agendamento
export const cancelarAgendamento = async (id: string): Promise<void> => {
  if (isFirebaseAvailable()) {
    try {
      const agendamentoRef = doc(db, 'agendamentos', id)
      await deleteDoc(agendamentoRef)
      console.log('✅ Agendamento cancelado/removido do Firebase')
    } catch (error) {
      console.error('❌ Erro ao cancelar no Firebase:', error)
      cancelarAgendamentoLocalStorage(id)
    }
  } else {
    cancelarAgendamentoLocalStorage(id)
  }
}

const cancelarAgendamentoLocalStorage = (id: string) => {
  try {
    const agendamentosSalvos = localStorage.getItem('agendamentos')
    if (agendamentosSalvos) {
      const agendamentos: Agendamento[] = JSON.parse(agendamentosSalvos)
      const atualizados = agendamentos.filter(ag => ag.id !== id)
      localStorage.setItem('agendamentos', JSON.stringify(atualizados))
      console.log('✅ Agendamento cancelado/removido do localStorage')
    }
  } catch (error) {
    console.error('❌ Erro ao cancelar no localStorage:', error)
  }
}

// Resetar todos os agendamentos finalizados (remover)
export const resetarCaixa = async (): Promise<void> => {
  if (isFirebaseAvailable()) {
    try {
      const agendamentos = await buscarAgendamentos()
      const finalizados = agendamentos.filter(ag => ag.finalizado === true)
      
      // Deletar cada agendamento finalizado
      for (const ag of finalizados) {
        if (ag.id) {
          const agendamentoRef = doc(db, 'agendamentos', ag.id)
          await deleteDoc(agendamentoRef)
        }
      }
      console.log(`✅ ${finalizados.length} agendamentos finalizados removidos do Firebase`)
    } catch (error) {
      console.error('❌ Erro ao resetar no Firebase:', error)
      resetarCaixaLocalStorage()
    }
  } else {
    resetarCaixaLocalStorage()
  }
}

const resetarCaixaLocalStorage = () => {
  try {
    const agendamentosSalvos = localStorage.getItem('agendamentos')
    if (agendamentosSalvos) {
      const agendamentos: Agendamento[] = JSON.parse(agendamentosSalvos)
      // Remover apenas os agendamentos finalizados
      const atualizados = agendamentos.filter(ag => ag.finalizado !== true)
      localStorage.setItem('agendamentos', JSON.stringify(atualizados))
      console.log(`✅ ${agendamentos.length - atualizados.length} agendamentos finalizados removidos do localStorage`)
    }
  } catch (error) {
    console.error('❌ Erro ao resetar localStorage:', error)
  }
}
