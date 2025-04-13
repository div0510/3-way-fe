# React + Vite

# 📄 3-Way Document Matching Automation (Frontend)

This project is a frontend module for automating 3-way document matching among **Purchase Orders (PO)**, **Invoices**,
and **Goods Receipt Notes (GRN)** using OCR. It allows users to upload documents, view extracted line-item comparisons,
and visualize matched, partially matched, or mismatched entries in a tabular format.

---

## 🚀 Features

- Upload PDF/PNG/JPG files for PO, Invoice, and GRN
- Preview uploaded files directly in the browser
- Form validation with visual feedback
- Table with color-coded matching results (Match ✅, Partial ⚠️, Mismatch ❌)
- Responsive UI with Tailwind CSS
- Toast notifications for success and error states

---

## 🛠️ Tech Stack

- **React.js**
- **React Hook Form** + **Yup** for form handling and validation
- **Axios** for API requests
- **Tailwind CSS** for styling
- **React Toastify** for notifications

---

## 🎨 Frontend (React) – Brief Architecture

```makefile
📦 frontend/
├── App.js                        # Main layout and page structure
├── components/
│   ├── documentUpload/           # Upload PO, Invoice, GRN files (with validation and preview)
│   └── matchingTable/            # Display matching results in a dynamic table
```

### ⚙️ Responsibilities:

- Uploads documents via form (validates file type and presence)

- Displays PDF/image previews

- Sends files to backend API

- Shows matching results in a responsive table

- Highlights matched, partially matched, and mismatched rows using colors

### 🎯 Features:

- 🟩 Green: Fully matched items

- 🟨 Yellow: Partial mismatch

- 🟥 Red: Mismatch or missing values

- Responsive layout using Tailwind CSS

- Validation using react-hook-form + yup

## 📦 Installation

1.**Clone the repository**

   ```bash
   git clone https://github.com/div0510/3-way-fe.git
   cd 3-way-fe
   ```

2.**Install Dependencies**

```bash
    npm install
```

3.**Start the Development Server**

```bash
   npm run dev
```

> The app should now be running on http://localhost:5173 (or the port Vite suggests).

> ⚠️ Make sure your backend is running at http://localhost:8000/upload-docs as expected.

> 🔗 The backend for this project is available at: https://github.com/div0510/3-way-be

