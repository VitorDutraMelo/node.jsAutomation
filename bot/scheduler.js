const sendDeal = require('./sendDeal');

function startScheduler() {
  console.log('⏰ Scheduler iniciado...');

  
  sendDeal();


  setInterval(sendDeal, 60000);
}

module.exports = startScheduler;