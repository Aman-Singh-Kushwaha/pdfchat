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