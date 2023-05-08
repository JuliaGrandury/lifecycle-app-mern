import { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteItem } from "../features/items/itemSlice"
import styles from "../pages/Closets.module.css"
import default_image from "../assets/default_image.png"
import { IoCloseCircle } from "react-icons/io5"
import { CiCircleMore } from "react-icons/ci"
import { AiOutlineDelete } from "react-icons/ai"
import { FiEdit3 } from "react-icons/fi"
import { HiOutlineDuplicate } from "react-icons/hi"
import ColorSphere from "./ColorSphere"

function ItemCompSmall({ item }) {
  const dispatch = useDispatch()
  const [dropdownId, setDropdownId] = useState(null)

  const openDetailedCard = (id) => {
    console.log(`Opening Detailed Card for item ${id}`)
    alert(`Opening Detailed Card for item ${id}`)
  }

  const handleEditItem = (id) => {
    console.log(`Editing item with id ${id}`)
  }
  const handleDuplicateItem = (id) => {
    console.log(`Duplicating item with id ${id}`)
  }
  const handleDeleteItem = (id) => {
    console.log(`Deleting item with id ${id}`)
  }

  return (
    <div className={styles.item__card} onDoubleClick={() => openDetailedCard(item._id)}>
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

      <div className={`${styles.dropdown__container} ${styles.more__button}`}>
        <button className={styles.more__button}>
          <CiCircleMore onClick={() => dropdownId === item._id ? setDropdownId(null) : setDropdownId(item._id)}/>
        </button>
        {dropdownId === item._id ? (
          <ul className={styles.dropdown__itemactions}>
            <li onClick={() => handleEditItem(item.id)}>
              <FiEdit3 /> Edit
            </li>
            <li onClick={() => handleDuplicateItem(item.id)}>
              <HiOutlineDuplicate /> Duplicate
            </li>
            <li onClick={() => handleDeleteItem(item.id)}>
              <AiOutlineDelete /> Delete
            </li>
          </ul>
        ) : (
          <></>
        )}
      </div>
      {/* <button onClick={() => dispatch(deleteItem(item._id))} className={styles.close__button}>
        <IoCloseCircle />
      </button> */}
    </div>
  )
}

export default ItemCompSmall
