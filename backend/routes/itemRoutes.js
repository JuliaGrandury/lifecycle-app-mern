const express = require("express")
const router = express.Router()
const { getItems, setItem, updateItem, deleteItem, getStatistics } = require("../controllers/itemController")

const { protect } = require("../middleware/authMiddleware")

router.get("/", protect, getItems)
router.get("/statistics", protect, getStatistics)
router.post("/", protect, setItem)
router.put("/:id", protect, updateItem)
router.delete("/:id", protect, deleteItem)

module.exports = router
