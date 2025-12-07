import { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

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
  justify-content: space-between;
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
`

const HeaderCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
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
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: linear-gradient(120deg, #f97316, #facc15);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (min-width: 480px) {
    font-size: 18px;
    letter-spacing: 0.16em;
  }
`

const BrandSubtitle = styled.span`
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #9ca3af;
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const OutlineChip = styled.div`
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.65);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #e5e7eb;
  display: none;

  @media (min-width: 768px) {
    display: inline-flex;
  }
`

const Layout = styled.main`
  display: grid;
  grid-template-columns: minmax(0, 1.3fr);
  gap: 40px;
  margin-top: 32px;

  @media (min-width: 960px) {
    grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
    gap: 52px;
    align-items: start;
  }
`

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  gap: 28px;
`

const HeroTitle = styled.h1`
  font-size: clamp(2.4rem, 4vw, 3.1rem);
  line-height: 1.05;
  letter-spacing: -0.05em;
  color: #f9fafb;
`

const GradientAccent = styled.span`
  background: linear-gradient(120deg, #f97316, #facc15);
  -webkit-background-clip: text;
  color: transparent;
`

const HeroDescription = styled.p`
  margin-top: 8px;
  max-width: 520px;
  font-size: 15px;
  line-height: 1.7;
  color: #9ca3af;
`

const HeroBadgesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
`

const Badge = styled.span`
  padding: 5px 11px;
  border-radius: 999px;
  border: 1px solid rgba(55, 65, 81, 0.9);
  background: radial-gradient(circle at 0 0, rgba(248, 250, 252, 0.18), transparent);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #e5e7eb;
`

const HeroFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  margin-top: 6px;
`

const HeroNote = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
  color: #9ca3af;
`

const HeroNoteStrong = styled.span`
  color: #e5e7eb;
  font-weight: 500;
`

const HeroMetrics = styled.div`
  display: flex;
  gap: 16px;
`

const Metric = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const MetricValue = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #f9fafb;
`

const MetricLabel = styled.span`
  font-size: 11px;
  color: #9ca3af;
`

const ServicesSection = styled.section`
  margin-top: 24px;
`

const SectionLabel = styled.div`
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #6b7280;
  margin-bottom: 10px;
`

const SectionTitleRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
`

const SectionTitle = styled.h2`
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #e5e7eb;
`

const SectionSubtitle = styled.p`
  font-size: 13px;
  color: #9ca3af;
`

const ServicesCarousel = styled.div`
  position: relative;
  overflow: hidden;
  padding: 0;

  @media (max-width: 480px) {
    padding: 0;
  }
`

const ServicesGrid = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 8px 0;
  scroll-snap-type: x mandatory;
  align-items: flex-start;

  &::-webkit-scrollbar {
    display: none;
  }
`

const ServiceCardWrapper = styled.div`
  flex-shrink: 0;
  width: 280px;
  height: 100%;
  display: flex;
  scroll-snap-align: start;

  @media (max-width: 480px) {
    width: 260px;
  }

  @media (max-width: 360px) {
    width: 240px;
  }
`

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(251, 191, 36, 0.4);
  background: rgba(15, 23, 42, 0.95);
  color: #fbbf24;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  transition: all 150ms ease;

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    font-size: 16px;
  }

  &:hover {
    background: rgba(15, 23, 42, 1);
    border-color: rgba(251, 191, 36, 0.7);
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`

const CarouselButtonLeft = styled(CarouselButton)`
  left: 0;
`

const CarouselButtonRight = styled(CarouselButton)`
  right: 0;
`

const ServiceCard = styled.button<{ active?: boolean }>`
  position: relative;
  border-radius: 16px;
  padding: 12px;
  text-align: left;
  cursor: pointer;
  border: 1px solid
    ${({ active }) =>
      active ? 'rgba(251, 191, 36, 0.9)' : 'rgba(55, 65, 81, 0.9)'};
  background:
    radial-gradient(circle at 0 0, rgba(248, 250, 252, 0.18), transparent 55%),
    radial-gradient(circle at 100% 0, rgba(251, 191, 36, 0.16), transparent 55%),
    rgba(15, 23, 42, 0.96);
  box-shadow:
    ${({ active }) =>
      active
        ? '0 18px 45px rgba(15, 23, 42, 0.9)'
        : '0 10px 30px rgba(15, 23, 42, 0.85)'};
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  min-height: 140px;
  transition:
    transform 150ms ease,
    box-shadow 150ms ease,
    border-color 150ms ease,
    background 150ms ease;

  @media (max-width: 480px) {
    padding: 10px;
    gap: 8px;
    min-height: 130px;
    border-radius: 14px;
  }

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(251, 191, 36, 0.9);
    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.95);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.9);
  }
