const colors = ["Beige", "Black", "Blue", "Brown", "Green", "Grey", "Magenta", "Metallic", "Multicolor", "Neon", "Orange", "Pink", "Print", "Red", "White", "Yellow"]

const colors2 = {
  Beige: "#d0be95",
  Black: "#000",
  Blue: "#3372a9",
  Brown: "#683f20",
  Green: "#60882d",
  Grey: "#838383",
  Magenta: "#894fa5",
  Metallic: "#e4cf74",
  Multicolor: "",
  Neon: "#e4ff3a",
  Orange: "#ec8a4c",
  Pink: "#e46eb5",
  Print: "",
  Red: "#e83223",
  White: "#fff",
  Yellow: "#f8dd57",
}

const categories = ["Tops", "Bottoms", "Dresses and Jumpsuits", "Coats and Jackets", "Shoes", "Swimwear", "Accessories"]
const subcategories = {
  Tops: ["Blouses", "Shirts", "Sweaters", "Tank Tops", "T-shirts", "Sweatshirts"],
  Bottoms: ["Jeans", "Leggings", "Pants", "Shorts", "Skirts", "Sweatpants"],
  "Dresses and Jumpsuits": ["Jumpsuits", "Mini dresses", "Midi dresses", "Maxi dresses", "Overalls"],
  "Coats and Jackets": ["Blazers", "Coats", "Vests", "Jackets"],
  Shoes: ["Boots", "Heels", "Sandals", "Sneakers"],
  Swimwear: ["Bikinis", "One Pieces", "Rash Guards", "Board Shorts", "Wetsuits"],
  Accessories: ["Bags", "Belts", "Blankets", "Gloves", "Hats", "Jewelry", "Scarves", "Sunglasses", "Towels"],
}
const sizes = {
  Tops: ["0", "2", "4", "6", "8", "10", "12", "14", "P/XS", "XS", "XS/S", "S", "M", "M/L", "L", "XL"],
  Bottoms: ["0", "2", "4", "6", "8", "10", "12", "14", "P/XS", "XS", "XS/S", "S", "M", "M/L", "L", "XL"],
  "Dresses and Jumpsuits": ["0", "2", "4", "6", "8", "10", "12", "14", "P/XS", "XS", "XS/S", "S", "M", "M/L", "L", "XL"],
  "Coats and Jackets": ["0", "2", "4", "6", "8", "10", "12", "14", "P/XS", "XS", "XS/S", "S", "M", "M/L", "L", "XL"],
  Shoes: [
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
  ],
  Swimwear: ["0", "2", "4", "6", "8", "10", "12", "14", "P/XS", "XS", "XS/S", "S", "M", "M/L", "L", "XL"],
  Accessories: ["NA"],
}
const seasons = ["Fall", "Winter", "Spring", "Summer"]

const filters = {
  "By Item Name (A-Z)": "name",
  "By Item Name (Z-A)": "-name",
  "By Brand Name (A-Z)": "brand",
  "By Brand Name (Z-A)": "-brand",
  "Newest to Oldest": "-createdAt",
  "Oldest to Newest": "createdAt",
}

module.exports = {
  colors,
  categories,
  subcategories,
  sizes,
  seasons,
  filters,
}
