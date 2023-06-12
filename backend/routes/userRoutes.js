const express = require("express")
const router = express.Router()
const { registerUser, loginUser, getUser, getAllUsernames } = require("../controllers/userController")
const { protect } = require("../middleware/authMiddleware")

router.post("/", registerUser)
router.post("/login", loginUser)
router.get("/me", protect, getUser)
router.get("/allUsernames", getAllUsernames)

module.exports = router
