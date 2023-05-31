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

// @desc Delete closet item
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

module.exports = {
  getLists,
  createList,
  deleteList,
}
