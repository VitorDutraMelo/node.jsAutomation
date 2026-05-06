require("dotenv").config();

const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");

// =============================
// 🌐 SERVER
// =============================
const app = express();

app.get("/", (req, res) => {
  res.send("Bot rodando 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
});

// =============================
// 📦 PRODUTOS
// =============================
function getProducts() {
  const data = fs.readFileSync(
    path.join(__dirname, "products.json"),
    "utf-8"
  );

  return JSON.parse(data);
}

let currentIndex = 0;

// =============================
// 🚀 ENVIAR PRODUTO
// =============================
async function sendDeal() {
  try {
    console.log("📦 Buscando produto...");

    const products = getProducts();

    if (!products.length) {
      console.log("⚠️ Nenhum produto disponível");
      return;
    }

    const product = products[currentIndex];

    const message = `🔥 ${product.title}

💰 Price: ${product.price}

👉 Buy here:
${product.link}`;

    console.log("🚀 Enviando produto...");

    const imagePath = path.join(__dirname, product.image);

    // =============================
    // 📸 COM IMAGEM
    // =============================
    if (fs.existsSync(imagePath)) {

      const form = new FormData();

      form.append(
        "chat_id",
        process.env.TELEGRAM_CHAT_ID
      );

      form.append(
        "caption",
        message
      );

      form.append(
        "photo",
        fs.createReadStream(imagePath)
      );

      const response = await axios.post(
        `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendPhoto`,
        form,
        {
          headers: form.getHeaders()
        }
      );

      console.log("📸 Imagem enviada!");
    }

    // =============================
    // 📝 SEM IMAGEM
    // =============================
    else {

      console.log("⚠️ Imagem não encontrada");

      await axios.post(
        `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
        {
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message
        }
      );

      console.log("📝 Texto enviado!");
    }

    console.log("📨 Telegram enviado!");

    // próximo produto
    currentIndex++;

    if (currentIndex >= products.length) {
      currentIndex = 0;
    }

  } catch (error) {

    console.log(
      "❌ Erro Telegram:",
      error.response?.data || error.message
    );

  }
}

// =============================
// ⏰ SCHEDULER
// =============================
function startScheduler() {

  console.log("⏰ Scheduler iniciado...");

  sendDeal();

  setInterval(() => {

    console.log("🚀 Disparando automático...");

    sendDeal();

  }, 2 * 60 * 60 * 1000);

}

// =============================
// 🚀 START
// =============================
function start() {

  console.log("🤖 Bot Telegram iniciado...");

  startScheduler();

}

start();