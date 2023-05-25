import Tag from "./Tag"
import { MdNavigateNext } from "react-icons/md"
import { useEffect, useState } from "react"
import styles from "../pages/Closets.module.css"
import allCategories from "../utils/allCategories"
import { updateFilter } from "../features/items/itemSlice"
import { useSelector, useDispatch } from "react-redux"

const categoryOptions = allCategories.categories
const subcategoryOptions = allCategories.subcategories

const FilterBar = () => {
  const dispatch = useDispatch()
  const { filterObject } = useSelector((state) => state.items)

  const onClickTag = (option) => {
    if (categoryOptions.includes(option)) {
      if (option === filterObject.category) {
        dispatch(updateFilter({ category: null, subcategory: null }))
      } else {
        dispatch(updateFilter({ category: option, subcategory: null }))
      }
    } else if (subcategoryOptions[filterObject.category]?.includes(option)) {
      if (option === filterObject.subcategory) {
        dispatch(updateFilter({ ...filterObject, subcategory: null }))
      } else {
        dispatch(updateFilter({ ...filterObject, subcategory: option }))
      }
    }
  }

  return (
    <>
      {!filterObject.category && !filterObject.subcategory ? (
        <ul className={styles.filterbar__list}>
          {categoryOptions.map((option) => (
            <li key={option}>
              <button onClick={() => onClickTag(option)}>
                <Tag label={option} color={"galactic"} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}

      {filterObject.category && !filterObject.subcategory && (
        <ul className={styles.filterbar__list}>
          <li>
            <button onClick={() => onClickTag(filterObject.category)}>
              <Tag label={filterObject.category} color={"tasman"} />
            </button>
          </li>
          <li>
            <MdNavigateNext />
          </li>
          {subcategoryOptions[filterObject.category]?.map((option) => (
            <li key={option}>
              <button onClick={() => onClickTag(option)}>
                <Tag label={option} color={"galactic"} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {filterObject.category && filterObject.subcategory && (
        <ul className={styles.filterbar__list}>
          <li>
            <button onClick={() => onClickTag(filterObject.category)}>
              <Tag label={filterObject.category} color={"tasman"} />
            </button>
          </li>
          <li>
            <MdNavigateNext />
          </li>
          <li>
            <button onClick={() => onClickTag(filterObject.subcategory)}>
              <Tag label={filterObject.subcategory} color={"tasman"} />
            </button>
          </li>
        </ul>
      )}
    </>
  )
}

export default FilterBar
