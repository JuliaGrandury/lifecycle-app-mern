import { IoAddCircle, IoSearchCircle, IoFilterCircle } from "react-icons/io5"
import { GrTroubleshoot } from "react-icons/gr"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getItems, reset } from "../features/items/itemSlice"
import ItemForm from "../components/ItemForm"
import ItemCompSmall from "../components/ItemCompSmall"
import FilterBar from "../components/FilterBar"
import Spinner from "../components/Spinner"
import styles from "./Closets.module.css"
import { toast } from "react-toastify"
import squiggle_arrow from "../assets/squiggle_arrow.png"
import allCategories from "../utils/allCategories"

//don't need to update everytime the component remounts
const filters = allCategories.filters

const MyCloset = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { items, isLoading, isError, message } = useSelector((state) => state.items)
  const [showForm, setShowForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const [selectedAction, setSelectedAction] = useState({
    search: false,
    filter: false,
    add: false,
  })

  const [selectedBtn, setSelectedBtn] = useState("")

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate("/authentication")
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

  const handleFilter = () => {
    toast("This feature is currently in development. Please check back at a later time.")
  }

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
  }

  const submitSearch = (event) => {
    event.preventDefault()
    console.log(searchQuery)
    // setSearchActive(false)
  }

  return (
    <>
      <section className={styles.closet__toolbar}>
        <FilterBar />
        <ul className={styles.closet__toolbar__right}>
          {selectedAction.search ? (
            <li>
              <form onSubmit={submitSearch}>
                <input type="text" placeholder="Search" className={styles.search__input} value={searchQuery} onChange={handleSearch} />
              </form>
            </li>
          ) : (
            <></>
          )}
          <li>
            {/* (prevState) => ({ ...prevState, search: !selectedAction.search }) */}
            <button className={styles.action__button} onClick={() => setSelectedAction({ search: !selectedAction.search, filter: false, add: false })}>
              <IoSearchCircle />
            </button>
          </li>

          <li>
            <div className={styles.dropdown__container}>
              <button
                className={styles.action__button}
                style={selectedAction.filter ? { color: "var(--primary-galactic)" } : null}
                onClick={() => setSelectedAction({ search: false, filter: !selectedAction.filter, add: false })}>
                <IoFilterCircle />
              </button>
              <div>
                {selectedAction.filter ? (
                  <ul className={styles.dropdown__list}>
                    {filters.map((option) => (
                      <li key={option}>{option}</li>
                    ))}
                  </ul>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </li>

          <li>
            <button className={styles.action__button} onClick={() => setSelectedAction({ search: false, filter: false, add: !selectedAction.add })}>
              <IoAddCircle />
            </button>
          </li>
        </ul>
      </section>
      {selectedAction.add ? <ItemForm onCloseForm={closeItemForm} /> : <></>}

      <section className={styles.items__container}>
        {isError ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "400px" }}>
            <h3 style={{ display: "flex", flexDirection: "column", textAlign: "center", fontSize: "20px", backgroundColor: "var(--primary-lightblue)", borderRadius: "5px", color: "#333", fontWeight: "400", padding: "50px 50px" }}>
              <strong><GrTroubleshoot /> Uh oh, looks like someone fucked up.</strong>
              <span>Please refresh or try again later.</span>
            </h3>
          </div>
        ) : items.length > 0 ? (
          <div className={styles.item__grid}>{items && items.map((item) => <ItemCompSmall key={item._id} item={item} />)}</div>
        ) : (
          <div
            style={{
              height: "700px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "right",
              alignItems: "center",
            }}>
            <h3 style={{ color: "var(--primary-galactic)", fontSize: "25px" }}>Your closet is empty. Add items here.</h3>
            <img style={{ padding: "0px 60px 60px 30px" }} src={squiggle_arrow} alt="" />
          </div>
        )}
      </section>
    </>
  )
}

export default MyCloset
