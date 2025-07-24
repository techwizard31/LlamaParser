# 📄 PDF to Markdown Converter

A powerful, modern web application that converts PDF documents to clean Markdown format using AI-powered parsing. Built with Next.js frontend and FastAPI backend, featuring a beautiful dark purple theme and intuitive drag-and-drop interface.

![PDF to Markdown Converter](https://img.shields.io/badge/Status-Active-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Python](https://img.shields.io/badge/Python-3.8+-blue)

## ✨ Features

- **🎯 AI-Powered Parsing**: Uses LlamaParse for high-quality PDF text extraction
- **🎨 Beautiful UI**: Dark theme with purple gradients and smooth animations
- **📱 Drag & Drop**: Intuitive file upload with visual feedback
- **👁️ Dual View**: Switch between formatted preview and raw Markdown
- **📋 Quick Actions**: Copy to clipboard and download converted files
- **⚡ Fast Processing**: Efficient backend processing with real-time updates
- **🔒 Secure**: No file storage - temporary processing only
- **📱 Responsive**: Works perfectly on desktop and mobile devices

## 🖼️ Screenshots

### Main Interface
The sleek dark interface with gradient backgrounds and smooth animations creates a premium user experience.

### File Upload
Drag and drop any PDF file or click to browse. Real-time feedback shows upload progress and processing status.

### Markdown Output
View your converted content in a beautiful preview mode or access the raw Markdown for copying and editing.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.8+
- **LlamaCloud API Key** (Get one free at [cloud.llamaindex.ai](https://cloud.llamaindex.ai/))

### 1. Clone the Repository

```bash
git clone https://github.com/techwizard31/LlamaParser.git
cd LlamaParser
```

### 2. Backend Setup (FastAPI)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env and add your LlamaCloud API key
```

### 3. Frontend Setup (Next.js)

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000  
- **API Documentation**: http://localhost:8000/docs

## 📁 Project Structure

```
LlamaParser/
├── 📁 backend/     # FastAPI Backend
│   ├── 🐍 main.py                  # Main FastAPI application
│   ├── 🔐 .env.example             # Environment variables template
│   ├── 📋 requirements.txt         # Python dependencies
│   ├── 🚫 .gitignore              # Git ignore rules
│   └── 📁 venv/                   # Virtual environment
│
└── 📁 frontend/   # Next.js Frontend
    ├── 📁 src/
    │   ├── 📁 app/
    │   │   ├── 🎨 globals.css      # Global styles
    │   │   ├── 📄 layout.tsx       # Root layout
    │   │   └── 🏠 page.tsx         # Main page
    │   └── 📁 components/
    │       ├── 📤 FileUpload.tsx   # File upload component
    │       └── 📝 MarkdownViewer.tsx # Markdown display
    ├── 📦 package.json
    └── ⚙️ next.config.js
```

## 🔧 API Endpoints

### `POST /convert-pdf`
Convert a PDF file to Markdown format.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: PDF file

**Response:**
```json
{
  "success": true,
  "filename": "document.pdf",
  "markdown": "# Converted Markdown Content\n\nYour content here..."
}
```

### `GET /health`
Health check endpoint.

**Response:**
```json
{
  "status": "healthy"
}
```

## 🎨 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Dropzone** - Drag and drop file uploads
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client

### Backend
- **FastAPI** - Modern Python web framework
- **LlamaParse** - AI-powered PDF parsing
- **Python Multipart** - File upload handling
- **Python Dotenv** - Environment variable management
- **Uvicorn** - ASGI server

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory:

```bash
# Get your API key from https://cloud.llamaindex.ai/
LLAMA_CLOUD_API_KEY=your_llama_cloud_api_key_here
```

## 🎯 Usage

1. **Upload PDF**: Drag and drop a PDF file or click to browse
2. **Processing**: Watch the real-time progress as your file is converted
3. **View Results**: Switch between preview and raw Markdown modes
4. **Export**: Copy to clipboard or download the Markdown file

## 🚀 Deployment

### Backend (FastAPI)

**Using Docker:**
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Using Railway/Render:**
- Set environment variables
- Deploy from GitHub repository
- Ensure Python 3.8+ runtime

### Frontend (Next.js)

**Using Vercel:**
```bash
npm run build
# Deploy to Vercel with one click
```

**Using Netlify:**
```bash
npm run build
# Deploy the `out` directory
```

## 🤝 Contributing

We love contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write clean, commented code
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues & Support

- **Bug Reports**: [Create an Issue](https://github.com/techwizard31/LlamaParser/issues)
- **Feature Requests**: [Discussion Board](https://github.com/techwizard31/LlamaParser/discussions)
- **Documentation**: Check our [Wiki](https://github.com/techwizard31/LlamaParser/wiki)

## 🙏 Acknowledgments

- [LlamaIndex](https://www.llamaindex.ai/) for the amazing PDF parsing API
- [Next.js](https://nextjs.org/) team for the fantastic React framework
- [FastAPI](https://fastapi.tiangolo.com/) for the modern Python web framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/techwizard31/LlamaParser)
![GitHub forks](https://img.shields.io/github/forks/techwizard31/LlamaParser)
![GitHub issues](https://img.shields.io/github/issues/techwizard31/LlamaParser)
![GitHub license](https://img.shields.io/github/license/techwizard31/LlamaParser)

---

<div align="center">
  <p>Built with ❤️ by Techwizard31 </p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
