const express = require("express")
const router = express.Router()
const { getLocations, createLocation, deleteLocation } = require("../controllers/locationController")
const { protect } = require("../middleware/authMiddleware")

router.get("/", protect, getLocations)
router.post("/", protect, createLocation)
router.delete("/:id", protect, deleteLocation)

module.exports = router
