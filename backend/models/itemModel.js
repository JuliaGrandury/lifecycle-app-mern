const mongoose = require("mongoose")
// import allCategories from "../../frontend/src/utils/allCategories"

const itemSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name for the item"],
    },
    brand: {
      type: String,
      required: [false, "Please add a brand for the item"],
    },
    color: {
      type: [String],
      enum: ["Beige", "Black", "Blue", "Brown", "Green", "Grey", "Magenta", "Metallic", "Multicolor", "Neon", "Orange", "Pink", "Print", "Red", "White", "Yellow"],
      required: [true, "Please add a color for the item"],
    },
    category: {
      type: String,
      enum: ['Tops', 'Bottoms', 'Dresses and Jumpsuits', 'Coats and Jackets', 'Shoes', 'Accessories'],
      required: [true, "Please add a category for the item"],
    },
    subcategory: {
      type: String,
      required: [true, "Please add a subcategory for the item"],
    },
    size: {
      type: String,
      required: [true, "Please add a size for the item"],
    },
    season: {
      type: [String],
      enum: ["Fall", "Winter", "Spring", "Summer", "All"],
      required: [true, "Please add a season for the item"],
    },
    inCloset: {
      type: Boolean,
    },
    toRepair: {
      type: Boolean,
    },
    datesWorn: {
      type: [Date],
      required: [false],
    },
    value: {
      type: Number,
      required: [false],
      default: 0,
    },
    washInstructions: {
      type: String,
      required: false,
      default: 'No instructions specified'
    }
  },
  {
    timestamps: true,
  }
)

// VALIDATION FOR SUBCATEGORY DEPENDING ON THE CATEGORY
itemSchema.path("subcategory").validate(function (value) {
  if (this.category === "Tops") {
    return ["Blouses", "Shirts", "Sweaters", "Tank Tops", "T-shirts", "Sweatshirts", "Coats & Jackets"].includes(value)
  } else if (this.category === "Bottoms") {
    return ["Jeans", "Leggings", "Pants", "Shorts", "Skirts", "Sweatpants"].includes(value)
  } else if (this.category === "Dresses and Jumpsuits") {
    return ["Jumpsuits", "Mini dresses", "Midi dresses", "Maxi dresses", "Overalls"].includes(value)
  } else if (this.category === "Shoes") {
    return [null].includes(value)
  } else if (this.category === "Accessories") {
    return ["Bags", "Belts", "Gloves", "Hats", "Jewelry", "Scarves", "Sunglasses"].includes(value)
  }
  return true
})

// VALIDATION FOR SIZE DEPENDING ON THE SUBCATEGORY
itemSchema.path("size").validate(function (value) {
  if (this.category === "Tops" || this.category === "Bottoms" || this.category === "Dresses and Jumpsuits") {
    return ["0", "2", "4", "6", "8", "10", "12", "14", "P/XS", "XS", "XS/S", "S", "M", "M/L", "L", "XL"].includes(value)
  } else if (this.category === "Shoes") {
    return [
      `Women's 6`,
      `Women's 6.5`,
      `Women's 7`,
      `Women's 7.5`,
      `Women's 8`,
      `Women's 8.5`,
      `Women's 9`,
      `Women's 9.5`,
      `Women's 10`,
      `Men's 7`,
      `Men's 7.5`,
      `Men's 8`,
      `Men's 8.5`,
      `Men's 9`,
      `Men's 9.5`,
      `Men's 10`,
      `Men's 10.5`,
      `Men's 11`,
      `Men's 11.5`,
      `Men's 12`,
      `Men's 12.5`,
      `Men's 13`,
      `Men's 13.5`,
      `Men's 14`,
      `Men's 14.5`,
      `Men's 15`,
    ].includes(value)
  }
  return true
})

module.exports = mongoose.model("Item", itemSchema)
