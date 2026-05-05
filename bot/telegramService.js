const axios = require('axios');

async function sendToTelegram(product, message) {
  try {
    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendPhoto`,
      {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        photo: product.image,
        caption: message,
      }
    );

    console.log('📨 Telegram enviado!');
  } catch (err) {
    console.log('❌ Erro Telegram:', err.response?.data || err.message);
  }
}

module.exports = { sendToTelegram };