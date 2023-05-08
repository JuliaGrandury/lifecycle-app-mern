import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Statistics.module.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const mostWorn = [
  { rank: 1, name: "Zara Men Puff Jacket", image: null, timesWorn: 3 },
  { rank: 2, name: "DVF Coral Design Dress", image: null, timesWorn: 15 },
];

const Statistics = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/authentication");
    }
  }, [user, navigate]);

  return (
    <section className={styles.cards__container}>
      {/* <div className={styles.overview__container}> */}

      <div className={styles.grid__stats}>
        <div className={styles.single_stat}>
          <span>176</span> Items in Closet
          <button className={styles.details__button}>
            See Details
            <MdOutlineKeyboardArrowDown />
          </button>
        </div>
        <div className={styles.single_stat}>
          <span>3</span> Items out of Closet
        </div>
        <div className={styles.single_stat}>
          <span>2</span> Items to Repair
        </div>
      </div>

      <div className={styles.flex_stats}>
        <div className={styles.single_stat}>
          You have worn <span>40%</span> of your closet this month
        </div>
        <div className={styles.single_stat}>
          You have spent <span>100$</span> on your closet this month
        </div>
      </div>

      {/* </div> */}

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
    </section>
  )
};

export default Statistics;
