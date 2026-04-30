const cron = require('node-cron');
const { sendDeal } = require('./sendDeal');

function startScheduler() {
  console.log('⏰ Scheduler iniciado...');

  cron.schedule('* * * * *', () => {
    console.log('🚀 [CRON] Disparando...');

    sendDeal().catch(err => {
      console.error('❌ Erro no envio:', err.message);
    });
  });
}

module.exports = { startScheduler };