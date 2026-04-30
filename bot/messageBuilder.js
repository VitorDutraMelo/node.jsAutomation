function buildMessage(product) {
  return `
🔥 Kids Deal!

⚽ ${product.title}
🎨 ${product.description}

💰 Only ${product.price}

👉 Buy now:
${product.link}
`;
}

module.exports = { buildMessage };