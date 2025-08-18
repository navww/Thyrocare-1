import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BackgroundProvider } from './contexts/BackgroundContext.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { BloodTestProvider } from './contexts/BloodTestContext.tsx'

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BackgroundProvider>
      <BloodTestProvider>
        <App />
      </BloodTestProvider>
    </BackgroundProvider>
  </AuthProvider>
);
