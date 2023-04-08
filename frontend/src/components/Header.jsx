import { IoIosLogOut } from 'react-icons/io'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import './Header.css'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/authentication')
    }

    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>LifeCycle</Link>
            </div>
            <ul>
                <li><NavLink to='/closets'>Closets</NavLink></li>
                <li><NavLink to='/statistics'>Statistics</NavLink></li>
                <li><NavLink to='/settings'>Settings</NavLink></li>
                <li><button className='btn' onClick={onLogout}><IoIosLogOut /></button></li>
            </ul>
        </header>
    )
}

export default Header