const asyncHandler = require("express-async-handler")

const Location = require("../models/locationModel")

// @desc Get a location
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

// @desc Update a location
// @route POST /api/v1/locations
// @acces Private
const updateLocation = asyncHandler(async (req, res) => {
  const location = await Location.findById(req.params.id)
  if (!location) {
    res.status(400)
    throw new Error("Location not found")
  }

  // Get User and handle if it doesn't exist
  if (!req.user) {
    res.status(401)
    throw new Error("User not found")
  }
  // Verify that logged in user and closet user match
  if (location.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  const updatedLocation = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(200).json(updatedLocation)
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
