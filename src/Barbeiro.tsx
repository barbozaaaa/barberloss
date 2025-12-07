import { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import type { Agendamento, ServicoId } from './agendamentosService'

const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: dark;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text',
      'Segoe UI', sans-serif;
    background-color: #050608;
    color: #f5f5f5;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: radial-gradient(circle at top, #1f2933 0, #050608 55%);
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
  }
`

const Page = styled.div`
  min-height: 100vh;
  color: #f9fafb;
  background: radial-gradient(circle at top, #111827 0, #020617 55%);
  background-attachment: fixed;
`

const Shell = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 12px 10px 40px;
  width: 100%;

  @media (min-width: 480px) {
    padding: 20px 16px 70px;
  }

  @media (min-width: 1024px) {
    padding: 32px 20px 96px;
  }
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 12px 0 16px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.25);
  backdrop-filter: blur(18px);
  position: sticky;
  top: 0;
  z-index: 20;
  background: radial-gradient(
      circle at top,
      rgba(15, 23, 42, 0.96),
      rgba(15, 23, 42, 0.92)
    )
    border-box;
  margin-bottom: 20px;

  @media (min-width: 480px) {
    padding-bottom: 24px;
    margin-bottom: 32px;
  }
`

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  text-align: center;
`

const BrandName = styled.span`
  font-size: 16px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: linear-gradient(120deg, #f97316, #facc15);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (min-width: 480px) {
    font-size: 24px;
    letter-spacing: 0.16em;
  }
`

const BrandSubtitle = styled.span`
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #9ca3af;
`

const AgendamentosSection = styled.section`
  margin-top: 20px;
`

const AgendamentosHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
`

const AgendamentosTitle = styled.h1`
  font-size: 18px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #e5e7eb;
  word-break: break-word;

  @media (min-width: 480px) {
    font-size: 24px;
    letter-spacing: 0.18em;
  }
`

const AgendamentosCount = styled.span`
  font-size: 13px;
  color: #fbbf24;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(251, 191, 36, 0.15);
  border: 1px solid rgba(251, 191, 36, 0.3);
  font-weight: 600;
`

const AgendamentosList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const AgendamentoGroup = styled.div`
  margin-bottom: 32px;
`

const AgendamentoGroupDate = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #fbbf24;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(251, 191, 36, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.08em;

  @media (min-width: 480px) {
    font-size: 16px;
    margin-bottom: 16px;
    padding-bottom: 12px;
    letter-spacing: 0.1em;
  }
`

const AgendamentoCard = styled.div`
  background: rgba(15, 23, 42, 0.96);
  border: 1px solid rgba(55, 65, 81, 0.9);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  transition: all 150ms ease;
  margin-bottom: 12px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    padding: 14px;
    gap: 10px;
    flex-direction: column;
    align-items: stretch;
  }

  &:hover {
    border-color: rgba(251, 191, 36, 0.7);
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(15, 23, 42, 0.95);
    background: rgba(15, 23, 42, 0.98);
  }
`

const AgendamentoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`

const AgendamentoNome = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #f9fafb;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`

const AgendamentoDetalhes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 12px;
  color: #9ca3af;

  @media (max-width: 480px) {
    font-size: 11px;
    gap: 8px;
    flex-direction: column;
  }
`

const AgendamentoHorario = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: #fbbf24;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(251, 191, 36, 0.2);
  border: 1px solid rgba(251, 191, 36, 0.4);
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 10px;
  }
`

const AgendamentoServico = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
  font-size: 15px;
  background: rgba(15, 23, 42, 0.5);
  border-radius: 20px;
  border: 1px solid rgba(55, 65, 81, 0.5);
`

const CaixaContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 20px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 32px;
  }
`

const CaixaCard = styled.div`
  background: rgba(15, 23, 42, 0.96);
  border: 1px solid rgba(251, 191, 36, 0.4);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (min-width: 480px) {
    border-radius: 16px;
    padding: 20px;
    gap: 8px;
  }
`

const CaixaLabel = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #9ca3af;
`

const CaixaValor = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #fbbf24;
  word-break: break-word;

  @media (min-width: 480px) {
    font-size: 28px;
  }
`

const NotificacaoProximo = styled.div`
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.15));
  border: 2px solid rgba(34, 197, 94, 0.5);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    padding: 12px;
    flex-direction: column;
    align-items: stretch;
  }
`

