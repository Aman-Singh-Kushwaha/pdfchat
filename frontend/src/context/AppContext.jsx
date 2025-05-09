import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  const handleUploadClick = () => setIsUploadOpen(true)
  const handleUploadClose = () => setIsUploadOpen(false)
  const handleUploadSuccess = (file) => {
    setUploadedFile(file)
    setIsUploadOpen(false)
  }

  const value = {
    uploadedFile,
    isUploadOpen,
    handleUploadClick,
    handleUploadClose,
    handleUploadSuccess
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