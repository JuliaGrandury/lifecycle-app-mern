import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import styles from "./Statistics.module.css"
import default_image from "../assets/default_image.png"
import { toast } from "react-toastify"

const mostWorn = [
  { rank: 1, name: "Zara Men Puff Jacket", image: null, timesWorn: 3 },
  { rank: 2, name: "DVF Coral Design Dress", image: null, timesWorn: 15 },
  { rank: 3, name: "DVF Coral Design Dress", image: null, timesWorn: 15 },
  { rank: 4, name: "DVF Coral Design Dress", image: null, timesWorn: 15 },
  { rank: 5, name: "DVF Coral Design Dress", image: null, timesWorn: 15 },
]

const Statistics = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  // const { topFive, isLoading, isError, message } = useSelector((state) => state.topFive)

  const handleSeeDetails = () => {
    toast("This feature is currently in development.")
  }

  useEffect(() => {
    // if (isError) {
    //   console.log(message)
    // }

    if (!user) {
      navigate("/authentication")
    }

    // dispatch(getTopFive())
  }, [user, navigate, dispatch])

  return (
    <section className={styles.cards__container}>
      <div className={styles.closet__overview}>
        <div className={styles.closet__card}>
          <span>176</span> Items in Closet
          <button className={styles.seedetails__button} onClick={handleSeeDetails}>
            See Details
            <MdOutlineKeyboardArrowDown />
          </button>
        </div>
        <div className={styles.closet__card}>
          <span>3</span> Items out of Closet
          <button className={styles.seedetails__button} onClick={handleSeeDetails}>
            See Details
            <MdOutlineKeyboardArrowDown />
          </button>
        </div>
        <div className={styles.closet__card}>
          <span>2</span> Items to Repair
          <button className={styles.seedetails__button} onClick={handleSeeDetails}>
            See Details
            <MdOutlineKeyboardArrowDown />
          </button>
        </div>
      </div>

      <div className={styles.habit__overview}>
        <div className={styles.habit__card}>
          You have worn <span>40%</span> of your closet this month
        </div>
        <div className={styles.habit__card}>
          You have spent <span>100$</span> on your closet this month
        </div>
      </div>

      <div className={styles.items__overview}>
        <div className={styles.list__container}>
          <h4>Your Most Worn Items</h4>
          <table>
            <tbody>
              {mostWorn &&
                mostWorn.map((item) => (
                  <tr key={`mostworn${item.rank}`}>
                    <td>{item.name}</td>
                    <td className={styles.item__image}>
                      <img src={default_image} alt={item.name} />
                    </td>
                    <td className={styles.item_times}>{item.timesWorn}x in last month</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className={styles.list__container}>
          <h4>Your Least Worn Items</h4>
          <table>
            <tbody>
              {mostWorn.map((item) => (
                <tr key={`leastworn${item.rank}`}>
                  <td>{item.name}</td>
                  <td className={styles.item__image}>
                    <img src={default_image} alt={item.name} />
                  </td>
                  <td className={styles.item_times}>{item.timesWorn}x in last month</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Statistics
