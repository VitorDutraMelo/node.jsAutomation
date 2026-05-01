require('dotenv').config();

const { connectWhatsApp } = require('./whatsappService');
const { startScheduler } = require('./scheduler');

async function start() {
  console.log('🤖 Iniciando bot...');

  await connectWhatsApp();

  console.log('🟢 WhatsApp pronto');

  startScheduler();
}

start();