import { Box, Avatar } from '@mui/material'
import pdfChat_logo from '../../assets/pdfChat_logo.png'
import ChatLoaderAnimation from '../../assets/chat_loader.gif'

const ChatMessage = ({ 
  content = null, 
  isUser = false
}) => {
  return (
    <Box sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'flex-start',
      }}
    >
      <Avatar
        src={isUser ? null : pdfChat_logo}
        sx={{ 
          width: 32, 
          height: 32,
          bgcolor: isUser ? 'primary.light' : 'transparent'
        }}
      >
        {isUser ? 'U' : null}
      </Avatar>
      {content ? (
        <Box sx={{
            maxWidth: '80%', 
            p: 1,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}
        >
          {content}
        </Box>
      ) : (
        <img src={ChatLoaderAnimation} alt="Loading..." style={{ maxHeight: '32px' }} />
      )}
    </Box>
  )
}

export default ChatMessage