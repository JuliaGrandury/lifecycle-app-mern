const asyncHandler = require("express-async-handler")
const List = require("../models/listModel")

// @desc Get lists of specific user
// @route GET /api/v1/lists
// @acces Private
const getLists = asyncHandler(async (req, res) => {
  const lists = await List.find({ user: req.user.id })
  res.status(200).json(lists)
})

// @desc Create list
// @route POST /api/v1/lists
// @acces Private
const createList = asyncHandler(async (req, res) => {
  const list = await List.create({
    user: req.user.id,
    listname: req.body.listname,
    description: req.body.description,
    public: req.body.public,
    items: req.body.items,
  })
  res.status(200).json(list)
})

// @desc Update list
// @route PUT /api/v1/lists/:id
// @acces Private
const updateList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id)
  if (!list) {
    res.status(400)
    throw new Error("List not found")
  }
  // Get User and handle if it doesn't exist
  if (!req.user) {
    res.status(401)
    throw new Error("User not found")
  }
  // Verify that logged in user and closet user match
  if (list.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }
  const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(200).json(updatedList)
})

// @desc Delete list
// @route DELETE /api/v1/lists/:id
// @acces Private
const deleteList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id)
  if (!list) {
    res.status(400)
    throw new Error("List not found")
  }

  // Get User and handle if it doesn't exist
  if (!req.user) {
    res.status(401)
    throw new Error("User not found")
  }
  // Verify that logged in user and list user match
  if (list.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  await List.findByIdAndDelete(req.params.id)
  res.status(200).json({ id: req.params.id })
})

// @desc Get list items of specific user
// @route GET /api/v1/items/lists/:id
// @acces Private
const getListItems = asyncHandler(async (req, res) => {
  const listId = req.params.id

  const list = await List.findById(listId).populate("items", "-__v")

  if (!list) {
    // If list is not found, return a 404 response
    return res.status(404).json({ error: "List not found" })
  }

  res.status(200).json(list.items)
})

module.exports = {
  getLists,
  createList,
  updateList,
  deleteList,
  getListItems,
}
