import { useState, useEffect, Fragment } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getLists } from "../features/lists/listSlice"
import ItemCompLarge from "../components/ItemCompLarge"
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
            <h5 style={{ color: "orange" }}>Selected list is {selected.listname}</h5>
            {selected.items.length > 0 ? (
              <div className={styles.item__grid}>
                {selected.items.map((item) => (
                  <Fragment key={`large${item._id}`}>
                    <ItemCompLarge item={item} />
                  </Fragment>
                ))}
              </div>
            ) : (
              <div className={styles.emptycloset__div}>
                <h3>There are no items in your list. Add items here.</h3>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default MyLists