`

const ServiceThumb = styled.div<{ imagem: string }>`
  width: 70px;
  height: 70px;
  border-radius: 16px;
  background-image: url(${({ imagem }) => imagem});
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.9);

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    border-radius: 12px;
  }
`

const ServiceContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  height: 100%;
  justify-content: space-between;
  overflow: hidden;

  @media (max-width: 480px) {
    gap: 3px;
  }
`

const ServiceTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: baseline;
`

const ServiceName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #f9fafb;
  word-break: break-word;
  line-height: 1.3;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`

const ServiceTag = styled.span`
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #fbbf24;
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: 480px) {
    font-size: 8px;
    letter-spacing: 0.08em;
  }
`

const ServiceDescription = styled.p`
  font-size: 10px;
  color: #9ca3af;
  line-height: 1.4;
  overflow: visible;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 480px) {
    font-size: 9px;
    line-height: 1.35;
    -webkit-line-clamp: 2;
  }
`

const ServiceMetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
`

const ServiceMeta = styled.span`
  font-size: 11px;
  color: #6b7280;
`

const ServicePrice = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #fbbf24;
`

const FormCard = styled.section`
  position: relative;
  border-radius: 20px;
  padding: 16px;
  background:
    radial-gradient(circle at 0 0, rgba(251, 191, 36, 0.25), transparent 55%),
    radial-gradient(circle at 100% 100%, rgba(37, 99, 235, 0.3), transparent 60%),
    linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.98));
  box-shadow:
    0 22px 60px rgba(15, 23, 42, 0.95),
    0 0 0 1px rgba(15, 23, 42, 0.9);
  overflow: hidden;

  @media (min-width: 480px) {
    padding: 18px 18px 20px;
    border-radius: 22px;
  }

  @media (min-width: 960px) {
    margin-top: 8px;
  }
`

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
`

const FormTitle = styled.h2`
  font-size: 15px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #e5e7eb;
`

const FormHeaderChip = styled.span`
  font-size: 11px;
  color: #e5e7eb;
  opacity: 0.8;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 6px;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #9ca3af;
`

const Input = styled.input`
  width: 100%;
  padding: 9px 11px;
  border-radius: 11px;
  border: 1px solid rgba(55, 65, 81, 0.9);
  background: rgba(15, 23, 42, 0.96);
  color: #f9fafb;
  font-size: 13px;
  outline: none;
  transition:
    border-color 140ms ease,
    box-shadow 140ms ease,
    background 140ms ease;

  &:focus {
    border-color: rgba(251, 191, 36, 0.95);
    box-shadow: 0 0 0 1px rgba(251, 191, 36, 0.9);
    background: rgba(15, 23, 42, 0.98);
  }

  &::placeholder {
    color: #6b7280;
  }
`

const StepHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 4px;
  margin-bottom: 8px;
  gap: 8px;
`

const StepTitle = styled.span`
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #9ca3af;
`

const StepHint = styled.span`
  font-size: 11px;
  color: #6b7280;
`

const StepBackButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  font-size: 11px;
  color: #e5e7eb;
  text-decoration: underline;
  cursor: pointer;
`

const DateCarousel = styled.div`
  position: relative;
  overflow: hidden;
  padding: 0 35px;

  @media (max-width: 480px) {
    padding: 0 30px;
  }
