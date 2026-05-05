const fs = require('fs');

function getData() {
  const products = JSON.parse(fs.readFileSync('./products.json'));
  const sent = JSON.parse(fs.readFileSync('./sentProducts.json'));
  return { products, sent };
}

function getNextProduct() {
  const { products, sent } = getData();
  return products.find(p => !sent.includes(p.id));
}

function markAsSent(id) {
  const { sent } = getData();
  sent.push(id);
  fs.writeFileSync('./sentProducts.json', JSON.stringify(sent, null, 2));
}

module.exports = {
  getNextProduct,
  markAsSent
};