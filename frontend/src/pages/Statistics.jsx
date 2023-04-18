import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styles from './Statistics.module.css'

const mostWorn = [{ rank: 1, name: 'Zara Men Puff Jacket', image: null, timesWorn: 3 },
{ rank: 2, name: 'DVF Coral Design Dress', image: null, timesWorn: 15 }]

const Statistics = () => {

  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/authentication')
    }
  }, [user, navigate])

  return (
    <div className={styles.cards__container}>
      <div className={styles.overview__container}>
        <div className={styles.single_stat}>Items in Closet: <span>176</span></div>
        <div className={styles.single_stat}>Items out of Closet: <span>3</span></div>
        <div className={styles.single_stat}>Items to Repair: <span>2</span></div>
        <div className={styles.single_stat}>You have worn <span>40%</span> of your closet this month</div>
        <div className={styles.single_stat}>You have spent <span>100$</span> on your closet this month</div>
      </div>

      <div className={styles.lists__container}>
        <h4>Your 5 Most Worn Items</h4>
        <table>
          <tbody>
            {mostWorn.map((item) => (
              <tr key={`mostworn${item.rank}`}>
                <td>{item.rank}.</td>
                <td>{item.name}</td>
                <td>image</td>
                <td>Worn {item.timesWorn} times in the last month</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.lists__container}>
        <h4>Your 5 Least Worn Items</h4>
        <table>
          <tbody>
            {mostWorn.map((item) => (
              <tr key={`leastworn${item.rank}`}>
                <td>{item.rank}.</td>
                <td>{item.name}</td>
                <td>image</td>
                <td>Worn {item.timesWorn} times in the last month</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Statistics