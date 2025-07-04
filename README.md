# 📚 Library Management System – Frontend
A modern, responsive frontend for a Library Management System built with React, TypeScript, and Redux Toolkit (RTK Query). This app allows users to view, add, edit, delete, and borrow books from a library.

<br/><br/><br/>

# 🚀 Features
✅ View list of books with availability
✅ Add/edit/delete book entries
✅ Borrow books with due date and quantity
✅ Modal-based forms and views
✅ Toast notifications with react-toastify
✅ API integration using RTK Query
✅ Form validation and error handling
✅ Fully responsive UI with Tailwind CSS

<br/><br/><br/>

# 🛠 Tech Stack
<table>
  <tr>
    <th>Technology</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>React</td>
    <td>Frontend UI framework</td>
  </tr>
  <tr>
    <td>TypeScript</td>
    <td>Static typing for better DX</td>
  </tr>
  <tr>
    <td>Redux Toolkit</td>
    <td>Global state management + API layer</td>
  </tr>
  <tr>
    <td>RTK Query</td>
    <td>Data fetching and caching</td>
  </tr>
  <tr>
    <td>Tailwind CSS</td>
    <td>Utility-first CSS framework</td>
  </tr>
  <tr>
    <td>React Router</td>
    <td>Client-side routing</td>
  </tr>
  <tr>
    <td>React Toastify</td>
    <td>Notifications</td>
  </tr>  	
</table>

<br/><br/><br/>

# 📂 Project Structure
```bash
src/
├── components/         # Reusable components (modals, buttons, etc.)
├── features/books/     # Redux slice and API logic for books
├── pages/              # Route-level pages (Home, BorrowSummary, etc.)
├── App.tsx             # App layout and routes
├── main.tsx            # App entry point
```

<br/><br/><br/>

# ⚙️ Setup Instructions
## 1. Clone the repository
```bash
git clone https://github.com/yourusername/library-frontend.git
cd library-frontend
```
## 2. Install dependencies
```bash
npm install
```
## 3. Configure environment variables
If applicable, create a .env file and set your API base URL:
```bash
VITE_API_BASE_URL=http://localhost:5000/api
```
## 4. Run the development server
```bash
npm run dev
```
Visit http://localhost:5173 to see it in action.