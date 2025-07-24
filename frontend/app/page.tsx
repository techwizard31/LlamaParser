'use client'

import { useState } from 'react'
import FileUpload from './components/FileUpload'
import MarkdownViewer from './components/MarkdownViewer'

export default function Home() {
  const [markdownContent, setMarkdownContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [filename, setFilename] = useState<string>('')

  const handleConversion = async (file: File) => {
    setIsLoading(true)
    setMarkdownContent('')
    
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('http://localhost:8000/convert-pdf', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.success) {
        setMarkdownContent(data.markdown)
        setFilename(data.filename)
      } else {
        throw new Error('Conversion failed')
      }
    } catch (error) {
      console.error('Error converting PDF:', error)
      alert('Error converting PDF. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            PDF to Markdown Converter
          </h1>
          <p className="text-purple-200 text-lg max-w-2xl mx-auto">
            Upload your PDF document and get clean, formatted Markdown output using advanced AI parsing
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {!markdownContent ? (
            // Upload Section
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                <FileUpload 
                  onFileUpload={handleConversion} 
                  isLoading={isLoading}
                />
              </div>
            </div>
          ) : (
            // Results Section
            <div className="space-y-6">
              {/* Header with filename and reset button */}
              <div className="flex items-center justify-between bg-purple-900/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">Conversion Complete</h2>
                  <p className="text-purple-300 text-sm">{filename}</p>
                </div>
                <button
                  onClick={() => {
                    setMarkdownContent('')
                    setFilename('')
                  }}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Convert Another File
                </button>
              </div>

              {/* Markdown Viewer */}
              <MarkdownViewer content={markdownContent} />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}