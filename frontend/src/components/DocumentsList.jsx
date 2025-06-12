import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, CircularProgress, Paper } from '@mui/material'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const DocumentsList = () => {
  const { documents, isLoading, error } = useApp()
  const navigate = useNavigate()

  const renderContent = () => {
    if (isLoading) {
      return <CircularProgress />
    }

    if (error) {
      return <Typography color="error">{error}</Typography>
    }

    if (!documents.length) {
      return (
        <Typography color="text.secondary">
          No documents uploaded yet
        </Typography>
      )
    }

    return (
      <List sx={{width:'100%'}}>
        {documents.map((doc) => (
          <ListItem 
            key={doc.id}
            button
            onClick={() => navigate(`/chat/${doc.id}`)}
            sx={{
              mb: 1,
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: 'action.hover',
                transform: 'translateY(-2px)',
                boxShadow: 1
              }
            }}
          >
            <ListItemIcon>
              <InsertDriveFileIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={doc.filename}
              secondary={new Date(doc.added_at).toLocaleDateString()}
              
            />
          </ListItem>
        ))}
      </List>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        p: { xs: 2, sm: 3 }
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: '600px', md: '800px' },
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Typography 
          variant="h5" 
          component="h1"
          sx={{ 
            fontWeight: 500,
            color: 'text.primary',
            mb: 2
          }}
        >
          Your Documents
        </Typography>
        {renderContent()}
      </Paper>
    </Box>
  )
}

export default DocumentsList