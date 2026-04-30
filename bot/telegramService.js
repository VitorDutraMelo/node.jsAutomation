require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: false });

async function sendToTelegram(message) {
  try {
    await bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
    console.log('✅ Telegram enviado');
  } catch (error) {
    console.error('❌ Telegram erro:', error.message);
  }
}

module.exports = { sendToTelegram };