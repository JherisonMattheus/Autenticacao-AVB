
import { AuthProvider } from './context/AuthProvider'
import { AppRoutes } from './routes'

export default function App() {
  

  return (
    <AuthProvider>
        <AppRoutes />
    </AuthProvider>
        
  )
}

