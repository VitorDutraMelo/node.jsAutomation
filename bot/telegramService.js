import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export async function sendToTelegram(product) {
  try {
    const form = new FormData();

    form.append("chat_id", process.env.TELEGRAM_CHAT_ID);
    form.append(
      "caption",
      `🔥 ${product.title}

💰 ${product.price}

👉 ${product.link}`
    );

    form.append("photo", fs.createReadStream(product.image));

    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendPhoto`,
      form,
      {
        headers: form.getHeaders(),
      }
    );

    console.log("📨 Telegram enviado!");
  } catch (err) {
    console.error("❌ Erro Telegram:", err.response?.data || err.message);
  }
}