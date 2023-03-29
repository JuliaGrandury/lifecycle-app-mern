import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Authentication from './pages/Authentication';

function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          {/* <Header /> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/authentication' element={<Authentication />} />
          </Routes>
        </div>
      </Router>
      {/* <ToastContainer /> */}
    </>
  );
}

export default App;
