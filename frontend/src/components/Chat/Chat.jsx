import { useState, useEffect } from 'react'
import { Box, useTheme, useMediaQuery } from '@mui/material'
import { useParams } from 'react-router-dom'
import { getChatHistory, sendChatMessage } from '../../services/api'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'

const Chat = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setIsLoading(true)
        const history = await getChatHistory(id)
        setMessages(history)
      } catch (error) {
        console.error('Failed to load chat history:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadHistory()
  }, [id])

  const handleSendMessage = async (query) => {
    try {
      setIsLoading(true)
      const response = await sendChatMessage(id, query)
      setMessages(prev => [...prev, response])
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        maxWidth: isMobile ? '100%' : '800px',
        mx: 'auto'
      }}
    >
      <Box 
        sx={{ 
          flexGrow: 1, 
          overflowY: 'auto',
          p: { xs: 2, sm: 3 },
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          minHeight: 0, // Important for proper flex behavior
          justifyContent: messages.length === 0 ? 'flex-end' : 'flex-start'
        }}
      >
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            content={msg.query || msg.response}
            isUser={Boolean(msg.query)}
          />
        ))}
      </Box>
      <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
    </Box>
  )
}

export default Chat