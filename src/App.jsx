import './App.css'
import Show from './show'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'

function App() {

  return (
    <>
     <Router>
     <AuthProvider>
     <Show/>
     </AuthProvider>
     </Router>
    </>
  )
}

export default App
