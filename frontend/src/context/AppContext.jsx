import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchDocuments, uploadDocument } from '../services/api'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [documents, setDocuments] = useState([])
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const navigate = useNavigate()

  // Fetch documents on mount
  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await fetchDocuments()
      setDocuments(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleUploadClick = () => setIsUploadOpen(true)
  const handleUploadClose = () => setIsUploadOpen(false)
  
  const handleUploadSuccess = async (file) => {
    try {
      setIsLoading(true)
      const response = await uploadDocument(file)
      setUploadedFile(file)
      setIsUploadOpen(false)
      // Refresh documents list
      await loadDocuments()
      // Navigate to chat
      navigate(`/chat/${response.id}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    documents,
    uploadedFile,
    isUploadOpen,
    isLoading,
    error,
    handleUploadClick,
    handleUploadClose,
    handleUploadSuccess,
    loadDocuments
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}