import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="62174630498-98j6kmqjt4q2ipgcdi0nbcj13r8daq3s.apps.googleusercontent.com">
      <App  />
    </GoogleOAuthProvider>
  </StrictMode>,
)

// from branch xconrad
