import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { router } from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <div>
    <RouterProvider router={router} />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
          background: '#333',
          color: '#fff',
        },
        success: {
          iconTheme: {
            primary: '#22c55e', // verde
            secondary: '#333',
          },
          duration: 2000
        },
        error: {
          iconTheme: {
            primary: '#ef4444', // vermelho
            secondary: '#333',
          },
          duration: 2000
        },
      }}
    />
  </div>
)