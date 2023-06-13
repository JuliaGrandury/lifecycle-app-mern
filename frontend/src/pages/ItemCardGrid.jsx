import ItemCompLarge from "../components/ItemCompLarge"
import styles from "./Closets.module.css"
import { Fragment } from "react"

const ItemCardGrid = ({ items }) => {
  return (
    <div className={styles.items__container}>
      <div className={styles.item__grid}>
        {items &&
          items.map((item) => (
            <Fragment key={`large${item._id}`}>
              <ItemCompLarge item={item} />
            </Fragment>
          ))}
      </div>
    </div>
  )
}

export default ItemCardGrid
