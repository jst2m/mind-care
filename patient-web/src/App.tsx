import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'  // ← on importe Navigate
 import { LoginPage } from './pages/LoginPage'
 import { SignupPage } from './pages/SignupPage'
 import { PatientProfilePage } from './pages/PatientProfilePage'
 import { ProtectedRoute } from './components/ProtectedRoute'

export function App(): JSX.Element {
   return (
     <BrowserRouter>
       <Routes>
         <Route path="/login" element={<LoginPage />} />
         <Route path="/signup" element={<SignupPage />} />
         <Route
           path="/patient"
           element={
             <ProtectedRoute>
               <PatientProfilePage />
             </ProtectedRoute>
           }
         />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
