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
  padding: 16px 12px 60px;
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
  padding-bottom: 24px;
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
  margin-bottom: 32px;
`

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  text-align: center;
`

const BrandName = styled.span`
  font-size: 20px;
  letter-spacing: 0.12em;
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
  font-size: 16px;
  font-weight: 700;
  color: #fbbf24;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(251, 191, 36, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
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
  font-size: 16px;
  font-weight: 600;
  color: #f9fafb;
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
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 24px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 32px;
  }
`

const CaixaCard = styled.div`
  background: rgba(15, 23, 42, 0.96);
  border: 1px solid rgba(251, 191, 36, 0.4);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const CaixaLabel = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #9ca3af;
`

const CaixaValor = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: #fbbf24;
  word-break: break-word;

  @media (min-width: 480px) {
    font-size: 28px;
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
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
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
  
  agendamentos
    .filter(ag => {
      const dataAgendamento = new Date(ag.data)
      const hoje = new Date()
      hoje.setHours(0, 0, 0, 0)
      return dataAgendamento >= hoje
    })
    .sort((a, b) => {
      const dataA = new Date(`${a.data}T${a.horario}`)
      const dataB = new Date(`${b.data}T${b.horario}`)
      return dataA.getTime() - dataB.getTime()
    })
    .forEach(ag => {
      if (!agrupados[ag.data]) {
        agrupados[ag.data] = []
      }
      agrupados[ag.data].push(ag)
    })
  
  return agrupados
}

function Barbeiro() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])

  useEffect(() => {
    const carregarAgendamentos = async () => {
      try {
        const { buscarAgendamentos } = await import('./agendamentosService')
        const ags = await buscarAgendamentos()
        console.log('📋 Total de agendamentos carregados:', ags.length)
        console.log('📋 Todos os agendamentos:', ags)
        if (ags.length > 0) {
          console.log('📋 Primeiro agendamento completo:', JSON.stringify(ags[0], null, 2))
        }
        setAgendamentos(ags)
      } catch (e) {
        console.error('❌ Erro ao carregar agendamentos:', e)
      }
    }

    carregarAgendamentos()
    
    // Atualizar a cada 3 segundos para pegar novos agendamentos
    const interval = setInterval(carregarAgendamentos, 3000)
    
    return () => clearInterval(interval)
  }, [])

  const agendamentosFuturos = agendamentos.filter(ag => {
    if (!ag.data) {
      console.warn('⚠️ Agendamento sem data:', ag)
      return false
    }
    try {
      const dataAgendamento = new Date(ag.data + 'T00:00:00')
      const hoje = new Date()
      hoje.setHours(0, 0, 0, 0)
      dataAgendamento.setHours(0, 0, 0, 0)
      const isFuturo = dataAgendamento >= hoje
      const naoFinalizado = !ag.finalizado
      const resultado = isFuturo && naoFinalizado
      
      console.log('🔍 Filtro agendamento:', {
        nome: ag.nome,
        data: ag.data,
        dataAgendamento: dataAgendamento.toISOString().split('T')[0],
        hoje: hoje.toISOString().split('T')[0],
        isFuturo,
        finalizado: ag.finalizado,
        naoFinalizado,
        resultado
      })
      
      return resultado
    } catch (error) {
      console.error('❌ Erro ao processar data do agendamento:', ag, error)
      return false
    }
  })

  const agendamentosFinalizados = agendamentos.filter(ag => ag.finalizado === true)
  
  console.log('📊 Resumo:', {
    total: agendamentos.length,
    futuros: agendamentosFuturos.length,
    finalizados: agendamentosFinalizados.length
  })

  // Calcular totais da caixa
  const calcularTotal = () => {
    return agendamentosFinalizados.reduce((total, ag) => {
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
    }, 0)
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

            <AgendamentosHeader>
              <AgendamentosTitle>Agendamentos Pendentes</AgendamentosTitle>
              <AgendamentosCount>
                {agendamentosFuturos.length} {agendamentosFuturos.length === 1 ? 'agendamento' : 'agendamentos'}
              </AgendamentosCount>
            </AgendamentosHeader>

            {agendamentos.length === 0 ? (
              <EmptyState>
                📅 Nenhum agendamento encontrado.<br />
                <br />
                <strong>Debug:</strong><br />
                - Verifique o console do navegador (F12) para ver os logs<br />
                - Se estiver usando Firebase, verifique as regras do Firestore<br />
                - Se estiver usando localStorage, os dados são locais ao navegador
              </EmptyState>
            ) : agendamentosFuturos.length === 0 ? (
              <EmptyState>
                📅 Nenhum agendamento futuro no momento.<br />
                <br />
                <strong>Debug:</strong><br />
                Total de agendamentos: {agendamentos.length}<br />
                Finalizados: {agendamentosFinalizados.length}<br />
                <br />
                Verifique o console (F12) para mais detalhes.
              </EmptyState>
            ) : (
              <AgendamentosList>
                {Object.entries(organizarAgendamentosPorData(agendamentosFuturos)).map(([data, ags]) => (
                  <AgendamentoGroup key={data}>
                    <AgendamentoGroupDate>
                      📆 {formatarDataCompleta(data)}
                    </AgendamentoGroupDate>
                    {ags.map((ag) => {
                      const servicoInfo = servicos.find((s) => s.id === ag.servico)
                      return (
                        <AgendamentoCard key={ag.id}>
                          <AgendamentoCardContent>
                            <AgendamentoInfo>
                              <AgendamentoNome>👤 {ag.nome}</AgendamentoNome>
                              <AgendamentoDetalhes>
                                <AgendamentoServico>
                                  {servicoInfo?.icone} {servicoInfo?.nome}
                                </AgendamentoServico>
                                <span>📱 {ag.telefone}</span>
                                <span>💰 R$ {servicoInfo?.preco.toFixed(2).replace('.', ',')}</span>
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
                ))}
              </AgendamentosList>
            )}
          </AgendamentosSection>
        </Shell>
      </Page>
    </>
  )
}

export default Barbeiro

