import { TextField, Select, MenuItem, InputLabel, FormControl, FormControlLabel, Switch } from '@mui/material'
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"


const NewItemForm = () => {

    const [newItem, setNewItem] = useState({
        name: '',
        color: '',
        category: '',
        subcategory: '',
        size: '',
        season: '',
        inCloset: true,
        toRepair: false
    })
    const [subcategories, setSubcategories] = useState([]);
    const [sizeOptions, setSizeOptions] = useState([]);

    const onSubmit = (event) => {
        event.preventDefault()
    }

    const handleFormChange = (event) => {

        const { name, value, checked } = event.target;

        if (name === 'inCloset' || name === 'toRepair') {
            console.log(`setting ${name} to ${checked}`)
            const data = { ...newItem };
            data[name] = checked;
            setNewItem(data);
        } else {
            const data = { ...newItem };
            data[name] = value;
            setNewItem(data);
        }

        // change subcategory options displayed depending on category selected
        if (name === 'category') {
            switch (value) {
                case "Tops":
                    setSubcategories(['Blouses', 'Shirts', 'Sweaters', 'Tank Tops', 'T-shirts', 'Sweatshirts', 'Coats & Jackets']);
                    setSizeOptions(['0', '2', '4', '6', '8', '10', '12', '14', 'P/XS', 'XS', 'XS/S', 'S', 'M', 'M/L', 'L', 'XL']);
                    break;
                case "Bottoms":
                    setSubcategories(['Jeans', 'Leggings', 'Pants', 'Shorts', 'Skirts', 'Sweatpants']);
                    setSizeOptions(['0', '2', '4', '6', '8', '10', '12', '14', 'P/XS', 'XS', 'XS/S', 'S', 'M', 'M/L', 'L', 'XL']);
                    break;
                case "Dresses and Jumpsuits":
                    setSubcategories(['Jumpsuits', 'Mini dresses', 'Midi dresses', 'Maxi dresses', 'Overalls']);
                    setSizeOptions(['0', '2', '4', '6', '8', '10', '12', '14', 'P/XS', 'XS', 'XS/S', 'S', 'M', 'M/L', 'L', 'XL']);
                    break;
                case "Shoes":
                    setSubcategories([]);
                    setSizeOptions([`Women's 6`, `Women's 6.5`, `Women's 7`, `Women's 7.5`, `Women's 8`, `Women's 8.5`, `Women's 9`, `Women's 9.5`, `Women's 10`, `Men's 7,`
                        `Men's 7.5`, `Men's 8,` `Men's 8.5`, `Men's 9,` `Men's 9.5`, `Men's 10`, `Men's 10.5`, `Men's 11`, `Men's 11.5`, `Men's 12`, `Men's 12.5`,
                        `Men's 13`, `Men's 13.5`, `Men's 14`, `Men's 14.5`, `Men's 15`]);
                    break;
                case "Accessories":
                    setSubcategories(['Bags', 'Belts', 'Gloves', 'Hats', 'Jewelry', 'Scarves', 'Sunglasses']);
                    setSizeOptions([]);
                    break;
                default:
                    setSubcategories([]);
                    setSizeOptions([]);
                    break;
            }
        }

        // const file = e.target.files[0];
    }



    return (
        <div className="newitem__container">
            <form onSubmit={onSubmit}>
                <div className="form__group">
                    <h3>Add an Item</h3>
                </div>
                <div className="form__group">

                    <TextField name="name" label="Item Name" InputLabelProps={{ shrink: true }} onChange={handleFormChange} />

                    <FormControl fullWidth style={{ width: 200 }}>
                        <InputLabel id="color-select-label" >Color</InputLabel>
                        <Select labelId="color-select-label" id="color-select" name="color" label="Color" value={newItem.color} onChange={handleFormChange}>
                            <MenuItem value={'Beige'}>Beige</MenuItem>
                            <MenuItem value={'Black'}>Black</MenuItem>
                            <MenuItem value={'Blue'}>Blue</MenuItem>
                            <MenuItem value={'Brown'}>Brown</MenuItem>
                            <MenuItem value={'Green'}>Green</MenuItem>
                            <MenuItem value={'Grey'}>Grey</MenuItem>
                            <MenuItem value={'Magenta'}>Magenta</MenuItem>
                            <MenuItem value={'Metallic'}>Metallic</MenuItem>
                            <MenuItem value={'Multicolor'}>Multicolor</MenuItem>
                            <MenuItem value={'Neon'}>Neon</MenuItem>
                            <MenuItem value={'Orange'}>Orange</MenuItem>
                            <MenuItem value={'Pink'}>Pink</MenuItem>
                            <MenuItem value={'Print'}>Print</MenuItem>
                            <MenuItem value={'Red'}>Red</MenuItem>
                            <MenuItem value={'White'}>White</MenuItem>
                            <MenuItem value={'Yellow'}>Yellow</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth style={{ width: 200 }}>
                        <InputLabel id="category-select-label">Category</InputLabel>
                        <Select labelId="category-select-label" id="category-select" name="category" label="Category" value={newItem.category} onChange={handleFormChange}>
                            <MenuItem value={'Tops'}>Tops</MenuItem>
                            <MenuItem value={'Bottoms'}>Bottoms</MenuItem>
                            <MenuItem value={'Dresses and Jumpsuits'}>Dresses and Jumpsuits</MenuItem>
                            <MenuItem value={'Shoes'}>Shoes</MenuItem>
                            <MenuItem value={'Accessories'}>Accessories</MenuItem>
                        </Select>
                    </FormControl>

                    {subcategories && (
                        <FormControl fullWidth style={{ width: 200 }}>
                            <InputLabel id="subcategory-select-label">Subcategory</InputLabel>
                            <Select labelId="subcategory-select-label" id="subcategory-select" name="subcategory" label="Subcategory" value={newItem.subcategory} onChange={handleFormChange}>
                                {subcategories.map((subcategory) => (
                                    <MenuItem key={subcategory} value={subcategory}>{subcategory}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                    <FormControl fullWidth style={{ width: 200 }}>
                        <InputLabel id="size-select-label" >Size</InputLabel>
                        <Select labelId="size-select-label" id="size-select" name="size" label="Size" value={newItem.size} onChange={handleFormChange}>
                            {sizeOptions.map((option) => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth style={{ width: 200 }}>
                        <InputLabel id="season-select-label">Season</InputLabel>
                        <Select labelId="season-select-label" id="season-select" name="season" label="Season" value={newItem.season} onChange={handleFormChange}>
                            <MenuItem value={''}>Fall</MenuItem>
                            <MenuItem value={''}>Winter</MenuItem>
                            <MenuItem value={''}>Spring</MenuItem>
                            <MenuItem value={''}>Summer</MenuItem>
                            <MenuItem value={''}>All</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControlLabel control={<Switch name="inCloset" checked={newItem.inCloset} color="success" onChange={handleFormChange} />} label="In Closet" />
                    <FormControlLabel control={<Switch name="toRepair" checked={newItem.toRepair} color="success" onChange={handleFormChange} />} label="To Repair" />

                    {/* <TextField label="Item Brand" InputLabelProps={{ shrink: true }} onChange={handleFormChange} /> */}
                    {/* <TextField type="file" label="Choose Image" InputLabelProps={{ shrink: true }}
                        InputProps={{ accept: 'image/*', onChange: handleFormChange }} /> */}
                </div>

                <div className="form__group">
                    <button className="btn btn-block" type="submit">Add Item</button>
                </div>

            </form>
        </div>
    )
}

export default NewItemForm