const express = require("express")
const router = express.Router()
const { getLists, createList, updateList, deleteList, getListItems } = require("../controllers/listController")
const { protect } = require("../middleware/authMiddleware")

router.get("/", protect, getLists)
router.get("/:id/items", protect, getListItems)
router.post("/", protect, createList)
router.put("/:id", protect, updateList)
router.delete("/:id", protect, deleteList)

module.exports = router
