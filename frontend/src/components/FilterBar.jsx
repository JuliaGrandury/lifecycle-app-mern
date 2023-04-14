import Tag from './Tag'
import { MdNavigateNext } from 'react-icons/md'
import { useState } from 'react'
import styles from '../pages/Closets.module.css'


const categoryOptions = ['Tops', 'Bottoms', 'Dresses and Jumpsuits', 'Shoes', 'Accessories'];
const subcategoryOptions = {
    'Tops': ['Blouses', 'Shirts', 'Sweaters', 'Tank Tops', 'T-shirts', 'Sweatshirts', 'Coats & Jackets'],
    'Bottoms': ['Jeans', 'Leggings', 'Pants', 'Shorts', 'Skirts', 'Sweatpants'],
    'Dresses and Jumpsuits': ['Jumpsuits', 'Mini dresses', 'Midi dresses', 'Maxi dresses', 'Overalls'],
    'Shoes': [],
    'Accessories': ['Bags', 'Belts', 'Gloves', 'Hats', 'Jewelry', 'Scarves', 'Sunglasses']
}


const FilterBar = () => {
    const [category, setCategory] = useState();
    const [subcategory, setSubcategory] = useState();

    const onClickTag = (option) => {
        // a category was clicked
        if (categoryOptions.includes(option)) {
            if (category) {
                setCategory();
                setSubcategory();
            } else {
                setCategory(option);
            }
        }
        // a subcategory was clicked
        else if (category && subcategoryOptions[category].includes(option)) {
            if (subcategory) {
                setSubcategory();
            } else {
                setSubcategory(option);
            }
        }
    }

    return (
        <>
            {!category && !subcategory ? (
                <ul className={styles.filterbar__list}>
                    {categoryOptions.map((option) => (
                        <li key={option}><button onClick={() => onClickTag(option)}><Tag label={option} color={'galactic'} /></button></li>
                    ))}
                </ul>
            ) : <></>}

            {category && !subcategory ? (
                <ul className={styles.filterbar__list}>
                    <li><button onClick={() => onClickTag(category)}><Tag label={category} color={'tasman'} /></button></li>
                    <li><MdNavigateNext /></li>
                    {subcategoryOptions[category].map((option) => (
                        <li key={option}><button onClick={() => onClickTag(option)}><Tag label={option} color={'galactic'} /></button></li>
                    ))}
                </ul>
            ) : <></>}

            {category && subcategory ? (
                <ul className={styles.filterbar__list}>
                    <li><button onClick={() => onClickTag(category)}><Tag label={category} color={'tasman'} /></button></li>
                    <li><MdNavigateNext /></li>
                    <li><button onClick={() => onClickTag(subcategory)}><Tag label={subcategory} color={'tasman'} /></button></li>
                </ul>
            ) : <></>}

        </>
    )
}

export default FilterBar