`

const DateGrid = styled.div`
  display: flex;
  gap: 8px;
  overflow: hidden;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const DateCardWrapper = styled.div`
  flex-shrink: 0;
  width: calc((100% - 32px) / 5);
  min-width: 0;

  @media (max-width: 480px) {
    width: calc((100% - 24px) / 5);
    min-width: 60px;
  }
`

const DateCard = styled.button<{ active?: boolean }>`
  width: 100%;
  border-radius: 12px;
  padding: 6px 7px;
  border: 1px solid
    ${({ active }) =>
      active ? 'rgba(251, 191, 36, 0.95)' : 'rgba(55, 65, 81, 0.9)'};
  background: rgba(15, 23, 42, 0.96);
  color: #e5e7eb;
  font-size: 11px;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 2px;
  transition:
    border-color 140ms ease,
    background 140ms ease,
    transform 140ms ease,
    box-shadow 140ms ease;
  word-break: break-word;

  @media (max-width: 480px) {
    padding: 5px 6px;
    font-size: 10px;
    border-radius: 10px;
  }

  &:hover {
    border-color: rgba(251, 191, 36, 0.95);
    transform: translateY(-1px);
    box-shadow: 0 14px 32px rgba(15, 23, 42, 0.9);
  }
`

const DateLabel = styled.span`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #9ca3af;
  word-break: break-word;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 9px;
    letter-spacing: 0.08em;
  }
`

const DateSubLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #f9fafb;
  word-break: break-word;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 11px;
  }
`

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

const TimeCard = styled.button<{ active?: boolean }>`
  border-radius: 999px;
  padding: 7px 8px;
  border: 1px solid
    ${({ active }) =>
      active ? 'rgba(34, 197, 94, 0.95)' : 'rgba(55, 65, 81, 0.9)'};
  background: rgba(15, 23, 42, 0.96);
  color: #e5e7eb;
  font-size: 12px;
  cursor: pointer;
  text-align: center;
  transition:
    border-color 140ms ease,
    background 140ms ease,
    transform 140ms ease,
    box-shadow 140ms ease;

  &:hover {
    border-color: rgba(34, 197, 94, 0.95);
    transform: translateY(-1px);
    box-shadow: 0 14px 32px rgba(15, 23, 42, 0.9);
  }
`

const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 6px;
`

const FormNote = styled.span`
  font-size: 11px;
  color: #9ca3af;
`

const SubmitButton = styled.button`
  padding: 9px 16px;
  border-radius: 999px;
  border: none;
  outline: none;
  cursor: pointer;
  background: linear-gradient(120deg, #22c55e, #bbf7d0);
  color: #052e16;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow:
    0 17px 46px rgba(22, 163, 74, 0.52),
    0 0 0 1px rgba(15, 23, 42, 0.95);
  transition:
    transform 150ms ease,
    box-shadow 150ms ease,
    filter 150ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
    box-shadow:
      0 24px 60px rgba(22, 163, 74, 0.7),
      0 0 0 1px rgba(15, 23, 42, 0.95);
  }

  &:active {
    transform: translateY(0);
    box-shadow:
      0 14px 34px rgba(22, 163, 74, 0.65),
      0 0 0 1px rgba(15, 23, 42, 0.95);
  }
`

const SubmitIcon = styled.span`
  font-size: 14px;
`

const Confirmation = styled.div`
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(6, 95, 70, 0.35);
  border: 1px solid rgba(45, 212, 191, 0.7);
  color: #ccfbf1;
  font-size: 12px;
  display: flex;
  gap: 8px;
  align-items: flex-start;
`

const ConfirmationIcon = styled.span`
  font-size: 16px;
`

const ConfirmationText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const ConfirmationBody = styled.span`
  font-size: 11px;
  color: #a5f3fc;
`

type ServicoId = 'corte' | 'progressiva' | 'hidratacao' | 'barba' | 'descoloracao' | 'corte_barba' | 'tintura' | 'alisamento' | 'luzes' | 'tratamento' | 'corte_infantil' | 'sobrancelha'

interface AgendamentoForm {
  nome: string
  telefone: string
  data: string
  horario: string
  servico: ServicoId
}

