// hook and library imports
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { motion } from "framer-motion"

import { CiEdit } from "react-icons/ci"
import { HiOutlineDocumentDuplicate } from "react-icons/hi"
import { AiOutlineDelete } from "react-icons/ai"
import { CgFolderAdd } from "react-icons/cg"
import { FaHandHoldingHeart } from "react-icons/fa"

// in app imports
import { deleteItem, createItem } from "../features/items/itemSlice"
import default_image from "../assets/default_image.png"
import ColorSphere from "./ColorSphere"
import styles from "../pages/Closets.module.css"

function ItemCompLarge({ item, onClose }) {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [isOwner, setIsOwner] = useState(true)

  const handleEditItem = (id) => {
    console.log(`Editing item with id ${id}`)
  }
  const handleDuplicateItem = (item) => {
    dispatch(createItem(item))
  }
  const handleDeleteItem = (id) => {
    console.log(`Deleting item with id ${id}`)
    dispatch(deleteItem(id))
  }

  const handleAddItemToList = (id) => {
    console.log(`Adding item ${id} to List`)
    //dispatch(addItemToList(id))
  }

  const handleBorrowRequest = (id) => {
    console.log(`User requested to borrow item ${id}`)
  }

  // useEffect(() => {
  //   if (onClose) {
  //     document.body.style.overflow = ""
  //   } else {
  //     console.log("ItemCompLarge is Open")
  //     document.body.style.overflow = "hidden"
  //   }
  // }, [onClose])

  return (
    <>
      {isOpen && <div className={styles.overlay}></div>}
      <motion.div
        transition={{ layout: { duration: 1, type: "spring" } }}
        layout
        style={{ borderRadius: "1rem" }}
        className={isOpen ? `${styles.item__card} ${styles.expanded__card}` : `${styles.item__card}`}
        onClick={() => setIsOpen(!isOpen)}>
        <motion.div className={styles.item__header}>
          <motion.h2 layout="position">{item.name}</motion.h2>
          <div className={styles.item__details}>
            <span>
              Size {item.size} {item.brand ? `, ${item.brand}` : ""}
            </span>
            <span className={styles.colors__span}>{item.color && item.color.map((color) => <ColorSphere color={color} key={`${color}${item._id}`} />)}</span>
          </div>
        </motion.div>
        {item.location && <div className={styles.location__tag}>{item.location.name}</div>}
        <div className={styles.item__image}>
          <img src={default_image} alt={item.name} />
        </div>
        {isOpen && (
          <motion.div className={styles.item__moredetails} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <table>
              <tbody>
                <tr>
                  <td>Category</td>
                  <td>{item.category}</td>
                </tr>
                <tr>
                  <td>Subcategory</td>
                  <td>{item.subcategory}</td>
                </tr>
                <tr>
                  <td>Added On</td>
                  <td>{new Date(item.createdAt).toLocaleDateString("en-US")}</td>
                </tr>
                <tr>
                  <td>Times Worn</td>
                  <td>{item.datesWorn && item.datesWorn.length}</td>
                </tr>
                <tr>
                  <td>Value</td>
                  <td>{item.value}</td>
                </tr>
                <tr>
                  <td>Washing Instructions</td>
                  <td>{item.washInstructions}</td>
                </tr>
              </tbody>
            </table>

            {isOwner ? (
              <div className={styles.largecard__actions}>
                <button className="btn" id="editItem" onClick={() => handleEditItem(item._id)}>
                  <CiEdit />
                </button>
                <button className="btn" id="duplicateItem" onClick={() => handleDuplicateItem(item)}>
                  <HiOutlineDocumentDuplicate />
                </button>
                <button className="btn" id="deleteItem" onClick={() => handleDeleteItem(item._id)}>
                  <AiOutlineDelete />
                </button>
                <button className="btn" id="addItemToList" onClick={() => handleAddItemToList(item._id)}>
                  <CgFolderAdd />
                </button>
              </div>
            ) : (
              <div className={styles.largecard__actions}>
                <button className="btn">Add to Favorites</button>
                <button className="btn" onClick={() => handleBorrowRequest(item._id)}>
                  <FaHandHoldingHeart />
                </button>
                <button className="btn">Request to Swap</button>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </>
  )
}

export default ItemCompLarge
