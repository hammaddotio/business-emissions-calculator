import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CalculatorContextProvider from './Context/CalculatorContextApi.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CalculatorContextProvider>
      <App />
    </CalculatorContextProvider>
  </StrictMode>,
)
