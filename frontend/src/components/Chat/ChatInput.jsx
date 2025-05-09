import { useState } from 'react'
import { Box, TextField, IconButton, useTheme, useMediaQuery } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const ChatInput = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    onSend(input)
    setInput('')
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        position: 'sticky',
        bottom: 0,
        p: { xs: 2, sm: 3 },
        pt: { xs: 1, sm: 2 },
        maxWidth: isMobile ? '100%' : '800px',
        mx: 'auto',
        width: '100%'
      }}
    >
      <Box 
        sx={{ 
          display: 'flex',
          gap: 1,
          position: 'relative',
          maxWidth: isMobile ? '100%' : '700px',
          mx: 'auto'
        }}
        >
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message..."
          disabled={isLoading}
          variant="outlined"
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderColor:'#E4E8EE',
              borderRadius: '8px',
              pr: '48px', // Space for the send button
              bgcolor: '#E4E8EE59',
            }
          }}
        />
        <IconButton 
          type="submit" 
          disabled={!input.trim() || isLoading}
          color="primary"
          sx={{ 
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            p: 1
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ChatInput