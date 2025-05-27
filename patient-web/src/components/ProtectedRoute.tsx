import React from 'react'
import { useAppSelector } from '../app/hooks'
import { Navigate } from 'react-router-dom'

interface Props { children: React.ReactElement }

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const token = useAppSelector(state => state.auth.token)
  return token ? children : <Navigate to="/login" />
}
