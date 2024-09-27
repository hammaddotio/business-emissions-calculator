import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import CalculatorContextProvider from './Context/CalculatorContextApi.jsx'
// import CalculatorContextProvider from './Context/CalculatorContextApi.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Provider store={store}> */}
    <CalculatorContextProvider>
      <App />
    </CalculatorContextProvider>
    {/* </Provider> */}
  </StrictMode>,
)
