import { IoIosLogOut } from "react-icons/io"
import { VscTriangleDown } from "react-icons/vsc"
import { HiMenuAlt3 } from "react-icons/hi"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Fragment, useState } from "react"
import { logout, reset } from "../features/auth/authSlice"
import "./Header.css"
import { toast } from "react-toastify"

const capitalizeFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const accessList = ["Lucy435", "Marco2000", "ClaireMarie"]

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [showDropdown, setShowDropdown] = useState()
  const [showMenu, setShowMenu] = useState(false)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/authentication")
  }

  const navigateToCloset = (closet) => {
    console.log(`Navigate to closet ${closet}`)
    toast("This feature is currently in development. Please check back at a later time.")
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">LifeCycle</Link>
      </div>
      <ul className="nav__list">
        {/* DROPDOWN BELOW CLOSET NAME */}
        <li>
          <div className="dropdown__container">
            <NavLink to="/closets">
              <button className="dropdown__button" onClick={() => setShowDropdown(!showDropdown)}>
                My Closet
                <VscTriangleDown style={{ marginLeft: "8px" }} />
              </button>
            </NavLink>
            {showDropdown ? (
              <ul className="dropdown__list">
                <li onClick={() => navigate("/mylists")}>My Lists</li>
                {accessList &&
                  accessList.map((closet) => (
                    <li key={closet} onClick={() => navigateToCloset(closet)}>
                      {closet}'s Closet
                    </li>
                  ))}
              </ul>
            ) : (
              <></>
            )}
          </div>
        </li>

        <li>
          <NavLink to="/statistics">Statistics</NavLink>
        </li>
        <li>
          <NavLink to="/settings">Settings</NavLink>
        </li>
        <li>
          <button className="btn" onClick={onLogout}>
            <IoIosLogOut />
          </button>
        </li>
      </ul>

      <div className="hamburger">
        <button onClick={() => setShowMenu(true)}>
          <HiMenuAlt3 />
        </button>
      </div>
      <div className={`mobile__menu ${showMenu ? "show" : ""}`}>
        <ul>
          <li>
            <button className="btn close__button" onClick={() => setShowMenu(false)}>
              <IoIosCloseCircleOutline />
            </button>
          </li>
          <li>
            <NavLink to="/closets" onClick={() => setShowMenu(false)}>
              My Closet
            </NavLink>
          </li>
          <li>
            <NavLink to="/statistics" onClick={() => setShowMenu(false)}>
              Statistics
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" onClick={() => setShowMenu(false)}>
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
