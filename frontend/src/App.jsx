import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import FileUploadDialog from './components/FileUploadDialog'
import DocumentsList from './components/DocumentsList'
import Chat from './components/Chat/Chat'
import { useApp } from './context/AppContext'

function App() {
  const { 
    uploadedFile, 
    isUploadOpen, 
    handleUploadClick, 
    handleUploadClose, 
    handleUploadSuccess,
    isLoading 
  } = useApp()
  
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box sx={{ height: '100vh', bgcolor: 'background.primary' }}>
      <Navbar 
        uploadedFile={uploadedFile}
        onUploadClick={handleUploadClick}
        isMobile={isMobile}
      />

      <Box sx={{ p: 3, height:'100vh' }}>
        <Routes>
          <Route path="/" element={<DocumentsList />} />
          <Route path="/chat/:id" element={<Chat />} />
        </Routes>
      </Box>

      <FileUploadDialog 
        open={isUploadOpen} 
        onClose={handleUploadClose}
        onUploadSuccess={handleUploadSuccess}
      />
    </Box>
  )
}

export default App
