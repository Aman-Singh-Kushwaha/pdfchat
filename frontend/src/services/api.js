const API_BASE_URL = `${import.meta.env.VITE_BACKEND_APP}/api/v1`
 
export const fetchDocuments = async () => {
  const response = await fetch(`${API_BASE_URL}/documents`)
  if (!response.ok) throw new Error('Failed to fetch documents')
  return response.json()
}

export const uploadDocument = async (file) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_BASE_URL}/documents/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) throw new Error('Failed to upload document')
  return response.json()
}

export const getChatHistory = async (documentId) => {
  const response = await fetch(`${API_BASE_URL}/chat/${documentId}/history`)
  if (!response.ok) throw new Error('Failed to fetch chat history')
  return response.json()
}

export const sendChatMessage = async (documentId, query) => {
  const response = await fetch(`${API_BASE_URL}/chat/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      document_id: documentId,
      query
    }),
  })

  if (!response.ok) throw new Error('Failed to send message')
  return response.json()
}