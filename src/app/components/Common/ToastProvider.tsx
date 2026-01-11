'use client'

import { Toaster } from 'react-hot-toast'

const ToastProvider = () => (
  <Toaster
    position='top-center'
    toastOptions={{
      style: {
        fontSize: '0.95rem',
      },
    }}
  />
)

export default ToastProvider

