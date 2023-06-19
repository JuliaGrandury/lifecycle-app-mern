import { CiSettings } from "react-icons/ci"
import { MdKeyboardArrowDown } from "react-icons/md"
import { IoMenuOutline } from "react-icons/io5"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Fragment, useState } from "react"
import { logout, reset } from "../features/auth/authSlice"
import "./Header.css"
import { toast } from "react-toastify"


function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showClosetsDropdown, setShowClosetsDropdown] = useState()
  const [showSettingsDropdown, setShowSettingsDropdown] = useState()

  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [selectedDisplay, setSelectedDisplay] = useState({ label: "My Closet", path: "/closets" })

  const { following } = useSelector((state) => state.closet)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/authentication")
  }

  const navigateToCloset = (closet) => {
    console.log(`Navigate to closet ${closet}`)
    toast("This feature is currently in development. Please check back at a later time.")
  }

  const openAccountModal = () => {}

  return (
    <header className="header">
      <div className="logo">
        <Link to="/dashboard">LifeCycle</Link>
      </div>
      <ul className="nav__list">
        {/* DASHBOARD */}
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>

        {/* CLOSETS */}
        <li>
          <div className="dropdown__container">
            <NavLink to={selectedDisplay.path}>
              <button className="dropdown__button" onClick={() => setShowClosetsDropdown(!showClosetsDropdown)}>
                {selectedDisplay.label}
                <MdKeyboardArrowDown style={{ marginLeft: "8px" }} />
              </button>
            </NavLink>
            {showClosetsDropdown && (
              <ul className="dropdown__list">
                <li
                  onClick={() => {
                    navigate("/closets")
                    setSelectedDisplay({ label: "My Closet", path: "/closets" })
                    setShowClosetsDropdown(!showClosetsDropdown)
                  }}>
                  My Closet
                </li>
                <li
                  onClick={() => {
                    navigate("/mylists")
                    setSelectedDisplay({ label: "My Lists", path: "/mylists" })
                    setShowClosetsDropdown(!showClosetsDropdown)
                  }}>
                  My Lists
                </li>
                {following &&
                  following.map((closet) => (
                    <li
                      key={closet}
                      onClick={() => {
                        navigateToCloset(closet)
                        setShowClosetsDropdown(!showClosetsDropdown)
                      }}>
                      {closet}'s Closet
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </li>

        {/* ACCOUNT & SETTINGS */}
        <li>
          <div className="dropdown__container">
            <button className="btn" onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}>
              <CiSettings />
            </button>
            {showSettingsDropdown && (
              <ul className="dropdown__list">
                <li>
                  <NavLink to="/settings">Settings</NavLink>
                </li>
                <li>
                  <button className="dropdown__button" style={{ color: "#db512f" }} onClick={() => onLogout()}>
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </li>
      </ul>

      <div className="hamburger">
        <button onClick={() => setShowMobileMenu(true)}>
          <IoMenuOutline style={{ color: "#6ed563" }} />
        </button>
      </div>
      <div className={`mobile__menu ${showMobileMenu ? "show" : ""}`}>
        <ul>
          <li>
            <button className="btn close__button" onClick={() => setShowMobileMenu(false)}>
              <IoIosCloseCircleOutline />
            </button>
          </li>
          <li>
            <NavLink to="/dashboard" onClick={() => setShowMobileMenu(false)}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/closets" onClick={() => setShowMobileMenu(false)}>
              My Closet
            </NavLink>
          </li>
          <li>
            <NavLink to="/mylists" onClick={() => setShowMobileMenu(false)}>
              My Lists
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" onClick={() => setShowMobileMenu(false)}>
              Settings
            </NavLink>
          </li>
          <li>
            <button className="btn logout_btn" onClick={onLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
