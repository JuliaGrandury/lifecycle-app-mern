import { TextField, Select, MenuItem, InputLabel, FormControl, FormControlLabel, Switch, Checkbox } from '@mui/material'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { createItem } from '../features/items/itemSlice'
import styles from './ItemForm.module.css'
import { IoCloseCircle } from 'react-icons/io5'
import allCategories from '../utils/allCategories'

// don't need to update everytime component remounts
const colorOptions = allCategories.colors;
const categoryOptions = allCategories.categories;
const subcategoryOptions = allCategories.subcategories;
const sizes = allCategories.sizes;
const seasonOptions = allCategories.seasons;


const NewItemForm = ({ onCloseForm }) => {
    
    const dispatch = useDispatch()
    const [newItem, setNewItem] = useState({
        name: '',
        brand: '',
        color: '',
        category: '',
        subcategory: '',
        size: '',
        season: [],
        inCloset: true,
        toRepair: false
    })
    const [subcategories, setSubcategories] = useState([]);
    const [sizeOptions, setSizeOptions] = useState([]);

    const handleFormChange = (event) => {

        const { name, value } = event.target;

        // change subcategory options displayed depending on category selected
        if (name === 'category') {
            switch (value) {
                case "Tops":
                    setSubcategories(subcategoryOptions[value]);
                    setSizeOptions(sizes[value]);
                    break;
                case "Bottoms":
                    setSubcategories(subcategoryOptions[value]);
                    setSizeOptions(['0', '2', '4', '6', '8', '10', '12', '14', 'P/XS', 'XS', 'XS/S', 'S', 'M', 'M/L', 'L', 'XL']);
                    break;
                case "Dresses and Jumpsuits":
                    setSubcategories(subcategoryOptions[value]);
                    setSizeOptions(['0', '2', '4', '6', '8', '10', '12', '14', 'P/XS', 'XS', 'XS/S', 'S', 'M', 'M/L', 'L', 'XL']);
                    break;
                case "Coats and Jackets": 
                    setSubcategories(subcategoryOptions[value]);
                    setSizeOptions(['0', '2', '4', '6', '8', '10', '12', '14', 'P/XS', 'XS', 'XS/S', 'S', 'M', 'M/L', 'L', 'XL']);
                    break;
                case "Shoes":
                    setSubcategories(subcategoryOptions[value]);
                    setSizeOptions([`Women's 6`, `Women's 6.5`, `Women's 7`, `Women's 7.5`, `Women's 8`, `Women's 8.5`, `Women's 9`, `Women's 9.5`, `Women's 10`, `Men's 7`,
                        `Men's 7.5`, `Men's 8`, `Men's 8.5`, `Men's 9`, `Men's 9.5`, `Men's 10`, `Men's 10.5`, `Men's 11`, `Men's 11.5`, `Men's 12`, `Men's 12.5`,
                        `Men's 13`, `Men's 13.5`, `Men's 14`, `Men's 14.5`, `Men's 15`]);
                    break;
                case "Accessories":
                    setSubcategories(subcategoryOptions[value]);
                    setSizeOptions([]);
                    break;
                default:
                    setSubcategories([]);
                    setSizeOptions([]);
                    break;
            }
            const data = { ...newItem };
            data[name] = value;
            setNewItem(data);
        }

        else {
            const data = { ...newItem };
            data[name] = value;
            setNewItem(data);
        }
    }

    const handleCheckboxes = (event) => {
        const { name, value } = event.target;
        // if 'Select All' is checked, update all checkboxes
        if (value.includes('Select All')) {
            if (newItem.season.length !== seasonOptions.length) {
                setNewItem((prevItem) => ({
                    ...prevItem,
                    season: seasonOptions,
                }));
            } else {
                setNewItem((prevItem) => ({
                    ...prevItem,
                    season: [],
                }));
            }
        } else { // if not, update the value of the clicked checkbox
            setNewItem((prevItem) => ({
                ...prevItem,
                [name]: value,
            }));
        }
    }
    // to keep track of whether all seasons are checked
    const allSeasonsChecked = () => {
        return newItem.season.length === seasonOptions.length;
    }

    // appropriately change boolean values if fields are edited
    const handleSwitchChange = (event) => {
        const { name, checked } = event.target;
        const data = { ...newItem };
        data[name] = checked;
        setNewItem(data);
    }

    const onSubmit = (event) => {
        event.preventDefault()
        console.log(newItem)

        dispatch(createItem(newItem))
        // onResetForm()
        // onCloseForm()
    }

    const onResetForm = (event) => {
        setNewItem({
            name: '',
            color: '',
            category: '',
            subcategory: '',
            size: '',
            season: [],
            inCloset: true,
            toRepair: false
        });
    }


    return (
        <div className={styles.newitem__container}>
            <form className={styles.newitem__form} onSubmit={onSubmit}>
                <div className={`${styles.form__group} ${styles.form__heading}`}>
                    <h3>Add an Item</h3>
                    <button className={styles.close__button} onClick={() => onCloseForm()}><IoCloseCircle /></button>
                </div>
                <div className={styles.form__group}>

                    <FormControl className={styles.form__control}><TextField name="name" label="Item Name" onChange={handleFormChange} /></FormControl>
                    <FormControl className={styles.form__control}><TextField name="brand" label="Item Brand" onChange={handleFormChange} /></FormControl>

                    <FormControl className={styles.form__control}>
                        <InputLabel id="color-select-label" >Color</InputLabel>
                        <Select labelId="color-select-label" id="color-select" name="color" label="Color" value={newItem.color} onChange={handleFormChange}>
                            {colorOptions.map((color) => (
                                <MenuItem key={color} value={color}>{color}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className={styles.form__control}>
                        <InputLabel id="category-select-label">Category</InputLabel>
                        <Select labelId="category-select-label" id="category-select" name="category" label="Category" value={newItem.category} onChange={handleFormChange}>
                            {categoryOptions.map((category) => (
                                <MenuItem key={category} value={category}>{category}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    
                        <FormControl className={styles.form__control}>
                            <InputLabel id="subcategory-select-label">Subcategory</InputLabel>
                            <Select labelId="subcategory-select-label" id="subcategory-select" name="subcategory" label="Subcategory" value={newItem.subcategory} onChange={handleFormChange}>
                                {subcategories.map((subcategory) => (
                                    <MenuItem key={subcategory} value={subcategory}>{subcategory}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    

                    <FormControl className={styles.form__control}>
                        <InputLabel id="size-select-label" >Size</InputLabel>
                        <Select labelId="size-select-label" id="size-select" name="size" label="Size" value={newItem.size} onChange={handleFormChange}>
                            {sizeOptions.map((option) => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* SEASONS CHECKBOXES START HERE */}
                    <FormControl className={styles.form__control}>
                        <InputLabel id="season-select-label">Season</InputLabel>
                        <Select labelId="season-select-label" name="season" label="Season" multiple value={newItem.season} onChange={handleCheckboxes} renderValue={(selected) => allSeasonsChecked() ? 'All Seasons' : selected.join(', ')}>
                            <MenuItem value="Select All" >
                                <FormControlLabel control={<Checkbox checked={allSeasonsChecked()} />} label="Select All Seasons" />
                            </MenuItem>
                            {seasonOptions.map((option) => (
                                <MenuItem key={option} value={option} className={styles.subcheckboxes}>
                                    <FormControlLabel control={<Checkbox checked={newItem.season.includes(option)} />} label={option} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className={styles.form__control}>
                        <FormControlLabel control={<Switch name="inCloset" checked={newItem.inCloset} color="success" onChange={handleSwitchChange} />} label="In Closet" />
                    </FormControl>
                    <FormControl className={styles.form__control}>
                        <FormControlLabel control={<Switch name="toRepair" checked={newItem.toRepair} color="success" onChange={handleSwitchChange} />} label="To Repair" />
                    </FormControl>

                    {/* <TextField type="file" label="Choose Image" InputLabelProps={{ shrink: true }}
                        InputProps={{ accept: 'image/*', onChange: handleFormChange }} /> */}
                </div>

                <div className={styles.form__group}>
                    <button className={styles.action__button} type="submit">Add Item</button>
                    <button className={`${styles.action__button} ${styles.danger}`} onClick={onResetForm}>Clear</button>
                </div>

            </form >
        </div >
    )
}

export default NewItemForm