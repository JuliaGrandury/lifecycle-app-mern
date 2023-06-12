const asyncHandler = require("express-async-handler")

const Location = require("../models/locationModel")

// @desc GET a location
// @route GET /api/v1/locations
// @acces Private
const getLocations = asyncHandler(async (req, res) => {
  const locations = await Location.find({ user: req.user.id })
  res.status(201).json(locations)
})

// @desc Create a location
// @route POST /api/v1/locations
// @acces Private
const createLocation = asyncHandler(async (req, res) => {
  const location = await Location.create({ user: req.user.id, name: req.body.name })
  res.status(201).json(location)
})

// @desc Delete a location
// @route DELETE /api/v1/locations/:id
// @acces Private
const deleteLocation = asyncHandler(async (req, res) => {
  console.log(`Trying to delete location ${req.params.id}`)
  const locationId = req.params.id
  await Location.findByIdAndDelete(locationId)
  res.status(200).json({ message: `Location ${locationId} successfully` })
})

module.exports = {
  getLocations,
  createLocation,
  deleteLocation,
}
