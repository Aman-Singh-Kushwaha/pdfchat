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
    // Added Intial UserQuery to UI
    const tempId = crypto.randomUUID()
    const userMessage = { id: tempId, query}
    setMessages(prev => [...prev, userMessage])
    try {
      setIsLoading(true)
      const aiResponse = await sendChatMessage(id, query)

      setMessages(prev => prev.map(msg => 
        msg.id === tempId ? 
          { ...msg, id: aiResponse.id, response: aiResponse.response }  // Updatig temp message with real ID
          : msg
      )) 
    } catch (error) {
      console.error('Failed to send message:', error)
      setMessages(prev => prev.map(msg => msg.id === tempId) ?
        {...msg, response: `Error: ${error.message || 'Failed to get response'}`}
        : msg
      )
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
          <div key={msg.id}>
            <ChatMessage content={msg.query} isUser={true}/>
            <ChatMessage content={msg.response} />
          </div>
        ))}
      </Box>
      <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
    </Box>
  )
}

export default Chat