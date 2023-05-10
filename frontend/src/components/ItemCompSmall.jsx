// hook and library imports
import { useState } from "react"

// in app imports
import default_image from "../assets/default_image.png"
import ColorSphere from "./ColorSphere"
import styles from "../pages/Closets.module.css"

function ItemCompSmall({ item }) {

  return (
    <div className={styles.item__card}>
      <div className={styles.item__header}>
        <h2>{item.name}</h2>
        <div className={styles.item__details}>
          <span>
            Size {item.size} {item.brand ? `, ${item.brand}` : ""}
          </span>
          <span>
            {item.color.map((color) => (
              <ColorSphere color={color} key={`${color}${item._id}`} />
            ))}
          </span>
        </div>
      </div>
      <div className={styles.item__image}>
        <img src={default_image} alt={item.name} />
      </div>
    </div>
  )
}

export default ItemCompSmall
