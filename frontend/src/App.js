import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Authentication from './pages/Authentication'
import Closets from './pages/Closets'
import Statistics from './pages/Statistics'
import Settings from './pages/Settings'

function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          {/* To avoid rendering of Header on Auth Page */}
          <HeaderWrapper />
          <Routes>
            <Route path='/authentication' element={<Authentication />} />
            {/* <Route path='/' element={<Closets />} /> */}
            <Route path='/closets' element={<Closets />} />
            <Route path='/statistics' element={<Statistics />} />
            <Route path='/settings' element={<Settings />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

function HeaderWrapper() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/authentication';
  return (
    <>
      {!isAuthPage && <Header />}
    </>
  );
}

export default App;
