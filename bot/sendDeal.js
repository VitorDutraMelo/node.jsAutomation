const { getNextProduct } = require('./productService');
const { buildMessage } = require('./messageBuilder');
const { sendToTelegram } = require('./telegramService');
const { sendToWhatsApp } = require('./whatsappService');
const { isProductSent, saveSentProduct } = require('./databaseService');

async function sendDeal() {
  let product;
  let attempts = 0;

  do {
    product = getNextProduct();
    attempts++;
  } while (isProductSent(product.id) && attempts < 10);

  if (isProductSent(product.id)) {
    console.log('⚠️ Todos os produtos já foram enviados');
    return;
  }

  const message = buildMessage(product);

  await sendToTelegram(message);

  await new Promise(res => setTimeout(res, 3000));

  await sendToWhatsApp(message);

  saveSentProduct(product.id);

  console.log('🤖 Produto enviado');
}

module.exports = { sendDeal };