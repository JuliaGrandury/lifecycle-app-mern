import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getItems, reset } from '../features/items/itemSlice'
import ItemForm from '../components/ItemForm'
import ItemComponent from '../components/ItemComponent'
import Spinner from '../components/Spinner'
import styles from './Closets.module.css'
import { IoAddCircle } from 'react-icons/io5'
import { useState } from 'react'

const Closets = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { items, isLoading, isError, message } = useSelector((state) => state.items)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/authentication')
    }

    dispatch(getItems())

    // return () => {
    //   dispatch(reset())
    // }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  const closeItemForm = () => {
    setShowForm(false)
  }

  return (
    <>
      <section className={styles.closet__heading}>
        <h1>Welcome to your closet {user && user.username}</h1>
        <button className={styles.action__button} onClick={() => setShowForm(true)}><IoAddCircle /></button>
      </section>

      {showForm ? <ItemForm onCloseForm={closeItemForm}/> : <></>}

      <section className={styles.items__container}>
        {items.length > 0 ? (
          <div className={styles.item__grid}>
            {items.map((item) => (
              <ItemComponent key={item._id} item={item} />
            ))}
          </div>
        ) : (<h3>Your closet is empty</h3>)}
      </section>
    </>
  )
}

export default Closets