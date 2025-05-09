import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import Navbar from './components/Navbar'
import FileUploadDialog from './components/FileUploadDialog'
import { useApp } from './context/AppContext'

function App() {
  const { 
    uploadedFile, 
    isUploadOpen, 
    handleUploadClick, 
    handleUploadClose, 
    handleUploadSuccess 
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

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100% - 64px)',
          p: 3
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to PDF Chat
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          Upload your PDF documents and start chatting with them
        </Typography>
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