const servicos: {
  id: ServicoId
  nome: string
  tag: string
  descricao: string
  duracao: string
  preco: string
  icone: string
  imagem: string
}[] = [
  {
    id: 'corte',
    nome: 'Corte de cabelo premium',
    tag: 'Clássico + moderno',
    descricao: 'Máquina e tesoura com acabamento na navalha, alinhado ao seu estilo.',
    duracao: '~45 min',
    preco: 'R$ 55',
    icone: '✂️',
    imagem:
      'https://images.pexels.com/photos/3998419/pexels-photo-3998419.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'barba',
    nome: 'Barba desenhada',
    tag: 'Navalha quente',
    descricao:
      'Barba modelada, toalha quente e finalização com massagem facial relaxante.',
    duracao: '~30 min',
    preco: 'R$ 40',
    icone: '🧔',
    imagem:
      'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'progressiva',
    nome: 'Progressiva masculina',
    tag: 'Fio alinhado',
    descricao: 'Redução de volume e frizz com produtos profissionais para cabelo masculino.',
    duracao: '~1h30',
    preco: 'R$ 120',
    icone: '🔥',
    imagem:
      'https://images.pexels.com/photos/3998421/pexels-photo-3998421.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'hidratacao',
    nome: 'Hidratação + spa capilar',
    tag: 'Cuidado total',
    descricao:
      'Tratamento profundo com massagem no lavatório para devolver brilho e maciez.',
    duracao: '~40 min',
    preco: 'R$ 70',
    icone: '💧',
    imagem:
      'https://images.pexels.com/photos/3738341/pexels-photo-3738341.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'descoloracao',
    nome: 'Descoloração do cabelo',
    tag: 'Novo visual',
    descricao:
      'Descoloração profissional com produtos de alta qualidade para um resultado uniforme e brilhante.',
    duracao: '~2h',
    preco: 'R$ 150',
    icone: '✨',
    imagem:
      'https://images.pexels.com/photos/3998419/pexels-photo-3998419.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'corte_barba',
    nome: 'Corte + Barba',
    tag: 'Combo completo',
    descricao:
      'Corte de cabelo premium com barba desenhada. O combo perfeito para um visual impecável.',
    duracao: '~1h15',
    preco: 'R$ 85',
    icone: '💈',
    imagem:
      'https://images.pexels.com/photos/3998419/pexels-photo-3998419.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'tintura',
    nome: 'Tintura masculina',
    tag: 'Cor e estilo',
    descricao:
      'Coloração profissional com produtos específicos para cabelo masculino. Cobertura de fios brancos.',
    duracao: '~1h30',
    preco: 'R$ 90',
    icone: '🎨',
    imagem:
      'https://images.pexels.com/photos/3998421/pexels-photo-3998421.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'alisamento',
    nome: 'Alisamento masculino',
    tag: 'Fio liso',
    descricao:
      'Alisamento profissional para cabelos masculinos com produtos de alta qualidade e durabilidade.',
    duracao: '~2h',
    preco: 'R$ 130',
    icone: '🌊',
    imagem:
      'https://images.pexels.com/photos/3998421/pexels-photo-3998421.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'luzes',
    nome: 'Luzes / Mechas',
    tag: 'Destaque',
    descricao:
      'Aplicação de luzes ou mechas para dar destaque e movimento ao cabelo com técnica profissional.',
    duracao: '~2h30',
    preco: 'R$ 180',
    icone: '⭐',
    imagem:
      'https://images.pexels.com/photos/3998419/pexels-photo-3998419.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'tratamento',
    nome: 'Tratamento capilar',
    tag: 'Reparação',
    descricao:
      'Tratamento reparador para cabelos danificados, com produtos específicos para cada tipo de necessidade.',
    duracao: '~50 min',
    preco: 'R$ 80',
    icone: '💆',
    imagem:
      'https://images.pexels.com/photos/3738341/pexels-photo-3738341.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'corte_infantil',
    nome: 'Corte infantil',
    tag: 'Kids',
    descricao:
      'Corte especializado para crianças, com ambiente descontraído e profissionais experientes.',
    duracao: '~30 min',
    preco: 'R$ 35',
    icone: '👶',
    imagem:
      'https://images.pexels.com/photos/3998419/pexels-photo-3998419.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'sobrancelha',
    nome: 'Design de sobrancelha',
    tag: 'Ajuste fino',
    descricao:
      'Design e modelagem de sobrancelhas masculinas para um visual mais definido e harmonioso.',
    duracao: '~20 min',
    preco: 'R$ 25',
    icone: '👁️',
    imagem:
      'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
]

const formatarResumoData = (iso: string) => {
  if (!iso) return ''
  const [ano, mes, dia] = iso.split('-').map(Number)
  const data = new Date(ano, (mes || 1) - 1, dia || 1)
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  })
}

