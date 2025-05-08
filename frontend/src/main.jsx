import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider , createTheme} from '@mui/material/styles'

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
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
