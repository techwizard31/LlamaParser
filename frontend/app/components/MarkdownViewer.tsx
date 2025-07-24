'use client'

import { useState } from 'react'
import { Copy, Download, Eye, Code } from 'lucide-react'

interface MarkdownViewerProps {
  content: string
}

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  const [viewMode, setViewMode] = useState<'preview' | 'raw'>('preview')
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const downloadMarkdown = () => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'converted-document.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const renderMarkdown = (markdown: string) => {
    // Simple markdown rendering for preview
    return markdown
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-purple-200 mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold text-purple-100 mt-6 mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-white mt-8 mb-4">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-purple-200">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-purple-300">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-purple-800/50 text-purple-200 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/\n\n/g, '</p><p class="text-purple-100 leading-relaxed mb-4">')
      .replace(/\n/g, '<br>')
  }

  return (
    <div className="bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-purple-500/20 bg-purple-800/20">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-white">Markdown Output</h3>
          
          {/* View Mode Toggle */}
          <div className="flex bg-purple-800/30 rounded-lg p-1">
            <button
              onClick={() => setViewMode('preview')}
              className={`flex items-center px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'preview'
                  ? 'bg-purple-600 text-white'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`flex items-center px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'raw'
                  ? 'bg-purple-600 text-white'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              <Code className="w-4 h-4 mr-1" />
              Raw
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={copyToClipboard}
            className={`flex items-center px-3 py-2 rounded-lg text-sm transition-all ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            <Copy className="w-4 h-4 mr-1" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
          
          <button
            onClick={downloadMarkdown}
            className="flex items-center px-3 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-sm transition-colors"
          >
            <Download className="w-4 h-4 mr-1" />
            Download
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {viewMode === 'preview' ? (
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: `<p class="text-purple-100 leading-relaxed mb-4">${renderMarkdown(content)}</p>` 
            }}
          />
        ) : (
          <pre className="text-purple-100 text-sm leading-relaxed whitespace-pre-wrap bg-black/30 p-4 rounded-lg border border-purple-500/20 overflow-x-auto">
            {content}
          </pre>
        )}
      </div>
    </div>
  )
}