const criarProximosDias = (quantidade: number) => {
  const hoje = new Date()
  return Array.from({ length: quantidade }, (_, index) => {
    const data = new Date(hoje)
    data.setDate(hoje.getDate() + index)
    return data
  })
}

// Generate all hours from 9 AM to 8 PM (9:00 to 20:00)
const horariosPadrao = Array.from({ length: 12 }, (_, i) => {
  const hora = 9 + i
  return `${hora.toString().padStart(2, '0')}:00`
})

function App() {
  const [selecionado, setSelecionado] = useState<ServicoId>('corte')
  const [form, setForm] = useState<AgendamentoForm>({
    nome: '',
    telefone: '',
    data: '',
    horario: '',
    servico: 'corte',
  })
  const [mensagem, setMensagem] = useState('')
  const [etapaHorario, setEtapaHorario] = useState<'data' | 'hora'>('data')
  const [dataScrollIndex, setDataScrollIndex] = useState(0)
  const [agendamentosExistentes, setAgendamentosExistentes] = useState<Array<{data: string, horario: string}>>([])

  // Load existing appointments to filter booked times
  useEffect(() => {
    const carregarAgendamentos = async () => {
      try {
        const { buscarAgendamentos } = await import('./agendamentosService')
        const ags = await buscarAgendamentos()
        setAgendamentosExistentes(
          ags
            .filter(ag => !ag.finalizado)
            .map(ag => ({ data: ag.data, horario: ag.horario }))
        )
      } catch (error) {
        console.error('Erro ao carregar agendamentos:', error)
      }
    }
    carregarAgendamentos()
    // Refresh every 5 seconds to get latest bookings
    const interval = setInterval(carregarAgendamentos, 5000)
    return () => clearInterval(interval)
  }, [])

  // Get available times for selected date (exclude booked times)
  const getHorariosDisponiveis = () => {
    if (!form.data) return horariosPadrao
    
    const horariosOcupados = agendamentosExistentes
      .filter(ag => ag.data === form.data)
      .map(ag => ag.horario)
    
    return horariosPadrao.filter(hora => !horariosOcupados.includes(hora))
  }

  const handleSelectServico = (id: ServicoId) => {
    setSelecionado(id)
    setForm((prev) => ({ ...prev, servico: id }))
  }

  const handleSelectHorario = (hora: string) => {
    // Clear previous selection immediately and set new one
    setForm((prev) => {
      // If clicking the same hour, deselect it
      if (prev.horario === hora) {
        return { ...prev, horario: '' }
      }
      // Otherwise, select the new hour
      return { ...prev, horario: hora }
    })
  }

  const handleTrocarData = () => {
    setForm((prev) => ({ ...prev, horario: '' }))
    setEtapaHorario('data')
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nome || !form.telefone || !form.data || !form.horario) {
      setMensagem('Preencha todos os campos para confirmar seu horário.')
      return
    }

    const servicoInfo = servicos.find((s) => s.id === form.servico)
    const mensagemWhatsApp = `Olá! Gostaria de agendar um horário:\n\n` +
      `*Nome:* ${form.nome}\n` +
      `*WhatsApp:* ${form.telefone}\n` +
      `*Serviço:* ${servicoInfo?.nome}\n` +
      `*Data:* ${formatarResumoData(form.data)}\n` +
      `*Horário:* ${form.horario}\n\n` +
      `Aguardo confirmação!`

    const numeroWhatsApp = '11954498722'
    const urlWhatsApp = `https://wa.me/55${numeroWhatsApp}?text=${encodeURIComponent(mensagemWhatsApp)}`
    
    // Salvar agendamento usando o serviço
    try {
      const { salvarAgendamento } = await import('./agendamentosService')
      await salvarAgendamento({
        nome: form.nome,
        telefone: form.telefone,
        data: form.data,
        horario: form.horario,
        servico: form.servico,
        preco: servicoInfo?.preco || 'R$ 0',
      })
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error)
    }
    
    // Limpar formulário
    setForm({
      nome: '',
      telefone: '',
      data: '',
      horario: '',
      servico: 'corte',
    })
    setEtapaHorario('data')
    setSelecionado('corte')
    setMensagem('')
    
    // Open WhatsApp immediately
    window.location.href = urlWhatsApp
  }

  return (
    <>
      <GlobalStyle />
      <Page>
        <Shell>
          <Header>
            <div></div>

            <HeaderCenter>
              <LogoText>
                <BrandName>Barber Loss</BrandName>
                <BrandSubtitle>cuidando da sua auto estima</BrandSubtitle>
              </LogoText>
            </HeaderCenter>

            <HeaderActions>
              <OutlineChip>Terça a sábado · 09h às 20h</OutlineChip>
            </HeaderActions>
          </Header>

          <Layout>
            <Hero>
              <div>
                <HeroTitle>
                  Seu corte de confiança,
                  <br />
                  <GradientAccent>no horário certo.</GradientAccent>
                </HeroTitle>
                <HeroDescription>
                  Agende corte, progressiva, hidratação ou barba em poucos cliques.
                  Atendimento pontual, ambiente climatizado e aquele papo de barbeiro
                  que faz o tempo passar voando.
                </HeroDescription>

                <HeroBadgesRow>
                  <Badge>Agenda online em segundos</Badge>
                  <Badge>Profissionais especialistas</Badge>
                  <Badge>Produtos de alta qualidade</Badge>
                  <Badge>Barba, cabelo &amp; cuidado</Badge>
                </HeroBadgesRow>
              </div>

              <HeroFooter>
                <HeroNote>
                  <HeroNoteStrong>Sem fila e sem estresse.</HeroNoteStrong>
                  <span>Escolha o serviço, data e horário. Nós cuidamos do resto.</span>
                </HeroNote>

                <HeroMetrics>
                  <Metric>
                    <MetricValue>+1.200</MetricValue>
                    <MetricLabel>Clientes atendidos</MetricLabel>
                  </Metric>
                </HeroMetrics>
              </HeroFooter>

              <ServicesSection>
                <SectionLabel>Serviços principais</SectionLabel>

                <SectionTitleRow>
                  <SectionTitle>Escolha o seu combo</SectionTitle>
                  <SectionSubtitle>
                    Todos os serviços incluem finalização com produtos profissionais.
                  </SectionSubtitle>
                </SectionTitleRow>

                <ServicesCarousel>
                  <ServicesGrid id="servicos-grid">
                    {servicos.map((servico) => (
                      <ServiceCardWrapper key={servico.id}>
                        <ServiceCard
                          type="button"
                          active={selecionado === servico.id}
                          onClick={() => handleSelectServico(servico.id)}
                        >
                          <ServiceThumb imagem={servico.imagem} />
                          <ServiceContent>
                            <ServiceTitleRow>
                              <ServiceName>{servico.nome}</ServiceName>
                              <ServiceTag>{servico.tag}</ServiceTag>
                            </ServiceTitleRow>
                            <ServiceDescription>{servico.descricao}</ServiceDescription>
                            <ServiceMetaRow>
                              <ServiceMeta>{servico.duracao}</ServiceMeta>
                              <ServicePrice>{servico.preco}</ServicePrice>
                            </ServiceMetaRow>
                          </ServiceContent>
                        </ServiceCard>
                      </ServiceCardWrapper>
                    ))}
                  </ServicesGrid>
                </ServicesCarousel>
              </ServicesSection>
            </Hero>

            <FormCard id="agendamento">
              <FormHeader>
                <FormTitle>Agende seu horário</FormTitle>
                <FormHeaderChip>Leva menos de 1 minuto</FormHeaderChip>
              </FormHeader>

              <Form onSubmit={handleSubmit}>
                <Label>
                  Nome completo
                  <Input
                    name="nome"
                    placeholder="Como devemos te chamar na recepção?"
                    value={form.nome}
                    onChange={handleChange}
                  />
                </Label>

                <Label>
                  WhatsApp
                  <Input
                    name="telefone"
                    placeholder="(11) 95449-8722"
                    value={form.telefone}
                    onChange={handleChange}
                  />
                </Label>

                <div>
                  <StepHeader>
                    <StepTitle>Escolha a data e o horário</StepTitle>
                    {etapaHorario === 'data' ? (
                      <StepHint>Clique em uma data para continuar</StepHint>
                    ) : (
                      <StepBackButton type="button" onClick={handleTrocarData}>
                        Trocar data
                      </StepBackButton>
                    )}
                  </StepHeader>

                  {etapaHorario === 'data' ? (
                    <DateCarousel>
                      <CarouselButtonLeft
                        type="button"
                        onClick={() => {
                          if (dataScrollIndex > 0) {
                            setDataScrollIndex(dataScrollIndex - 1)
                          }
                        }}
                        disabled={dataScrollIndex === 0}
                      >
                        ‹
                      </CarouselButtonLeft>
                      <DateGrid id="datas-grid">
                        {criarProximosDias(20)
                          .slice(dataScrollIndex * 5, (dataScrollIndex + 1) * 5)
                          .map((data) => {
                            const iso = data.toISOString().slice(0, 10)
                            const weekday = data
                              .toLocaleDateString('pt-BR', { weekday: 'short' })
                              .replace('.', '')
                            const dayMonth = data
                              .toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'short',
                              })
                              .replace('.', '')

                            return (
                              <DateCardWrapper key={iso}>
                                <DateCard
                                  type="button"
                                  active={form.data === iso}
                                  onClick={() => {
                                    setForm((prev) => ({ ...prev, data: iso }))
                                    setEtapaHorario('hora')
                                  }}
                                >
                                  <DateLabel>{weekday}</DateLabel>
                                  <DateSubLabel>{dayMonth}</DateSubLabel>
                                </DateCard>
                              </DateCardWrapper>
                            )
                          })}
                      </DateGrid>
                      <CarouselButtonRight
                        type="button"
                        onClick={() => {
                          const totalDias = 20
                          const totalGrupos = Math.ceil(totalDias / 5)
                          if (dataScrollIndex < totalGrupos - 1) {
                            setDataScrollIndex(dataScrollIndex + 1)
                          }
                        }}
                        disabled={dataScrollIndex >= Math.ceil(20 / 5) - 1}
                      >
                        ›
                      </CarouselButtonRight>
                    </DateCarousel>
                  ) : (
                    <TimeGrid>
                      {getHorariosDisponiveis().length > 0 ? (
                        getHorariosDisponiveis().map((hora) => (
                          <TimeCard
                            key={hora}
                            type="button"
                            active={form.horario === hora}
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              handleSelectHorario(hora)
                            }}
                          >
                            {hora}
                          </TimeCard>
                        ))
                      ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#9ca3af', padding: '20px', fontSize: '13px' }}>
                          Todos os horários estão ocupados para esta data. Por favor, escolha outra data.
                        </div>
                      )}
                    </TimeGrid>
                  )}
                </div>

                <FormFooter>
                  <FormNote>
                    Confirmaremos seu horário pelo WhatsApp (11) 95449-8722 em poucos minutos.
                  </FormNote>
                  <SubmitButton type="submit">
                    <SubmitIcon>↗</SubmitIcon>
                    Reservar
                  </SubmitButton>
                </FormFooter>
              </Form>

              {mensagem && (
                <Confirmation>
                  <ConfirmationIcon>⚠️</ConfirmationIcon>
                  <ConfirmationText>
                    <ConfirmationBody>{mensagem}</ConfirmationBody>
                  </ConfirmationText>
                </Confirmation>
              )}
            </FormCard>
          </Layout>
        </Shell>
      </Page>
    </>
  )
}

export default App
