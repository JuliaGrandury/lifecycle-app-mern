import styles from './Authentication.module.css'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reset } from '../features/auth/authSlice'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const Authentication = () => {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
  const [rightPanelActive, setRightPanelActive] = useState(false);

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/closets')
    }
    dispatch(reset)
  }, [user, isError, isSuccess, message, navigate, dispatch])


  // remember you can use error and helperText for form validation
  return (
    <div className={styles.biggest__container}>
      <div className={rightPanelActive ? `${styles.right_panel_active} ${styles.authentication__container}` : styles.authentication__container} id={styles.main__container}>
        <div className={styles.sign_up__container}>
          <RegisterForm />
        </div>

        <div className={styles.sign_in__container}>
          <LoginForm />
        </div>

        <div className={styles.overlay__container}>
          <div className={styles.overlay}>
            <div className={styles.overlay_left}>
              <h1 className={styles.title}>Welcome Back!</h1>
              <p>The earth thanks you for your efforts.</p>
              <button id={styles.sign_in__button} onClick={() => setRightPanelActive(false)}>Sign In</button>
            </div>
            <div className={styles.overlay_right}>
              <h1 className={styles.title}>Hey friend,</h1>
              <p>Create an account and join our community of sustainable fashion lovers!</p>
              <button id={styles.sign_up__button} onClick={() => setRightPanelActive(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Authentication