// Serviço para integração com Google Calendar API
// Cria eventos automaticamente quando um agendamento é feito

export interface GoogleCalendarConfig {
  accessToken: string
  calendarId: string
}

// Verificar se as credenciais do Google Calendar estão configuradas
export const isGoogleCalendarConfigured = (): boolean => {
  const config = getGoogleCalendarConfig()
  return !!(config?.accessToken && config?.calendarId)
}

// Obter configuração do Google Calendar
export const getGoogleCalendarConfig = (): GoogleCalendarConfig | null => {
  try {
    const accessToken = localStorage.getItem('google_calendar_access_token')
    const calendarId = localStorage.getItem('google_calendar_id') || 'primary'
    
    if (!accessToken) {
      return null
    }
    
    return {
      accessToken,
      calendarId
    }
  } catch (error) {
    console.error('❌ Erro ao obter configuração do Google Calendar:', error)
    return null
  }
}

// Salvar configuração do Google Calendar
export const salvarGoogleCalendarConfig = (accessToken: string, calendarId: string = 'primary'): void => {
  try {
    localStorage.setItem('google_calendar_access_token', accessToken)
    localStorage.setItem('google_calendar_id', calendarId)
    console.log('✅ Configuração do Google Calendar salva')
  } catch (error) {
    console.error('❌ Erro ao salvar configuração do Google Calendar:', error)
  }
}

// Criar evento no Google Calendar
export const criarEventoCalendario = async (
  nome: string,
  telefone: string,
  servico: string,
  data: string,
  horario: string,
  preco?: string
): Promise<{ success: boolean; eventId?: string; error?: string }> => {
  const config = getGoogleCalendarConfig()
  
  if (!config) {
    console.log('⚠️ Google Calendar não configurado, pulando criação de evento')
    return { success: false, error: 'Google Calendar não configurado' }
  }

  try {
    // Converter data e horário para formato ISO 8601
    const [ano, mes, dia] = data.split('-').map(Number)
    const [hora, minuto] = horario.split(':').map(Number)
    
    const dataInicio = new Date(ano, mes - 1, dia, hora, minuto)
    const dataFim = new Date(dataInicio.getTime() + 60 * 60 * 1000) // 1 hora de duração padrão
    
    const inicioISO = dataInicio.toISOString()
    const fimISO = dataFim.toISOString()
    
    // Criar descrição do evento
    const descricao = `Cliente: ${nome}\nTelefone: ${telefone}\nServiço: ${servico}${preco ? `\nPreço: ${preco}` : ''}`
    
    // Criar evento
    const evento = {
      summary: `Agendamento: ${servico} - ${nome}`,
      description: descricao,
      start: {
        dateTime: inicioISO,
        timeZone: 'America/Sao_Paulo'
      },
      end: {
        dateTime: fimISO,
        timeZone: 'America/Sao_Paulo'
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 30 }, // Lembrete 30 minutos antes
          { method: 'email', minutes: 1440 } // Email 1 dia antes
        ]
      }
    }
    
    // Fazer requisição para API do Google Calendar
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(config.calendarId)}/events`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(evento)
      }
    )
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('❌ Erro ao criar evento no Google Calendar:', errorData)
      
      // Se o token expirou, limpar configuração
      if (response.status === 401) {
        localStorage.removeItem('google_calendar_access_token')
        return { 
          success: false, 
          error: 'Token de acesso expirado. Por favor, reconfigure o Google Calendar.' 
        }
      }
      
      return { 
        success: false, 
        error: `Erro ao criar evento: ${errorData.error?.message || response.statusText}` 
      }
    }
    
    const eventData = await response.json()
    console.log('✅ Evento criado no Google Calendar:', eventData.id)
    
    return { 
      success: true, 
      eventId: eventData.id 
    }
  } catch (error) {
    console.error('❌ Erro ao criar evento no Google Calendar:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    }
  }
}

// Obter URL de autorização OAuth do Google
export const obterUrlAutorizacao = (clientId: string, redirectUri: string): string => {
  const scopes = [
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/calendar.readonly'
  ].join(' ')
  
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: scopes,
    access_type: 'offline',
    prompt: 'consent'
  })
  
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
}

// Trocar código de autorização por token de acesso
export const trocarCodigoPorToken = async (
  code: string,
  clientId: string,
  clientSecret: string,
  redirectUri: string
): Promise<{ access_token?: string; refresh_token?: string; error?: string }> => {
  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return { error: errorData.error_description || 'Erro ao obter token' }
    }
    
    const data = await response.json()
    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token
    }
  } catch (error) {
    console.error('❌ Erro ao trocar código por token:', error)
    return { error: error instanceof Error ? error.message : 'Erro desconhecido' }
  }
}

// Renovar token de acesso usando refresh token
export const renovarToken = async (
  refreshToken: string,
  clientId: string,
  clientSecret: string
): Promise<{ access_token?: string; error?: string }> => {
  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token'
      })
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return { error: errorData.error_description || 'Erro ao renovar token' }
    }
    
    const data = await response.json()
    return {
      access_token: data.access_token
    }
  } catch (error) {
    console.error('❌ Erro ao renovar token:', error)
    return { error: error instanceof Error ? error.message : 'Erro desconhecido' }
  }
}






