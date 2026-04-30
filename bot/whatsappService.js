require('dotenv').config();

const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} = require('@whiskeysockets/baileys');

const qrcode = require('qrcode-terminal');

let sock;
const TARGET = process.env.WHATSAPP_TARGET;

async function connectWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const { version } = await fetchLatestBaileysVersion();

  sock = makeWASocket({
    version,
    auth: state,
    browser: ['Windows', 'Chrome', '120.0.0'],
    printQRInTerminal: false
  });

  sock.ev.on('creds.update', saveCreds);

  return new Promise((resolve) => {
    sock.ev.on('connection.update', (update) => {
      const { connection, qr, lastDisconnect } = update;

      if (qr) {
        console.log('📱 Escaneie o QR:\n');
        qrcode.generate(qr, { small: true });
      }

      if (connection === 'open') {
        console.log('✅ WhatsApp conectado!');

        setTimeout(() => {
          console.log('🟢 WhatsApp pronto para envio!');
          resolve();
        }, 8000);
      }

      if (connection === 'close') {
        const reason = lastDisconnect?.error?.output?.statusCode;

        console.log('❌ WhatsApp desconectado:', reason);

        if (reason !== DisconnectReason.loggedOut) {
          console.log('🔄 Reconectando...');
          connectWhatsApp();
        } else {
          console.log('⚠️ Sessão expirada. Escaneie novamente.');
        }
      }
    });
  });
}

async function sendToWhatsApp(message) {
  try {
    if (!sock) throw new Error('WhatsApp não conectado');

    await sock.sendMessage(
      TARGET,
      { text: message },
      { linkPreview: false }
    );

    console.log('✅ WhatsApp enviado');
  } catch (error) {
    console.error('❌ WhatsApp erro:', error.message);
  }
}

module.exports = {
  connectWhatsApp,
  sendToWhatsApp
};