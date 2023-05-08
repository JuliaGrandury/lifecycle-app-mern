import { useDispatch } from "react-redux"
import { deleteItem } from "../features/items/itemSlice"
import styles from "../pages/Closets.module.css"
import default_image from "../assets/default_image.png"
import { IoCloseCircle } from "react-icons/io5"
import { SlOptionsVertical } from "react-icons/sl"
import ColorSphere from "./ColorSphere"

function ItemCompSmall({ item }) {
  const dispatch = useDispatch()

  const openDetailedCard = (id) => {
    console.log(`Opening Detailed Card for item ${id}`)
  }

  return (
    <div className={styles.item__card} onClick={() => openDetailedCard(item._id)}>
      {/* <div className={styles.item__date}>{new Date(item.createdAt).toLocaleString('en-US')}</div> */}
      <div className={styles.item__header}>
        <h2>{item.name}</h2>
        <div className={styles.item__details}>
          <span>
            Size {item.size} {item.brand ? `, ${item.brand}` : ""}
          </span>
          <span>
            <ColorSphere color={item.color} />
          </span>
        </div>
      </div>
      <div className={styles.item__image}>
        <img src={default_image} alt={item.name} />
      </div>
      {/* <button>
        <SlOptionsVertical className={styles.close__button} />
      </button> */}
      <button onClick={() => dispatch(deleteItem(item._id))} className={styles.close__button}>
        <IoCloseCircle />
      </button>
    </div>
  )
}

export default ItemCompSmall
