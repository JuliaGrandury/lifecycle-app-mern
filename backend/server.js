const path = require("path")
const express = require("express")
const colors = require("colors")
const dotenv = require("dotenv").config()
const { errorHandler } = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")
const port = process.env.PORT || 5000

const publicPath = path.join(__dirname, "frontend")

connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/v1/items", require("./routes/itemRoutes"))
app.use("/api/v1/lists", require("./routes/listRoutes"))
app.use("/api/v1/locations", require("./routes/locationRoutes"))
app.use("/api/v1/users", require("./routes/userRoutes"))

// serve the frontend in production
// app.use(express.static(publicPath))
// app.get("*", (req, res) => {
//   res.sendFile(path.join(publicPath, "index.html"))
// })

// // serve the frontend in production
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../frontend/build')))
//     app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
// } else {
//     app.get('/', (req, res) => res.send('Please set environment to production'))
// }

app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port ${port}`.rainbow))
