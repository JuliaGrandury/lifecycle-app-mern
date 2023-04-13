import { useDispatch } from 'react-redux'
import { deleteItem } from '../features/items/itemSlice'
import styles from '../pages/Closets.module.css'
import default_image from '../assets/default_image.png'
import { IoCloseCircle } from 'react-icons/io5'


function ItemComponent({ item }) {
    const dispatch = useDispatch()

    return (
        <div className={styles.item__card}>
            {/* <div className={styles.item__date}>{new Date(item.createdAt).toLocaleString('en-US')}</div> */}
            <div className={styles.item__details}>
                <h2>{item.name}</h2>
                <p>from <strong>{item.brand}</strong> in Size {item.size}</p>
            </div>
            <div className={styles.item__image}><img src={default_image} alt={item.name} /></div>
            <button onClick={() => dispatch(deleteItem(item._id))} className={styles.close__button}><IoCloseCircle /></button>
        </div>
    )
}

export default ItemComponent