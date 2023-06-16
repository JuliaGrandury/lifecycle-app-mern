import axios from "axios"

const API_URL = "api/v1/items/"

// Create new item
const createItem = async (itemData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, itemData, config)
  return response.data
}

// Get user items
const getItems = async (token, filter) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: filter,
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

// Get closet statistics
const getStatistics = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + 'statistics', config)
  return response.data
}

// Get closet statistics
const getListItems = async (listId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`api/v1/lists/${listId}/items`, config)
  return response.data
}

const itemService = {
  createItem,
  getItems,
  deleteItem,
  getStatistics,
  getListItems
}

export default itemService
