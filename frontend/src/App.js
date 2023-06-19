import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from "./components/Header"
import Authentication from "./pages/Authentication"
import MyCloset from "./pages/MyCloset"
import Dashboard from "./pages/Dashboard"
import Settings from "./pages/Settings"
import MyLists from "./pages/MyLists"

function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          {/* To avoid rendering of Header on Auth Page */}
          <HeaderWrapper />
          <Routes>
            <Route path="/authentication" element={<Authentication />} />
            <Route path="/" element={<MyCloset />} />
            <Route path="/closets" element={<MyCloset />} />
            <Route path="/mylists" element={<MyLists />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

function HeaderWrapper() {
  const location = useLocation()
  const isAuthPage = location.pathname === "/authentication"
  return <>{!isAuthPage && <Header />}</>
}

export default App