const NotificacaoTexto = styled.div`
  flex: 1;
  color: #d1fae5;
  font-size: 14px;
  line-height: 1.5;

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 8px;
  }
`

const NotificacaoTitulo = styled.div`
  font-weight: 700;
  color: #86efac;
  margin-bottom: 4px;
  font-size: 15px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`

const LembreteButton = styled.button`
  padding: 10px 18px;
  border-radius: 999px;
  border: none;
  outline: none;
  cursor: pointer;
  background: linear-gradient(120deg, #22c55e, #16a34a);
  color: #052e16;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  white-space: nowrap;
  transition: transform 150ms ease, box-shadow 150ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(34, 197, 94, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 12px;
  }
`

const FinalizarButton = styled.button<{ finalizado?: boolean }>`
  padding: 10px 14px;
  border-radius: 999px;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 150ms ease;
  white-space: nowrap;
  min-width: fit-content;
  flex-shrink: 0;
  
  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 10px;
    letter-spacing: 0.03em;
    width: 100%;
  }
  
  ${({ finalizado }) => finalizado 
    ? `
      background: rgba(34, 197, 94, 0.2);
      color: #22c55e;
      border: 1px solid rgba(34, 197, 94, 0.4);
      cursor: not-allowed;
    `
    : `
      background: linear-gradient(120deg, #22c55e, #bbf7d0);
      color: #052e16;
      border: 1px solid rgba(22, 163, 74, 0.3);
      
      &:hover {
        transform: translateY(-1px);
        filter: brightness(1.05);
      }
      
      &:active {
        transform: translateY(0);
      }
    `
  }
`

const AgendamentoCardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex: 1;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`

const AgendamentoActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 100%;
    justify-content: space-between;
  }
`

const ResetButton = styled.button`
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid rgba(239, 68, 68, 0.4);
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 150ms ease;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 10px;
    letter-spacing: 0.05em;
  }

  &:hover {
    background: rgba(239, 68, 68, 0.25);
    border-color: rgba(239, 68, 68, 0.6);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`

const CaixaHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
`

const CaixaTitle = styled.h2`
  font-size: 14px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #e5e7eb;
  word-break: break-word;

  @media (min-width: 480px) {
    font-size: 18px;
    letter-spacing: 0.18em;
  }
`


const servicos: {
  id: ServicoId
  nome: string
  icone: string
  preco: number
}[] = [
  { id: 'corte', nome: 'Corte', icone: '✂️', preco: 50 },
  { id: 'barba', nome: 'Barba', icone: '🧔', preco: 30 },
  { id: 'corte_barba', nome: 'Corte e barba', icone: '💈', preco: 60 },
  { id: 'luzes', nome: 'Corte com luzes (platinado)', icone: '⭐', preco: 100 },
  { id: 'pintura_global', nome: 'Platinado', icone: '✨', preco: 120 },
  { id: 'pigmentacao_corte', nome: 'Pigmentação e Corte', icone: '🎨', preco: 70 },
]

const formatarDataCompleta = (iso: string) => {
  if (!iso) return ''
  const [ano, mes, dia] = iso.split('-').map(Number)
  const data = new Date(ano, (mes || 1) - 1, dia || 1)
  const formatado = data.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
  return formatado.charAt(0).toUpperCase() + formatado.slice(1)
}

const organizarAgendamentosPorData = (agendamentos: Agendamento[]) => {
  const agrupados: { [key: string]: Agendamento[] } = {}
  
  console.log('📦 Organizando agendamentos:', agendamentos.length, agendamentos)
  
  if (agendamentos.length === 0) {
    console.warn('⚠️ Nenhum agendamento para organizar!')
    return agrupados
  }
  
  agendamentos
    .sort((a, b) => {
      try {
        if (!a.data || !b.data) return 0
        const dataA = new Date(`${a.data}T${a.horario || '00:00'}`)
        const dataB = new Date(`${b.data}T${b.horario || '00:00'}`)
        return dataA.getTime() - dataB.getTime()
      } catch (error) {
        console.error('Erro ao ordenar:', a, b, error)
        return 0
      }
    })
    .forEach(ag => {
      if (!ag.data) {
        console.warn('⚠️ Agendamento sem data na organização:', ag)
        return
      }
      if (!agrupados[ag.data]) {
        agrupados[ag.data] = []
      }
      agrupados[ag.data].push(ag)
      console.log('✅ Agendamento adicionado ao grupo:', ag.data, ag.nome)
    })
  
  console.log('📦 Agendamentos agrupados:', Object.keys(agrupados).length, 'datas', agrupados)
  return agrupados
}

function Barbeiro() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    const carregarAgendamentos = async () => {
      try {
        setErro(null)
        const { buscarAgendamentos } = await import('./agendamentosService')
        const ags = await buscarAgendamentos()
        console.log('📋 Total de agendamentos carregados:', ags.length)
        setAgendamentos(ags || [])
      } catch (e) {
        console.error('❌ Erro ao carregar agendamentos:', e)
        setErro('Erro ao carregar agendamentos. Tente recarregar a página.')
      }
    }

    carregarAgendamentos()
    
    // Atualizar a cada 3 segundos para pegar novos agendamentos
    const interval = setInterval(carregarAgendamentos, 3000)
    
    // Verificar agendamentos próximos a cada minuto
    const intervalProximos = setInterval(() => {
      // Força re-render para atualizar notificações
      setAgendamentos(prev => [...prev])
    }, 60000) // 1 minuto
    
    return () => {
      clearInterval(interval)
      clearInterval(intervalProximos)
    }
  }, [])

  const agendamentosFuturos = (agendamentos || []).filter(ag => {
    if (!ag || !ag.data) {
      return false
    }
    try {
      // Garantir que finalizado seja boolean
      const finalizado = ag.finalizado === true || String(ag.finalizado) === 'true'
      
      // Processar data
      const dataAgendamento = new Date(ag.data + 'T00:00:00')
      const hoje = new Date()
      hoje.setHours(0, 0, 0, 0)
      dataAgendamento.setHours(0, 0, 0, 0)
      
      // Permitir agendamentos de hoje ou futuros
      const isFuturo = dataAgendamento >= hoje
      const naoFinalizado = !finalizado
      const resultado = isFuturo && naoFinalizado
      
      return resultado
    } catch (error) {
      console.error('❌ Erro ao processar data do agendamento:', ag, error)
      return false
    }
  })

  const agendamentosFinalizados = (agendamentos || []).filter(ag => ag && (ag.finalizado === true || String(ag.finalizado) === 'true'))
  
  // Verificar agendamentos próximos (30 minutos antes)
  const agendamentosProximos = (agendamentosFuturos || []).filter(ag => {
    try {
      if (!ag || !ag.data || !ag.horario) return false
      
      const [hora, minuto] = ag.horario.split(':').map(Number)
      if (isNaN(hora) || isNaN(minuto)) return false
      
      const dataAgendamento = new Date(ag.data)
      dataAgendamento.setHours(hora, minuto, 0, 0)
      
      const agora = new Date()
      const diferencaMinutos = (dataAgendamento.getTime() - agora.getTime()) / (1000 * 60)
      
      // Entre 30 e 35 minutos antes (janela de 5 minutos para enviar)
      return diferencaMinutos >= 25 && diferencaMinutos <= 35
    } catch (error) {
      console.error('Erro ao verificar agendamento próximo:', ag, error)
      return false
    }
  })
  
  // Função para enviar lembrete via WhatsApp
  const enviarLembreteWhatsApp = (ag: Agendamento) => {
    try {
      if (!ag || !ag.nome || !ag.telefone || !ag.data || !ag.horario) {
        alert('Dados do agendamento incompletos')
        return
      }
      
      const servicoInfo = servicos.find(s => s.id === ag.servico as ServicoId)
      const mensagem = `Olá ${ag.nome}! 👋\n\n` +
        `Este é um lembrete do seu agendamento:\n\n` +
        `📅 *Data:* ${formatarDataCompleta(ag.data)}\n` +
        `🕐 *Horário:* ${ag.horario}\n` +
        `✂️ *Serviço:* ${servicoInfo?.nome || ag.servico || 'Serviço'}\n\n` +
        `Nos vemos em breve! 😊`
      
      const telefoneLimpo = (ag.telefone || '').replace(/\D/g, '')
      if (telefoneLimpo.length < 10) {
        alert('Telefone inválido')
        return
      }
      
      const urlWhatsApp = `https://wa.me/55${telefoneLimpo}?text=${encodeURIComponent(mensagem)}`
      window.open(urlWhatsApp, '_blank')
    } catch (error) {
      console.error('Erro ao enviar lembrete:', error)
      alert('Erro ao abrir WhatsApp. Tente novamente.')
    }
  }
  
  console.log('📊 Resumo:', {
    total: agendamentos.length,
    futuros: agendamentosFuturos.length,
    finalizados: agendamentosFinalizados.length,
    proximos: agendamentosProximos.length
  })

  // Calcular totais da caixa
  const calcularTotal = () => {
    try {
      return agendamentosFinalizados.reduce((total, ag) => {
        try {
          const servicoInfo = servicos.find(s => s.id === (ag.servico as ServicoId))
          // Usar preço do serviço ou tentar extrair do preço salvo
          if (servicoInfo?.preco) {
            return total + servicoInfo.preco
          }
          // Se não tiver preço no serviço, tentar extrair do preço salvo
          if (ag.preco) {
            const precoNum = parseFloat(ag.preco.replace('R$', '').replace(',', '.').trim())
            return total + (isNaN(precoNum) ? 0 : precoNum)
          }
          return total
        } catch (error) {
          console.error('Erro ao calcular preço do agendamento:', ag, error)
          return total
        }
      }, 0)
    } catch (error) {
      console.error('Erro ao calcular total:', error)
      return 0
    }
  }

  const totalCaixa = calcularTotal()

  const handleFinalizar = async (id: string) => {
    try {
      const { marcarFinalizado } = await import('./agendamentosService')
      await marcarFinalizado(id)
      // Recarregar agendamentos
      const { buscarAgendamentos } = await import('./agendamentosService')
      const ags = await buscarAgendamentos()
      setAgendamentos(ags)
    } catch (error) {
      console.error('Erro ao finalizar agendamento:', error)
    }
  }

  const handleResetarCaixa = async () => {
    if (window.confirm('Tem certeza que deseja resetar a caixa? Todos os agendamentos finalizados serão REMOVIDOS permanentemente.')) {
      try {
        const { resetarCaixa, buscarAgendamentos } = await import('./agendamentosService')
        await resetarCaixa()
        // Aguardar um pouco para garantir que a operação foi concluída
        await new Promise(resolve => setTimeout(resolve, 500))
        // Recarregar agendamentos
        const ags = await buscarAgendamentos()
        setAgendamentos(ags)
        alert('✅ Caixa resetada com sucesso! Agendamentos finalizados foram removidos.')
      } catch (error) {
        console.error('Erro ao resetar caixa:', error)
        alert('❌ Erro ao resetar caixa. Tente novamente.')
      }
    }
  }

  // Se houver erro, mostrar mensagem
  if (erro) {
    return (
      <>
        <GlobalStyle />
        <Page>
          <Shell>
            <Header>
              <LogoText>
                <BrandName>Barber Loss</BrandName>
                <BrandSubtitle>Painel do Barbeiro</BrandSubtitle>
              </LogoText>
            </Header>
            <EmptyState>
              ❌ {erro}
              <br />
              <br />
              <button 
                onClick={() => window.location.reload()} 
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#fbbf24',
                  color: '#052e16',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '16px'
                }}
              >
                Recarregar Página
              </button>
            </EmptyState>
          </Shell>
        </Page>
      </>
    )
  }

  return (
    <>
      <GlobalStyle />
      <Page>
        <Shell>
          <Header>
            <LogoText>
              <BrandName>Barber Loss</BrandName>
              <BrandSubtitle>Painel do Barbeiro</BrandSubtitle>
            </LogoText>
          </Header>

          <AgendamentosSection>
            <CaixaHeader>
              <CaixaTitle>💰 Controle de Caixa</CaixaTitle>
              {agendamentosFinalizados.length > 0 && (
                <ResetButton onClick={handleResetarCaixa}>
                  🔄 Resetar Caixa
                </ResetButton>
              )}
            </CaixaHeader>
            
            <CaixaContainer>
              <CaixaCard>
                <CaixaLabel>💰 Total em Caixa</CaixaLabel>
                <CaixaValor>R$ {totalCaixa.toFixed(2).replace('.', ',')}</CaixaValor>
              </CaixaCard>
              <CaixaCard>
                <CaixaLabel>✅ Finalizados</CaixaLabel>
                <CaixaValor>{agendamentosFinalizados.length}</CaixaValor>
              </CaixaCard>
              <CaixaCard>
                <CaixaLabel>📅 Pendentes</CaixaLabel>
                <CaixaValor>{agendamentosFuturos.length}</CaixaValor>
              </CaixaCard>
            </CaixaContainer>

            {agendamentosProximos.length > 0 && (
              <NotificacaoProximo>
                <NotificacaoTexto>
                  <NotificacaoTitulo>🔔 Lembrete: Agendamento próximo!</NotificacaoTitulo>
                  {agendamentosProximos.length === 1 ? (
                    <>
                      {agendamentosProximos[0].nome} tem agendamento às {agendamentosProximos[0].horario} 
                      (em aproximadamente 30 minutos)
                    </>
                  ) : (
                    <>
                      {agendamentosProximos.length} clientes têm agendamento em aproximadamente 30 minutos
                    </>
                  )}
                </NotificacaoTexto>
                {agendamentosProximos.length === 1 ? (
                  <LembreteButton onClick={() => enviarLembreteWhatsApp(agendamentosProximos[0])}>
                    📱 Enviar Lembrete
                  </LembreteButton>
                ) : (
                  <LembreteButton onClick={() => {
                    agendamentosProximos.forEach((ag, idx) => {
                      setTimeout(() => enviarLembreteWhatsApp(ag), idx * 500)
                    })
                  }}>
                    📱 Enviar Todos
                  </LembreteButton>
                )}
              </NotificacaoProximo>
            )}

            <AgendamentosHeader>
              <AgendamentosTitle>Agendamentos Pendentes</AgendamentosTitle>
              <AgendamentosCount>
                {agendamentosFuturos.length} {agendamentosFuturos.length === 1 ? 'agendamento' : 'agendamentos'}
              </AgendamentosCount>
            </AgendamentosHeader>

            {agendamentosFuturos.length === 0 ? (
              <EmptyState>
                📅 Nenhum agendamento agendado no momento.
              </EmptyState>
            ) : (
              (() => {
                const agendamentosAgrupados = organizarAgendamentosPorData(agendamentosFuturos)
                const grupos = Object.entries(agendamentosAgrupados)
                console.log('🎨 Renderizando:', grupos.length, 'grupos de agendamentos')
                
                if (grupos.length === 0) {
                  return (
                    <EmptyState>
                      ⚠️ Nenhum grupo de agendamentos criado. Verifique o console (F12).
                    </EmptyState>
                  )
                }
                
                return (
                  <AgendamentosList>
                    {grupos.map(([data, ags]) => {
                      console.log('📅 Renderizando grupo para data:', data, 'com', ags.length, 'agendamentos', ags)
                      return (
                        <AgendamentoGroup key={data}>
                          <AgendamentoGroupDate>
                            📆 {formatarDataCompleta(data)}
                          </AgendamentoGroupDate>
                          {ags.map((ag) => {
                            const servicoInfo = servicos.find((s) => s.id === ag.servico)
                            if (!servicoInfo) {
                              console.warn('⚠️ Serviço não encontrado para:', ag.servico, ag)
                            }
                            console.log('🎯 Renderizando card:', ag.nome, ag.data, ag.horario)
                            return (
                              <AgendamentoCard key={ag.id || `ag-${ag.nome}-${ag.data}-${ag.horario}`}>
                                <AgendamentoCardContent>
                                  <AgendamentoInfo>
                                    <AgendamentoNome>👤 {ag.nome}</AgendamentoNome>
                                    <AgendamentoDetalhes>
                                      <AgendamentoServico>
                                        {servicoInfo?.icone || '✂️'} {servicoInfo?.nome || ag.servico}
                                      </AgendamentoServico>
                                      <span>📱 {ag.telefone}</span>
                                      <span>💰 R$ {servicoInfo?.preco ? servicoInfo.preco.toFixed(2).replace('.', ',') : '0,00'}</span>
                                    </AgendamentoDetalhes>
                                  </AgendamentoInfo>
                                  <AgendamentoActions>
                                    <AgendamentoHorario>
                                      🕐 {ag.horario}
                                    </AgendamentoHorario>
                                    <FinalizarButton
                                      finalizado={ag.finalizado}
                                      onClick={() => !ag.finalizado && ag.id && handleFinalizar(ag.id)}
                                      disabled={ag.finalizado}
                                    >
                                      {ag.finalizado ? '✓ Feito' : '✓ Finalizar'}
                                    </FinalizarButton>
                                  </AgendamentoActions>
                                </AgendamentoCardContent>
                              </AgendamentoCard>
                            )
                          })}
                        </AgendamentoGroup>
                      )
                    })}
                  </AgendamentosList>
                )
              })()
            )}
          </AgendamentosSection>
        </Shell>
      </Page>
    </>
  )
}

export default Barbeiro

