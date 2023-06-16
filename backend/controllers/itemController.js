const asyncHandler = require("express-async-handler")
const Item = require("../models/itemModel")
const mongoose = require("mongoose")

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

  const items = await Item.find(filter).sort(sortOptions).populate({ path: "location", select: "name" })
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

// @desc Get closet statistics
// @route GET /api/v1/statistics
// @acces Private
const getStatistics = asyncHandler(async (req, res) => {
  const totalItemsNum = await Item.countDocuments({ user: req.user.id })
  const outOfClosetNum = await Item.countDocuments({ user: req.user.id, inCloset: false })
  const toRepairNum = await Item.countDocuments({ user: req.user.id, toRepair: true })

  const wornItems = await Item.countDocuments({
    user: req.user.id,
    $expr: { $gt: [{ $size: "$datesWorn" }, 0] },
  })

  //convert to mongoose ObjectId for following aggregation pipelines
  const userId = new mongoose.Types.ObjectId(req.user.id)

  let lastMonthSpending = await Item.aggregate([
    {
      $match: {
        user: userId,
        createdAt: {
          $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
    },
    {
      $group: {
        _id: null,
        monthlySum: { $sum: "$value" },
      },
    },
    {
      $project: {
        _id: 0,
        monthlySum: 1,
      },
    },
  ])
  lastMonthSpending = lastMonthSpending.length > 0 ? lastMonthSpending[0]["monthlySum"] : null

  const mostWorn = await Item.aggregate([
    {
      $match: {
        user: userId,
      },
    },
    {
      $addFields: {
        datesWornSize: { $size: "$datesWorn" },
      },
    },
    {
      $sort: { datesWornSize: -1 }, // Sort in descending order (most to least) based on datesWornSize
    },
  ]).limit(5)

  const leastWorn = await Item.aggregate([
    {
      $match: {
        user: userId,
      },
    },
    {
      $addFields: {
        datesWornSize: { $size: "$datesWorn" },
      },
    },
    {
      $sort: { datesWornSize: 1 }, // Sort in ascending order (least to most) based on datesWornSize
    },
  ]).limit(5)

  res.status(200).json({ totalItemsNum, outOfClosetNum, toRepairNum, wornItems, lastMonthSpending, mostWorn, leastWorn })
})

module.exports = {
  getItems,
  setItem,
  updateItem,
  deleteItem,
  getStatistics
}
