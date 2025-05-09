import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, CircularProgress } from '@mui/material'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const DocumentsList = () => {
  const { documents, isLoading, error } = useApp()
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    )
  }

  if (!documents.length) {
    return (
      <Typography align="center" color="text.secondary">
        No documents uploaded yet
      </Typography>
    )
  }

  return (
    <List>
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
            '&:hover': {
              bgcolor: 'action.hover'
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

export default DocumentsList