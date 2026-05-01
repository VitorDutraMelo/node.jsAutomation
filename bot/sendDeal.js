const { getNextProduct } = require('./productService');
const { sendToWhatsApp } = require('./whatsappService');
const { sendToTelegram } = require('./telegramService');

async function sendDeal() {
  const product = getNextProduct();

  if (!product) {
    console.log('⚠️ Nenhum produto disponível');
    return;
  }

  const message = `
🔥 ${product.title}

💰 ${product.price}

📝 ${product.description}

👉 ${product.link}
`;

  console.log('📦 Enviando produto...');

  // 🔥 ENVIA NOS DOIS
  await sendToTelegram(message, product.image);
  await sendToWhatsApp(message, product.image);
}

module.exports = sendDeal;