import { Box, Avatar } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import aiPlanetAvatar from '../../assets/aiplanet_avatar.png'

const ChatMessage = ({ content, isUser }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'flex-start',
      }}
    >
      <Avatar
        src={isUser ? null : aiPlanetAvatar}
        sx={{ 
          width: 32, 
          height: 32,
          bgcolor: isUser ? 'primary.light' : 'transparent'
        }}
      >
        {isUser ? 'U' : null}
      </Avatar>
      <Box
        sx={{
          maxWidth: '80%',
          p: 2,
          bgcolor: isUser ? 'grey.100' : 'white',
          borderRadius: 2,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}
      >
        {content}
      </Box>
    </Box>
  )
}

export default ChatMessage