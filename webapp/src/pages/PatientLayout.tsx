//patientLayout
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
export default function PatientLayout() {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('accessToken')
    navigate('/login')
  }

  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-gray-100 p-4">
        <ul className="space-y-2">
          {['profile','journal','appointments','exercises'].map(path => (
            <li key={path}>
              <NavLink to={path} className={({isActive})=>isActive ? 'font-bold' : ''}>
                {path.charAt(0).toUpperCase()+path.slice(1)}
              </NavLink>
            </li>
          ))}
        </ul>
        <button onClick={logout} className="mt-4 text-red-600">Déconnexion</button>
      </nav>
      <main className="flex-1 overflow-auto bg-white">
        <Outlet/>
      </main>
    </div>
  )
}
