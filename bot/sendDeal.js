const { sendToTelegram } = require('./telegramService');
const buildMessage = require('./messageBuilder');
const products = require('./products.json');

let index = 0;

async function sendDeal() {
  try {
    console.log('📦 Buscando produto...');

    if (products.length === 0) {
      console.log('⚠️ Nenhum produto disponível');
      return;
    }

    const product = products[index];

    console.log('🚀 Enviando produto...');

    const message = buildMessage(product);

    await sendToTelegram(product, message);

    console.log('✅ Produto enviado!');

    index = (index + 1) % products.length;
  } catch (err) {
    console.log('❌ Erro no sendDeal:', err.message);
  }
}

module.exports = sendDeal;