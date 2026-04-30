const { connectWhatsApp } = require('./whatsappService');
const { startScheduler } = require('./scheduler');
const { sendDeal } = require('./sendDeal');

async function start() {
  await connectWhatsApp();

  console.log('🤖 Bot iniciado');

  setTimeout(async () => {
    await sendDeal();
  }, 5000);

  startScheduler();
}

start();