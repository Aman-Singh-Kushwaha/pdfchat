import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider , createTheme} from '@mui/material/styles'
import { AppProvider } from './context/AppContext.jsx'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

const theme = createTheme({
  palette: {
    text: {
      primary: '#000',
      secondary: '#0FA958',
    },
    background: {
      primary: '#fff',
      secondary: '#ccc'
    }
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <App />
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
