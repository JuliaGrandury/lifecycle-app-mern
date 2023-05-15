import { TextField, Select, MenuItem, InputLabel, FormControl, FormControlLabel, Switch, Checkbox } from "@mui/material"
import { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { createItem } from "../features/items/itemSlice"
import styles from "./ItemForm.module.css"
import { IoCloseCircle } from "react-icons/io5"
import allCategories from "../utils/allCategories"
import ColorSphere from "./ColorSphere"

// don't need to update everytime component remounts
const colorOptions = allCategories.colors
const categoryOptions = allCategories.categories
const subcategoryOptions = allCategories.subcategories
const sizeOptions = allCategories.sizes
const seasonOptions = allCategories.seasons

const initialFormState = {
  name: "",
  brand: "",
  color: [],
  category: "",
  subcategory: "",
  size: "",
  season: [],
  inCloset: true,
  toRepair: false,
  datesWorn: [],
  value: null,
  washInstructions: null,
}

const NewItemForm = ({ onCloseForm }) => {
  const dispatch = useDispatch()
  const [newItem, setNewItem] = useState(initialFormState)
  const formRef = useRef(null)

  const handleFormChange = (event) => {
    const { name, value } = event.target
    const data = { ...newItem }
    data[name] = value
    setNewItem(data)
  }

  const handleCheckboxes = (event) => {
    const { name, value } = event.target
    // if 'Select All' is checked, update all checkboxes
    if (value.includes("Select All")) {
      if (newItem.season.length !== seasonOptions.length) {
        setNewItem((prevItem) => ({
          ...prevItem,
          season: seasonOptions,
        }))
      } else {
        setNewItem((prevItem) => ({
          ...prevItem,
          season: [],
        }))
      }
    } else {
      // if not, update the value of the clicked checkbox
      setNewItem((prevItem) => ({
        ...prevItem,
        [name]: value,
      }))
    }
  }
  // to keep track of whether all seasons are checked
  const allSeasonsChecked = () => {
    return newItem.season.length === seasonOptions.length
  }

  // appropriately change boolean values if fields are edited
  const handleSwitchChange = (event) => {
    const { name, checked } = event.target
    const data = { ...newItem }
    data[name] = checked
    setNewItem(data)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    console.log(newItem)
    dispatch(createItem(newItem))
  }

  const handleFormReset = () => {
    setNewItem(initialFormState)
    formRef.current.reset()
  }

  // should probably use useEffect with event listeners for resizing later
  const smallWindow = window.innerWidth < 700

  return (
    <div className={styles.newitem__container}>
      <form className={styles.newitem__form} onSubmit={onSubmit} ref={formRef}>
        <div className={`${styles.form__group} ${styles.form__heading}`}>
          <h3>Add an Item</h3>
          <button className={styles.close__button} onClick={() => onCloseForm()}>
            <IoCloseCircle />
          </button>
        </div>

        <div className={styles.form__group}>
          <FormControl className={styles.form__control}>
            <TextField name="name" label="Item Name" onChange={handleFormChange} size={smallWindow ? "small" : "normal"} />
          </FormControl>
          <FormControl className={styles.form__control}>
            <TextField name="brand" label="Item Brand" onChange={handleFormChange} size={smallWindow ? "small" : "normal"} />
          </FormControl>

          <FormControl className={styles.form__control}>
            <TextField name="value" label="Value" onChange={handleFormChange} size={smallWindow ? "small" : "normal"} />
          </FormControl>

          <FormControl className={styles.form__control} size={smallWindow ? "small" : "normal"}>
            <InputLabel id="color-select-label">Color</InputLabel>
            <Select labelId="color-select-label" id="color-select" name="color" label="Color" multiple value={newItem.color} onChange={handleFormChange}>
              {colorOptions.map((color) => (
                <MenuItem key={color} value={color}>
                  <div className={styles.colorOption__div}>
                    <ColorSphere color={color} />
                  </div>
                  <span>{color}</span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={styles.form__control} size={smallWindow ? "small" : "normal"}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select labelId="category-select-label" id="category-select" name="category" label="Category" value={newItem.category} onChange={handleFormChange}>
              {categoryOptions.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={styles.form__control} size={smallWindow ? "small" : "normal"}>
            <InputLabel id="subcategory-select-label">Subcategory</InputLabel>
            <Select labelId="subcategory-select-label" id="subcategory-select" name="subcategory" label="Subcategory" value={newItem.subcategory} onChange={handleFormChange}>
              {newItem.category &&
                subcategoryOptions[newItem.category].map((subcategory) => (
                  <MenuItem key={subcategory} value={subcategory}>
                    {subcategory}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl className={styles.form__control} size={smallWindow ? "small" : "normal"}>
            <InputLabel id="size-select-label">Size</InputLabel>
            <Select labelId="size-select-label" id="size-select" name="size" label="Size" value={newItem.size} onChange={handleFormChange}>
              {newItem.category &&
                sizeOptions[newItem.category].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          {/* SEASONS CHECKBOXES START HERE */}
          <FormControl className={styles.form__control} size={smallWindow ? "small" : "normal"}>
            <InputLabel id="season-select-label">Season</InputLabel>
            <Select
              labelId="season-select-label"
              name="season"
              label="Season"
              multiple
              value={newItem.season}
              onChange={handleCheckboxes}
              renderValue={(selected) => (allSeasonsChecked() ? "All Seasons" : selected.join(", "))}>
              <MenuItem value="Select All">
                <FormControlLabel control={<Checkbox checked={allSeasonsChecked()} />} label="Select All Seasons" />
              </MenuItem>
              {seasonOptions.map((option) => (
                <MenuItem key={option} value={option} className={styles.subcheckboxes}>
                  <FormControlLabel control={<Checkbox checked={newItem.season.includes(option)} />} label={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={`${styles.form__control} ${styles.washInstructions}`} size={smallWindow ? "small" : "normal"}>
            <TextField name="washInstructions" label="Wash Instructions" multiline rows={2} onChange={handleFormChange} />
          </FormControl>

          <FormControl className={styles.form__control}>
            <FormControlLabel control={<Switch name="inCloset" checked={newItem.inCloset} color="success" onChange={handleSwitchChange} />} label="In Closet" />

            <FormControlLabel control={<Switch name="toRepair" checked={newItem.toRepair} color="success" onChange={handleSwitchChange} />} label="To Repair" />
          </FormControl>

          {/* <TextField type="file" label="Choose Image" InputLabelProps={{ shrink: true }}
                        InputProps={{ accept: 'image/*', onChange: handleFormChange }} /> */}
        </div>

        <div className={styles.form__group}>
          <button className={`${styles.btn} ${styles.newitem__btn}`} type="submit" size={smallWindow ? "small" : "normal"}>
            Add Item
          </button>
          <button className={`${styles.btn} ${styles.newitem__btn}`} type="reset" onClick={handleFormReset} size={smallWindow ? "small" : "normal"}>
            Clear
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewItemForm
