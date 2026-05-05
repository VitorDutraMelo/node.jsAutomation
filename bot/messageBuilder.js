function buildMessage(product) {
  return `🔥 OFERTA DO DIA 🔥

🏷️ ${product.title}
💰 ${product.price}

👉 ${product.link}`;
}

module.exports = buildMessage;