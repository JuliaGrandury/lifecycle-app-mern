import axios from 'axios'

const API_URL = 'api/v1/items/'

// Create new item
const createItem = async (itemData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, itemData, config)
    return response.data
}


// Get user items
const getItems = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)
    return response.data
}


// Delete a closet item
const deleteItem = async (itemId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL + itemId, config)
    return response.data
}

const itemService = {
    createItem,
    getItems,
    deleteItem
}

export default itemService