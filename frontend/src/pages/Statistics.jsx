import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styles from './Statistics.module.css'

const Statistics = () => {

  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/authentication')
    }
  }, [user, navigate])

  return (
    <div>
      <div className={styles.overview__container}>
        <div className={styles.single_stat}>Items in Closet: 176</div>
        <div className={styles.single_stat}>Items out of Closet: 3</div>
        <div className={styles.single_stat}>Items to Repair: 1</div>
      </div>

      <div className={styles.detail__container}>
        <h3>Your 5 Most Worn Items</h3>
      </div>

      <div className={styles.detail__container}>
        <h3>Your 5 Least Worn Items</h3>
        <table>
          <tbody>
            <tr></tr>
          </tbody>
        </table>
      </div>

      <div>You wear 40% of your closet</div>
      <div>You have spent 100$ on your closet this year</div>
    </div>
  )
}

export default Statistics