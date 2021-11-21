import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
