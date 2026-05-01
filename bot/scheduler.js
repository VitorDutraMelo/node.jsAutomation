const sendDeal = require('./sendDeal');

function startScheduler() {
  console.log('⏰ Scheduler iniciado...');

  
  setTimeout(() => {
    console.log('🚀 Enviando produto agora...');
    sendDeal();
  }, 3000);

  
  setInterval(() => {
    console.log('🚀 Disparando automático...');
    sendDeal();
  }, 60000); 
}

module.exports = { startScheduler };