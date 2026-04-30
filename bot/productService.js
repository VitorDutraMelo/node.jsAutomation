const products = require('./products.json');

let index = 0;

function getNextProduct() {
  const product = products[index];

  index = (index + 1) % products.length;

  return product;
}

module.exports = { getNextProduct };