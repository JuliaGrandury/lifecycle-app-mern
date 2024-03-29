import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import styles from "./Dashboard.module.css"
import default_image from "../assets/default_image.png"
import { toast } from "react-toastify"
import { getStatistics } from "../features/items/itemSlice"
import Spinner from "../components/Shared/Spinner"

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showDetails, setShowDetails] = useState(false)

  const { user } = useSelector((state) => state.auth)
  const { totalItemsNum, outOfClosetNum, toRepairNum, wornItems, lastMonthSpending, mostWorn, leastWorn } = useSelector((state) => state.items.statistics)
  const { isLoading, isError, message } = useSelector((state) => state.items)

  const wornPercentage = Math.floor((wornItems / totalItemsNum) * 100)
  const userBudget = 100

  const handleSeeDetails = () => {
    toast("This feature is currently in development.")
  }

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate("/authentication")
    }

    dispatch(getStatistics())
  }, [user, navigate, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <section className={styles.cards__container}>
      <div className={styles.closet__overview}>
        <div className={styles.closet__card}>
          <span>{totalItemsNum}</span> Items in Closet
          <button className={styles.seedetails__button} onClick={handleSeeDetails}>
            See Details
            <MdOutlineKeyboardArrowDown />
          </button>
          {showDetails && (
            <div className={styles.scrollable__div}>
              <table>
                <tbody>
                  <tr>
                    <td>Tops</td>
                  </tr>
                  <tr>
                    <td>Bottoms</td>
                  </tr>
                  <tr>
                    <td>Dresses and Jumpsuits</td>
                  </tr>
                  <tr>
                    <td>Coats and Jackets</td>
                  </tr>
                  <tr>
                    <td>Shoes</td>
                  </tr>
                  <tr>
                    <td>Swimwear</td>
                  </tr>
                  <tr>
                    <td>Accessories</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className={styles.closet__card}>
          <span>{outOfClosetNum}</span> Items out of Closet
          <button className={styles.seedetails__button} onClick={handleSeeDetails}>
            See Details
            <MdOutlineKeyboardArrowDown />
          </button>
        </div>
        <div className={styles.closet__card}>
          <span>{toRepairNum}</span> Items to Repair
          <button className={styles.seedetails__button} onClick={handleSeeDetails}>
            See Details
            <MdOutlineKeyboardArrowDown />
          </button>
        </div>
      </div>

      <div className={styles.habit__overview}>
        <div className={styles.habit__card}>
          You have worn <span style={wornPercentage > 80 ? { color: "green" } : { color: "orange" }}>{wornPercentage}%</span> of your closet this month
        </div>
        <div className={styles.habit__card}>
          You have spent <span style={lastMonthSpending > userBudget ? { color: "var(--primary-rust)" } : { color: "green" }}>${lastMonthSpending}</span> on your closet this month
        </div>
      </div>

      <div className={styles.items__overview}>
        <div className={styles.list__container}>
          <h4>Your Most Worn Items This Month</h4>
          <table>
            <tbody>
              {mostWorn &&
                mostWorn.map((item) => (
                  <tr key={item._id}>
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
          <h4>Your Least Worn Items This Month</h4>
          <table>
            <tbody>
              {leastWorn &&
                leastWorn.map((item) => (
                  <tr key={item._id}>
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
      </div>
    </section>
  )
}

export default Dashboard
