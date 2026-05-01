require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
  polling: false
});

const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function sendToTelegram(message, imagePath) {
  try {
    if (imagePath && fs.existsSync(imagePath)) {
      await bot.sendPhoto(CHAT_ID, fs.readFileSync(imagePath), {
        caption: message
      });
    } else {
      await bot.sendMessage(CHAT_ID, message);
    }

    console.log('✅ Telegram enviado');
  } catch (error) {
    console.error('❌ Telegram erro:', error.response?.body || error.message);
  }
}

module.exports = {
  sendToTelegram
};