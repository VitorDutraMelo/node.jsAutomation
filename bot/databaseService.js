const fs = require('fs');

const FILE = './sent.json';

function getSentProducts() {
  if (!fs.existsSync(FILE)) return [];

  return JSON.parse(fs.readFileSync(FILE));
}

function isProductSent(id) {
  const sent = getSentProducts();
  return sent.includes(id);
}

function saveSentProduct(id) {
  const sent = getSentProducts();

  sent.push(id);

  fs.writeFileSync(FILE, JSON.stringify(sent, null, 2));
}

module.exports = {
  isProductSent,
  saveSentProduct
};