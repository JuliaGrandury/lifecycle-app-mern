import { TextField } from '@mui/material'
import styles from '../pages/Authentication.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { register } from '../features/auth/authSlice'

const RegisterForm = () => {

    const dispatch = useDispatch()
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
    })

    const handleFormChange = (event) => {
        const editedField = event.target.getAttribute("name");
        const editedValue = event.target.value;
        const newData = { ...registerData };
        newData[editedField] = editedValue;
        setRegisterData(newData);
    }

    const handleRegister = (event) => {
        event.preventDefault();
        console.log(`Registering user with data ${registerData.username} ${registerData.email} ${registerData.password}`);
        if (registerData.password !== registerData.password2) {
            toast.error('Passwords do not match');
        } else {
            dispatch(register(registerData));
        }
    }

    return (
        <form className={styles.authentication__form} onSubmit={handleRegister}>
            <h1 className={styles.title}>Sign Up</h1>
            <TextField className={styles.textfield} label="Username" color="success" focused name="username" onChange={handleFormChange} />
            <TextField className={styles.textfield} label="Email" color="success" focused name="email" onChange={handleFormChange} />
            <TextField className={styles.textfield} label="Password" type="password" color="success" focused name="password" onChange={handleFormChange} />
            <TextField className={styles.textfield} label="Confirm Password" type="password" color="success" focused name="password2" onChange={handleFormChange} />
            <button className={styles.auth_button}>Sign Up</button>
        </form>
    )
}

export default RegisterForm