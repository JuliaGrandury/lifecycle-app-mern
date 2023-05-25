const asyncHandler = require("express-async-handler")

const Item = require("../models/itemModel")
const User = require("../models/userModel")

// @desc Get items of specific user
// @route GET /api/v1/items
// @acces Private
const getItems = asyncHandler(async (req, res) => {
  const filter = { user: req.user.id }

  // Apply filter based on category and subcategory query parameters
  if (req.query.category) {
    filter.category = req.query.category
  }
  if (req.query.subcategory) {
    filter.subcategory = req.query.subcategory
  }

  // Apply search based on the search query parameter
  const searchQuery = req.query.search
  if (searchQuery) {
    // Perform search based on searchQuery and update filter accordingly
    filter.$or = [{ name: { $regex: searchQuery, $options: "i" } }, { brand: { $regex: searchQuery, $options: "i" } }]
  }

  // Apply sorting based on the sort query parameter
  const sortQuery = req.query.sort
  const sortOptions = {}
  if (sortQuery === "name") {
    sortOptions.name = 1 // Sort by name in ascending order
  } else if (sortQuery === "-name") {
    sortOptions.name = -1 // Sort by name in descending order
  } else if (sortQuery === "brand") {
    sortOptions.brand = 1 // Sort by price in ascending order
  } else if (sortQuery === "-brand") {
    sortOptions.brand = -1 // Sort by price in descending order
  } else if (sortQuery === "createdAt") {
    sortOptions.createdAt = 1 // Sort by createdAt in ascending order
  } else if (sortQuery === "-createdAt") {
    sortOptions.createdAt = -1 // Sort by createdAt in descending order (default)
  }

  console.log(`From itemController: ${filter.category} and ${filter.subcategory}`)

  const items = await Item.find(filter).sort(sortOptions)
  res.status(200).json(items)
})

// @desc Set closet item
// @route POST /api/v1/items
// @acces Private
const setItem = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400)
    throw new Error("Please add a name field")
  }

  const item = await Item.create({
    user: req.user.id,
    name: req.body.name,
    brand: req.body.brand,
    color: req.body.color,
    category: req.body.category,
    subcategory: req.body.subcategory,
    size: req.body.size,
    season: req.body.season,
    inCloset: req.body.inCloset,
    toRepair: req.body.toRepair,
    datesWorn: req.body.datesWorn,
    value: req.body.value,
    washInstructions: req.body.washInstructions,
    location: req.body.location,
  })
  res.status(200).json(item)
})

// @desc Update closet item
// @route PUT /api/v1/items/:id
// @acces Private
const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id)
  if (!item) {
    res.status(400)
    throw new Error("Closet item not found")
  }

  // Get User and handle if it doesn't exist
  if (!req.user) {
    res.status(401)
    throw new Error("User not found")
  }
  // Verify that logged in user and closet user match
  if (item.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(200).json(updatedItem)
})

// @desc Delete closet item
// @route DELETE /api/v1/items/:id
// @acces Private
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id)
  if (!item) {
    res.status(400)
    throw new Error("Closet item not found")
  }

  // Get User and handle if it doesn't exist
  if (!req.user) {
    res.status(401)
    throw new Error("User not found")
  }
  // Verify that logged in user and closet user match
  if (item.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  await Item.findByIdAndDelete(req.params.id)
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getItems,
  setItem,
  updateItem,
  deleteItem,
}
