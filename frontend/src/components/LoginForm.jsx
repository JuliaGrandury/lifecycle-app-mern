import { TextField } from '@mui/material'
import styles from '../pages/Authentication.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'


const LoginForm = () => {

    const dispatch = useDispatch()
    const [loginData, setLoginData] = useState({
        identifier: '',
        password: '',
    })

    const handleFormChange = (event) => {
        const editedField = event.target.getAttribute("name");
        const editedValue = event.target.value;
        const newData = { ...loginData };
        newData[editedField] = editedValue;
        setLoginData(newData);
    }

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(login(loginData));
    }

    return (
        <form className={styles.authentication__form} onSubmit={handleLogin}>
            <h1 className={styles.title}>Sign In</h1>
            <TextField className={styles.textfield} label="Email or Username" color="success" focused name="identifier" onChange={handleFormChange} />
            <TextField className={styles.textfield} label="Password" type="password" color="success" focused name="password" onChange={handleFormChange} />
            <a href="#" id={styles.forgot__password}>Forget your password?</a>
            <button className={styles.auth_button} >Sign In</button>
        </form>
    )
}

export default LoginForm