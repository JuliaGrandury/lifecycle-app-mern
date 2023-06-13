import { useState, useEffect, Fragment } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getLists } from "../features/lists/listSlice"
import ItemCardGrid from "./ItemCardGrid"
import styles from "./Lists.module.css"
import { format } from "date-fns"

const MyLists = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { lists, isLoading, isError, message } = useSelector((state) => state.lists)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate("/authentication")
    }
    dispatch(getLists())
  }, [user, navigate, isError, message, dispatch])

  const getListItems = (itemIds) => {
    const listitems = []
    return listitems
  }

  return (
    <section>
      <table className={styles.list__table}>
        <tbody>
          {lists.map((list) => (
            <tr key={list.listname} className={selected && list._id === selected._id ? `${styles.selected}` : ""} onClick={() => setSelected(list)}>
              <td>{list.listname}</td>
              <td>{list.description}</td>
              <td>{list.public ? "Public" : "Private"}</td>
              <td>{list.items.length}</td>
              <td>{format(new Date(list.createdAt), "MMMM dd, yyyy")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.division}></div>

      <div className={styles.onDisplay}>
        {!selected ? (
          <div style={{ color: "var(--primary-grey)", textAlign: "center", marginTop: "10%", fontSize: "25px" }}>
            <h5 style={{ fontWeight: "400" }}>No List Selected</h5>
          </div>
        ) : (
          <div className={styles.items__container}>
            {selected.items.length > 0 ? (
              <ItemCardGrid items={selected.items} />
            ) : (
              <div style={{ color: "var(--primary-grey)", textAlign: "center", marginTop: "10%", fontSize: "25px" }}>
                <h5 style={{ fontWeight: "400" }}>There are no items in your list.</h5>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default MyLists
