import { IoAddCircle, IoSearchCircle, IoFilterCircle } from "react-icons/io5"
import { GrTroubleshoot } from "react-icons/gr"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { getItems } from "../features/items/itemSlice"
import ItemForm from "../components/ItemForm"
import ItemCompSmall from "../components/ItemCompSmall"
import ItemCompLarge from "../components/ItemCompLarge"
import FilterBar from "../components/FilterBar"
import Spinner from "../components/Spinner"
import styles from "./Closets.module.css"
import squiggle_arrow from "../assets/squiggle_arrow.png"
import allCategories from "../utils/allCategories"

//don't need to update everytime the component remounts
const filters = allCategories.filters

const MyCloset = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { items, isLoading, isError, message } = useSelector((state) => state.items)
  const [searchQuery, setSearchQuery] = useState("")

  const [selectedAction, setSelectedAction] = useState({
    search: false,
    filter: false,
    add: false,
  })

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

  const handleFilter = (filter) => {
    console.log(`The selected filter is ${filter}`)
    toast("This feature is currently in development. Please check back at a later time.")
  }

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
    toast("This feature is currently in development. Please check back at a later time.")
  }

  const submitSearch = (event) => {
    event.preventDefault()
    console.log(searchQuery)
    toast("This feature is currently in development. Please check back at a later time.")
  }

  // const handleLargeCardVisiblity = (eltClicked, id) => {
  //   if (eltClicked !== "editItem" || eltClicked !== "duplicateItem" || eltClicked !== "deleteItem") {
  //     if (openCardId) {
  //       setOpenCardId(null)
  //     } else {
  //       setOpenCardId(id)
  //     }
  //   }
  // }

  return (
    <>
      <section className={styles.closet__toolbar}>
        {/* CATEGORY FILTER SELECTION */}
        <FilterBar />

        {/* SEARCH INPUT */}
        <ul className={styles.closet__toolbar__right}>
          {selectedAction.search && (
            <li>
              <form onSubmit={submitSearch}>
                <input type="text" placeholder="Search" className={styles.search__input} value={searchQuery} onChange={handleSearch} />
              </form>
            </li>
          )}
          <li>
            <button className={styles.action__button} onClick={() => setSelectedAction({ search: !selectedAction.search, filter: false, add: false })}>
              <IoSearchCircle />
            </button>
          </li>

          {/* SORTING FILTER SELECTION */}
          <li>
            <div className={styles.dropdown__container}>
              <button
                className={styles.action__button}
                style={selectedAction.filter ? { color: "var(--primary-galactic)" } : null}
                onClick={() => setSelectedAction({ search: false, filter: !selectedAction.filter, add: false })}>
                <IoFilterCircle />
              </button>
              <div>
                {selectedAction.filter && (
                  <ul className={styles.dropdown__list}>
                    {filters.map((option) => (
                      <li key={option} onClick={() => handleFilter(option)}>
                        {option}
                      </li>
                    ))}
                  </ul>
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

      {/* NEW ITEM FORM WHICH SHOULD BE TURNED INTO A MODAL WITH OVERLAY */}
      {selectedAction.add && (
        <div className={styles.overlay}>
          <ItemForm onCloseForm={() => setSelectedAction({ add: false })} />
        </div>
      )}

      <div className={styles.items__container}>
        {isError ? (
          <div className={styles.error__div}>
            <h3>
              <strong>
                <GrTroubleshoot /> Uh oh, looks like someone fucked up.
              </strong>
              <span>Please refresh or try again later.</span>
            </h3>
          </div>
        ) : items.length > 0 ? (
          <div className={styles.item__grid}>
            {items &&
              items.map((item) => (
                <>
                  {/* <ItemCompSmall key={`small${item._id}`} item={item} /> */}
                  <ItemCompLarge key={`large${item._id}`} item={item} />
                </>
              ))}
          </div>
        ) : (
          <div className={styles.emptycloset__div}>
            <h3>Your closet is empty. Add items here.</h3>
            <img src={squiggle_arrow} alt="Arrow pointing to the Add An Item Form" />
          </div>
        )}
      </div>
    </>
  )
}

export default MyCloset
