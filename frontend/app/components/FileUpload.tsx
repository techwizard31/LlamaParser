'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, Loader2 } from 'lucide-react'

interface FileUploadProps {
  onFileUpload: (file: File) => void
  isLoading: boolean
}

export default function FileUpload({ onFileUpload, isLoading }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0])
    }
  }, [onFileUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false,
    disabled: isLoading
  })

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
          transition-all duration-300 ease-in-out
          ${isDragActive 
            ? 'border-purple-400 bg-purple-500/10 scale-105' 
            : 'border-purple-500/30 bg-purple-900/20 hover:border-purple-400 hover:bg-purple-500/10'
          }
          ${isLoading ? 'cursor-not-allowed opacity-50' : ''}
          backdrop-blur-sm
        `}
      >
        <input {...getInputProps()} />
        
        {isLoading ? (
          <div className="space-y-4">
            <Loader2 className="mx-auto h-16 w-16 text-purple-400 animate-spin" />
            <div>
              <p className="text-xl font-semibold text-white mb-2">Processing PDF...</p>
              <p className="text-purple-300">This may take a few moments depending on the file size</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {isDragActive ? (
              <>
                <Upload className="mx-auto h-16 w-16 text-purple-400" />
                <div>
                  <p className="text-xl font-semibold text-white mb-2">Drop your PDF here!</p>
                  <p className="text-purple-300">Release to upload and convert</p>
                </div>
              </>
            ) : (
              <>
                <FileText className="mx-auto h-16 w-16 text-purple-400" />
                <div>
                  <p className="text-xl font-semibold text-white mb-2">Upload PDF Document</p>
                  <p className="text-purple-300 mb-4">
                    Drag and drop your PDF here, or click to select
                  </p>
                  <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105">
                    <Upload className="w-5 h-5 mr-2" />
                    Choose File
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-4 w-2 h-2 bg-purple-400 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-8 right-8 w-1 h-1 bg-pink-400 rounded-full opacity-40 animate-pulse delay-100"></div>
          <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-35 animate-pulse delay-200"></div>
          <div className="absolute bottom-4 right-4 w-2 h-2 bg-pink-300 rounded-full opacity-25 animate-pulse delay-300"></div>
        </div>
      </div>

      {/* File format info */}
      <div className="mt-4 text-center">
        <p className="text-sm text-purple-400">
          Supported format: PDF files only
        </p>
      </div>
    </div>
  )
}