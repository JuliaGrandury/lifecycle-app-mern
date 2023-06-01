import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import styles from "./Statistics.module.css"
import default_image from "../assets/default_image.png"
import { toast } from "react-toastify"
import { getStatistics } from "../features/items/itemSlice"

const Statistics = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { totalItemsNum, outOfClosetNum, toRepairNum, lastMonthSpending, mostWorn, leastWorn } = useSelector((state) => state.items.statistics)

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

    dispatch(getStatistics())
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
          You have worn <span style={{ color: "red" }}>40%</span> of your closet this month
        </div>
        <div className={styles.habit__card}>
          You have spent <span style={{ color: "purple" }}>100$</span> on your closet this month
        </div>
      </div>

      <div className={styles.items__overview}>
        <div className={styles.list__container}>
          <h4>Your Most Worn Items</h4>
          <table>
            <tbody>
              {mostWorn &&
                mostWorn.map((item) => (
                  <tr key={`mostworn${item.name}`}>
                    <td>{item.name}</td>
                    <td className={styles.item__image}>
                      <img src={default_image} alt={item.name} />
                    </td>
                    <td className={styles.item_times}>{item.datesWorn.length}x in last month</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className={styles.list__container}>
          <h4>Your Least Worn Items</h4>
          <table>
            <tbody>
              {leastWorn &&
                leastWorn.map((item) => (
                  <tr key={`leastworn${item.name}`}>
                    <td>{item.name}</td>
                    <td className={styles.item__image}>
                      <img src={default_image} alt={item.name} />
                    </td>
                    <td className={styles.item_times}>{item.datesWorn.lengt}x in last month</td>
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
