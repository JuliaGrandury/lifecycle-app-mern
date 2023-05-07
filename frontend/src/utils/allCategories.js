const colors = ['Beige', 'Black', 'Blue', 'Brown', 'Green', 'Grey', 'Magenta', 'Metallic', 'Multicolor', 'Neon', 'Orange', 'Pink', 'Print', 'Red', 'White', 'Yellow'];
const categories = ['Tops', 'Bottoms', 'Dresses and Jumpsuits', 'Coats and Jackets', 'Shoes', 'Accessories'];
const subcategories = {
    'Tops': ['Blouses', 'Shirts', 'Sweaters', 'Tank Tops', 'T-shirts', 'Sweatshirts'],
    'Bottoms': ['Jeans', 'Leggings', 'Pants', 'Shorts', 'Skirts', 'Sweatpants'],
    'Dresses and Jumpsuits': ['Jumpsuits', 'Mini dresses', 'Midi dresses', 'Maxi dresses', 'Overalls'],
    'Coats and Jackets': ['Blazers', 'Coats', 'Vests', 'Jackets'],
    'Shoes': ['Boots', 'Heels', 'Sandals', 'Sneakers'],
    'Accessories': ['Bags', 'Belts', 'Gloves', 'Hats', 'Jewelry', 'Scarves', 'Sunglasses']
}
const sizes = {
    'Tops': ['0', '2', '4', '6', '8', '10', '12', '14', 'P/XS', 'XS', 'XS/S', 'S', 'M', 'M/L', 'L', 'XL'],
    'Bottoms': ['0', '2', '4', '6', '8', '10', '12', '14', 'P/XS', 'XS', 'XS/S', 'S', 'M', 'M/L', 'L', 'XL'],
    'Dresses and Jumpsuits': ['0', '2', '4', '6', '8', '10', '12', '14', 'P/XS', 'XS', 'XS/S', 'S', 'M', 'M/L', 'L', 'XL'],
    'Coats and Jackets': ['0', '2', '4', '6', '8', '10', '12', '14', 'P/XS', 'XS', 'XS/S', 'S', 'M', 'M/L', 'L', 'XL'],
    'Shoes': [`Women's 6`, `Women's 6.5`, `Women's 7`, `Women's 7.5`, `Women's 8`, `Women's 8.5`, `Women's 9`, `Women's 9.5`, `Women's 10`, `Men's 7`,
    `Men's 7.5`, `Men's 8`, `Men's 8.5`, `Men's 9`, `Men's 9.5`, `Men's 10`, `Men's 10.5`, `Men's 11`, `Men's 11.5`, `Men's 12`, `Men's 12.5`,
    `Men's 13`, `Men's 13.5`, `Men's 14`, `Men's 14.5`, `Men's 15`],
    'Accessories': []
}
const seasons = ['Fall', 'Winter', 'Spring', 'Summer'];

const filters = ["By Item Name (A-Z)", "By Item Name (Z-A)", "By Brand Name (A-Z)", "By Brand Name (Z-A)", "Newest to Oldest", "Oldest to Newest", "By Season"]

module.exports = {
    colors,
    categories,
    subcategories,
    sizes,
    seasons,
    filters
}