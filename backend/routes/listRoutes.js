const express = require("express")
const router = express.Router()
const { getLists, createList, deleteList } = require("../controllers/listController")

const { protect } = require("../middleware/authMiddleware")

router.get("/", protect, getLists)
router.post("/", protect, createList)
router.delete("/:id", protect, deleteList)

module.exports = router
