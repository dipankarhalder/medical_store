import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './style.css'

const elemRoot = document.getElementById('root')

ReactDOM.createRoot(elemRoot!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
