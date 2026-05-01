const fs = require('fs');

const FILE = './sent.json';

function getSent() {
  return JSON.parse(fs.readFileSync(FILE));
}

function saveSentProduct(id) {
  const data = getSent();
  data.push(id);
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

function isProductSent(id) {
  const data = getSent();
  return data.includes(id);
}

module.exports = {
  saveSentProduct,
  isProductSent
};