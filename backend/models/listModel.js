const mongoose = require("mongoose")

const listSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    listname: {
      type: String,
      required: [true, "Please add a name for the list"],
    },
    description: {
      type: String,
      required: [true, "Please add a list description"],
    },
    public: {
      type: Boolean,
      required: [true, "Please determine privacy of your list"],
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Item",
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("List", listSchema)
