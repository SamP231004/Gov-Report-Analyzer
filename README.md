# 🚀 Government Report Analyzer

An AI-powered web app that analyzes and summarizes government reports (PDF/Image) using **Google Gemini API**, built with a focus on **performance, scalability, and robust handling of large inputs**.

🌐 **Live Demo:** [https://gov-report-analyzer.netlify.app/](https://gov-report-analyzer.netlify.app/)

---

## ✨ Features

* 📂 Upload **PDF or Image files**
* 🧠 Extracts text from documents (PDF parsing)
* 🤖 Generates **2-line concise AI summaries using Gemini**
* ⚡ **Optimized API response time** (no raw file sent to LLM)
* 📦 **Chunking + parallel processing** for large documents
* 🧾 **Structured JSON response enforcement** from Gemini
* 🚫 File validation (**type + size limit**)
* ⚠️ Robust error handling (invalid files, empty text, API failures)
* 🌐 Fully deployed (Frontend + Backend)
* 🎨 Clean, responsive UI

---

## 🛠️ Tech Stack

| Category      | Technologies                         |
| ------------- | ------------------------------------ |
| 💻 Frontend   | React (Vite), Axios, CSS             |
| ⚙️ Backend    | Node.js, Express.js                  |
| 📄 Parsing    | PDF-Parse                            |
| 🤖 AI         | Google Gemini API                    |
| ☁️ Deployment | Netlify (Frontend), Render (Backend) |

---

## 🧠 Key Engineering Improvements

This project focuses on **real-world backend considerations**:

* **Avoided sending raw files to Gemini** → reduced latency significantly
* **Implemented chunking (≈3k chars)** → handles large documents efficiently
* **Parallel processing (Promise.all)** → faster summarization
* **Enforced strict JSON output** → reliable and structured responses
* **Graceful fallback handling** → ensures consistent output even on failures
* **File size limit (5MB)** → prevents performance bottlenecks

---

## 📸 Preview

![App Screenshot](SreenShots/SS_1.png)

---

## ⚙️ How It Works

1. 📤 Upload a PDF/Image
2. 🧾 Backend extracts text (PDF parsing)
3. ✂️ Text is split into chunks
4. 🤖 Gemini summarizes each chunk (parallel calls)
5. 🔗 Summaries are merged into a final 2-line response
6. ✨ Clean structured output returned to frontend

---

## ⚠️ Notes

* Gemini API has **free-tier rate limits**
* Backend includes **fallback handling** for empty/invalid responses

---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Clone the repo

```bash
git clone https://github.com/SamP231004/Gov-Report-Analyzer.git
cd Gov-Report-Analyzer
```

---

### 2️⃣ Setup Backend

```bash
cd functions
npm install
```

Create `.env` file:

```env
GEMINI_API_KEY=your_api_key_here
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000/analyze
```

Run frontend:

```bash
npm run dev
```

---

## 🌐 Deployment

* 🚀 Frontend → Netlify
* ⚙️ Backend → Render

---

## 👨‍💻 About Me

* 📄 Resume: [https://drive.google.com/file/d/1Ci5U-3jc_Xhmj7oOVeFsdix1uGfOCAom/view](https://drive.google.com/file/d/1Ci5U-3jc_Xhmj7oOVeFsdix1uGfOCAom/view)
* 🌐 Portfolio: [https://samp231004.github.io/Portfolio/](https://samp231004.github.io/Portfolio/)
* 💻 GitHub: [https://github.com/SamP231004](https://github.com/SamP231004)
* 🔗 LinkedIn: [https://www.linkedin.com/in/samp231004/](https://www.linkedin.com/in/samp231004/)

---

## 💡 Future Improvements

* 🎯 Drag & Drop upload
* 🖼️ OCR for images (Tesseract integration)
* 📊 Highlight key insights instead of plain summary
* 🧠 Save & manage document history
* ⚡ Streaming responses for faster UX

---