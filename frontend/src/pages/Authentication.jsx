import { TextField } from '@mui/material';
import styles from './Authentication.module.css';
import { useState } from 'react';

const Authentication = () => {

  const [rightPanelActive, setRightPanelActive] = useState(false);

  return (
    <div className={styles.biggest__container}>
      <div className={rightPanelActive ? `${styles.right_panel_active} ${styles.authentication__container}` : styles.authentication__container} id={styles.main__container}>
        <div className={styles.sign_up__container}>
          <form className={styles.authentication__form} action="#">
            <h1 className={styles.title}>Sign Up</h1>
            <TextField className={styles.textfield} label="Username" color="success" focused />
            <TextField className={styles.textfield} label="Email" color="success" focused />
            <TextField className={styles.textfield} label="Password" color="success" focused />
            {/* <TextField className={styles.textfield} label="Confirm Password" color="success" focused /> */}
            <button>Sign Up</button>
          </form>
        </div>

        <div className={styles.sign_in__container}>
          <form className={styles.authentication__form} action="#">
            <h1 className={styles.title}>Sign In</h1>
            <TextField className={styles.textfield} label="Email" color="success" focused />
            <TextField className={styles.textfield} label="Password" color="success" focused />
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
              <p>Create an account and join our community of sustainable fashionistas!</p>
              <button id={styles.sign_up__button} onClick={() => setRightPanelActive(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Authentication