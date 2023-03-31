import { TextField } from '@mui/material'
import styles from './Authentication.module.css'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset, login } from '../features/auth/authSlice'

const Authentication = () => {

  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [loginData, setLoginData] = useState({
    identifier: '',
    password: '',
  })
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/closets')
    }
    dispatch(reset)
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const handleFormChange = (event) => {
    // identify which form data to change
    const form = event.currentTarget.form.id;
    console.log(`the form is ${form}`);
    if (form === "signup_form") {
      const editedField = event.target.getAttribute("name");
      const editedValue = event.target.value;
      const newData = { ...registerData };
      newData[editedField] = editedValue;
      setRegisterData(newData);
    } else if (form === "signin_form") {
      const editedField = event.target.getAttribute("name");
      const editedValue = event.target.value;
      const newData = { ...loginData };
      newData[editedField] = editedValue;
      setLoginData(newData);
    }
  }

  const handleRegister = (event) => {
    event.preventDefault();
    console.log(`Registering user with data ${registerData.username} ${registerData.email} ${registerData.password}`);
    if (registerData.password !== registerData.password2) {
      toast.error('Passwords do not match');
    } else {
      // const userData = { username: registerData.username, email: registerData.email, password: registerData.password };
      dispatch(register(registerData));
    }
  }

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(`Logging in user`)
    dispatch(login(loginData));
  }



  // remember you can use error and helperText for form validation
  return (
    <div className={styles.biggest__container}>
      <div className={rightPanelActive ? `${styles.right_panel_active} ${styles.authentication__container}` : styles.authentication__container} id={styles.main__container}>
        <div className={styles.sign_up__container}>
          <form className={styles.authentication__form} onSubmit={handleRegister} id="signup_form">
            <h1 className={styles.title}>Sign Up</h1>
            <TextField className={styles.textfield} label="Username" color="success" focused name="username" onChange={handleFormChange} />
            <TextField className={styles.textfield} label="Email" color="success" focused name="email" onChange={handleFormChange} />
            <TextField className={styles.textfield} label="Password" color="success" focused name="password" onChange={handleFormChange} />
            <TextField className={styles.textfield} label="Confirm Password" color="success" focused name="password2" onChange={handleFormChange} />
            <button>Sign Up</button>
          </form>
        </div>

        <div className={styles.sign_in__container}>
          <form className={styles.authentication__form} onSubmit={handleLogin} id="signin_form">
            <h1 className={styles.title}>Sign In</h1>
            <TextField className={styles.textfield} label="Email or Username" color="success" focused name="identifier" onChange={handleFormChange} />
            <TextField className={styles.textfield} label="Password" color="success" focused name="password" onChange={handleFormChange} />
            <a href="#" id={styles.forgot__password}>Forget your password?</a>
            <button>Sign In</button>
          </form>
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