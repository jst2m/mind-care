// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'  
import Login             from './pages/Login'
import Signup            from './pages/Signup'
import PatientProfile    from './pages/PatientProfile'
import Journal           from './pages/Journal'
import Appointments      from './pages/Appointments'
import Exercises         from './pages/Exercises'
import Home              from './pages/Home'
import ExerciseDetail    from './pages/ExerciseDetail'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"          element={<Login />} />
        <Route path="/signup"         element={<Signup />} />
        <Route path="/profile"        element={<PatientProfile />} />
        <Route path="/journal"        element={<Journal />} />
        <Route path="/appointments"   element={<Appointments />} />
        <Route path="/exercises"      element={<Exercises />} />
        <Route path="/exercises/:id"  element={<ExerciseDetail />} />

        {/*  home sur la racine */}
        <Route path="/"               element={<Home />} />

        {/* redirection générique */}
        <Route path="*"               element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
