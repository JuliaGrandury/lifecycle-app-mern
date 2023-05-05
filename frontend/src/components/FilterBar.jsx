import Tag from './Tag'
import { MdNavigateNext } from 'react-icons/md'
import { useState } from 'react'
import styles from '../pages/Closets.module.css'
import allCategories from '../utils/allCategories'

const categoryOptions = allCategories.categories;
const subcategoryOptions = allCategories.subcategories;

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