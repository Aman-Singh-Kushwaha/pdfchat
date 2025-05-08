import { useCallback } from 'react'
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  Box, 
  Typography,
  IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useDropzone } from 'react-dropzone'

const FileUploadDialog = ({ open, onClose, onUploadSuccess }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if(file){
      // TODO: backend file upload left to do
      onUploadSuccess(file)
    }
  }, [onUploadSuccess ])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: false
  })

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Upload PDF
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed #0FA958',
            borderRadius: 2,
            p: 3,
            textAlign: 'center',
            cursor: 'pointer',
            bgcolor: isDragActive ? 'action.hover' : 'background.paper',
            '&:hover': {
              bgcolor: 'action.hover'
            }
          }}
        >
          <input {...getInputProps()} />
          <Typography variant="body1" gutterBottom>
            {isDragActive
              ? 'Drop the PDF here'
              : 'Drag & drop a PDF file here, or click to select'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Maximum file size: 50MB
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default FileUploadDialog