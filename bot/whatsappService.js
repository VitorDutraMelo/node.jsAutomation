require('dotenv').config();

const fs = require('fs');
const path = require('path');

const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} = require('@whiskeysockets/baileys');

const qrcode = require('qrcode-terminal');

let sock;
const TARGET = process.env.WHATSAPP_TARGET;

// 🔌 CONECTAR WHATSAPP
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
        setTimeout(() => resolve(), 5000);
      }

      if (connection === 'close') {
        const reason = lastDisconnect?.error?.output?.statusCode;

        console.log('❌ Desconectado:', reason);

        if (reason !== DisconnectReason.loggedOut) {
          console.log('🔄 Reconectando...');
          connectWhatsApp();
        }
      }
    });
  });
}

// 📤 ENVIAR MENSAGEM COM IMAGEM LOCAL
async function sendToWhatsApp(message, imagePath) {
  try {
    if (!sock) throw new Error('WhatsApp não conectado');

    // 🔥 GARANTE CAMINHO ABSOLUTO
    const fullPath = path.resolve(imagePath);

    if (!fs.existsSync(fullPath)) {
      console.log('❌ Imagem não encontrada:', fullPath);
      return;
    }

    await sock.sendMessage(TARGET, {
      image: fs.readFileSync(fullPath),
      caption: message
    });

    console.log('✅ WhatsApp enviado!');
  } catch (error) {
    console.error('❌ WhatsApp erro:', error.message);
  }
}

module.exports = {
  connectWhatsApp,
  sendToWhatsApp
};