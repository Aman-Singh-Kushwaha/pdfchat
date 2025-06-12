import { Box, AppBar, Toolbar, Button, Typography, Paper, useMediaQuery, useTheme } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import pdfChat_Banner from '../assets/pdfChat_banner.png'

const Navbar = ({ uploadedFile, onUploadClick, isMobile }) => {
  const truncateFilename = (filename, maxLength = 20) => {
    if (filename.length <= maxLength) return filename
    
    const extension = filename.split('.').pop()
    const nameWithoutExt = filename.slice(0, -(extension.length + 1))
    const truncated = nameWithoutExt.slice(0, maxLength - 3) + '...' + extension
    return truncated
  }

  return (
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={1}
      sx={{ 
        bgcolor: 'background.primary' 
      }}
    >
      <Toolbar sx={{ 
        justifyContent: 'space-between',
        minHeight: { xs: '71px', sm: '77px' },
        px: { xs: 2, sm: 3 }
      }}>
        <img 
          src={pdfChat_Banner} 
          alt="PDF Chat Banner" 
          style={{ 
            height: isMobile ? '41px' : '44px',
            objectFit: 'contain'
          }} 
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
                  border: '1px solid',
                  borderColor: '#0FA95870' 
                }} 
              />
              <Typography 
                sx={{ 
                  color: 'text.secondary',
                  display: { sm: 'block' }
                }}
              >
                {isMobile ? truncateFilename(uploadedFile.name) : uploadedFile.name}
              </Typography>
            </Paper>
          )}
          
          <Button
            variant="outlined"
            startIcon={!isMobile && <AddCircleOutlineIcon />}
            onClick={onUploadClick}
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
  )
}

export default Navbar