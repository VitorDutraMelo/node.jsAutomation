function buildMessage(product) {
  return `🔥 *${product.title}*

💰 Price: ${product.price}
📦 ${product.description}

👉 ${product.link}

#AmazonDeals`;
}

module.exports = { buildMessage };