import { IoIosAddCircleOutline } from "react-icons/io"
import { IoSearchCircleOutline, IoFilterCircleOutline, IoPeopleCircleOutline } from "react-icons/io5"

import { GrTroubleshoot } from "react-icons/gr"
import { useState, useEffect, Fragment } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { getItems, reset, updateFilter } from "../features/items/itemSlice"
import ItemForm from "../components/ItemForm"
// import ItemCompSmall from "../components/ItemCompSmall"
import ItemCardGrid from "./ItemCardGrid"
import FilterBar from "../components/FilterBar"
import Spinner from "../components/Spinner"
import styles from "./Closets.module.css"
import squiggle_arrow from "../assets/squiggle_arrow.png"
import allCategories from "../utils/allCategories"
import Autocomplete from "@mui/material/Autocomplete"

//don't need to update everytime the component remounts
const filters = allCategories.filters

const MyCloset = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { items, isLoading, isError, message, filterObject } = useSelector((state) => state.items)
  const [searchQuery, setSearchQuery] = useState("")

  const [selectedAction, setSelectedAction] = useState({
    search: false,
    filter: false,
    add: false,
    share: false,
  })

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate("/authentication")
    }

    dispatch(getItems(filterObject))

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch, filterObject])

  if (isLoading) {
    return <Spinner />
  }

  const handleFilter = (sortValue) => {
    dispatch(updateFilter({ ...filterObject, sort: sortValue }))
    setSelectedAction({ ...selectedAction, filter: false })
  }

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
  }

  const submitSearch = (event) => {
    event.preventDefault()
    dispatch(updateFilter({ ...filterObject, search: searchQuery }))
  }

  const handleShare = (event) => {
    toast("Fear not, our developers were alerted and this feature is being fixed")
  }

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
            <button className={styles.action__button} onClick={() => setSelectedAction({ search: !selectedAction.search, filter: false, add: false, share: false })}>
              <IoSearchCircleOutline />
            </button>
          </li>

          {/* SORTING FILTER SELECTION */}
          <li>
            <div className={styles.dropdown__container}>
              <button
                className={styles.action__button}
                style={selectedAction.filter ? { color: "var(--primary-galactic)" } : null}
                onClick={() => setSelectedAction({ search: false, filter: !selectedAction.filter, add: false, share: false })}>
                <IoFilterCircleOutline />
              </button>
              <div>
                {selectedAction.filter && (
                  <ul className={styles.dropdown__list}>
                    {Object.entries(filters).map(([label, value]) => (
                      <li key={label} onClick={() => handleFilter(value)}>
                        {label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </li>

          {/* SHARE CLOSET WITH OTHERS */}
          <li>
            <div className={styles.dropdown__container}>
              <button className={styles.action__button} onClick={() => setSelectedAction({ search: false, filter: false, add: !selectedAction.add, share: false })}>
                <IoIosAddCircleOutline />
              </button>
              {/* <div>{selectedAction.share && <Autocomplete />}</div> */}
            </div>
          </li>

          <li>
            <button
              className={styles.action__button}
              onClick={() => {
                setSelectedAction({ search: false, filter: false, add: false, share: !selectedAction.share })
                handleShare()
              }}>
              <IoPeopleCircleOutline />
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
                <GrTroubleshoot /> Uh oh, looks like there's a problem.
              </strong>
              <span>Please refresh or try again later.</span>
            </h3>
          </div>
        ) : items.length > 0 ? (
          <ItemCardGrid items={items} />
        ) : filterObject ? (
          <div style={{ color: "grey", textAlign: "center", marginTop: "10%" }}>
            <h3 style={{ fontWeight: 400 }}>No items corresponding to this search.</h3>
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
