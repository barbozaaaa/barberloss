import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Barbeiro from './Barbeiro.tsx'

function Root() {
  const [isBarbeiroPage, setIsBarbeiroPage] = useState(
    window.location.hash === '#barbeiro' || window.location.pathname.includes('barbeiro')
  )

  useEffect(() => {
    const handleHashChange = () => {
      setIsBarbeiroPage(
        window.location.hash === '#barbeiro' || window.location.pathname.includes('barbeiro')
      )
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
  <StrictMode>
      {isBarbeiroPage ? <Barbeiro /> : <App />}
    </StrictMode>
)
}

createRoot(document.getElementById('root')!).render(<Root />)
