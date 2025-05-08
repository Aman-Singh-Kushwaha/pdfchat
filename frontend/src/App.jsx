import { useState, useEffect } from 'react'
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Button, 
  Typography,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import FileUploadDialog from './components/FileUploadDialog'
import aiPlanetLogo from './assets/aiplanet_logo.png'
import './App.css'

function App() {
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleUploadClick = () => {
    setIsUploadOpen(true)
  }

  const handleUploadClose = () => {
    setIsUploadOpen(false)
  }

  // Mock file upload success - replace with actual upload logic
  const handleUploadSuccess = (file) => {
    setUploadedFile(file)
    setIsUploadOpen(false)
  }

  return (
    <Box sx={{ height: '100vh', bgcolor: 'background.primary' }}>
      <AppBar position="static" color="transparent" elevation={1}
        sx={{ 
          borderBottom: '1px solid #e0e0e0',
          bgcolor: 'white' 
        }}
      >
        <Toolbar sx={{ 
          justifyContent: 'space-between',
          minHeight: { xs: '56px', sm: '64px' },
          px: { xs: 2, sm: 3 }
        }}>
          {/* Logo */}
          <img 
            src={aiPlanetLogo} 
            alt="AI Planet Logo" 
            style={{ 
              height: isMobile ? '24px' : '32px',
              objectFit: 'contain'
            }} 
          />

          {/* Upload Button and File Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {uploadedFile && (
              <Paper
                elevation={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 1,
                }}
              >
                <InsertDriveFileIcon 
                  sx={{ 
                    color: 'text.secondary',
                    p: '2px',
                    borderRadius: '3px',
                    border: '1px solid ',
                    borderColor:'#0FA95870' 
                  }} 
                />
                <Typography 
                  sx={{ 
                    color: 'text.secondary',
                    display: { xs: 'none', sm: 'block' }
                  }}
                >
                  {uploadedFile.name}
                </Typography>
              </Paper>
            )}
            
            <Button
              variant="outlined"
              startIcon={!isMobile && <AddCircleOutlineIcon />}
              onClick={handleUploadClick}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                px: isMobile ? 1 : 3,
                color: 'text.primary',
                borderColor: 'text.primary',
                '&:hover': {
                  color: 'text.secondary',
                  borderColor: 'text.secondary',
                }
              }}
            >
              {isMobile ? <AddCircleOutlineIcon /> : 'Upload PDF'}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Rest of your content */}
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
