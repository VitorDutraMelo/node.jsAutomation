require('dotenv').config();
const startScheduler = require('./scheduler');

function start() {
  console.log('🤖 Bot Telegram iniciado...');
  startScheduler();
}

start();