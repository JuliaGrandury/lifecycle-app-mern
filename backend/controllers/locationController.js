const asyncHandler = require("express-async-handler")

const Location = require("../models/locationModel")

// @desc Create a location
// @route POST /api/v1/locations
// @acces Private
const createLocation = asyncHandler(async (req, res) => {
  const { name } = req.body
  const location = await Location.create({ name, user: req.user.id })
  res.status(201).json(location)
})

// @desc Delete a location
// @route DELETE /api/v1/locations/:id
// @acces Private
const deleteLocation = asyncHandler(async (req, res) => {
  const locationId = req.params.id
  await Location.findByIdAndDelete(locationId)
  res.status(200).json({ message: "Location deleted successfully" })
})

module.exports = {
  createLocation,
  deleteLocation,
}
