# 🤖 node.jsAutomation

Automation bot built with Node.js to send messages across WhatsApp and Telegram using real integrations.

---

## 🚀 About

This project is a backend automation system that sends messages automatically to WhatsApp groups and Telegram channels.

It simulates real-world marketing and notification systems used in production environments.

---

## ✨ Features

* 📲 WhatsApp automation (Baileys)
* 💬 Telegram bot integration
* 🔁 Automated message sending
* 🧠 Dynamic message generation
* 📦 Product-based messaging system
* ⏱️ Scheduled message dispatch
* ⚙️ Modular service architecture

---

## 🛠️ Tech Stack

* Node.js
* JavaScript
* WhatsApp Web API (Baileys)
* Telegram Bot API

---

## 📂 Project Structure

```bash
bot/
 ├── session/                 # WhatsApp session data
 ├── .env                     # Environment variables
 ├── index.js                 # Entry point
 ├── scheduler.js             # Message scheduler
 ├── sendDeal.js              # Message trigger logic

 ├── aiService.js             # AI / message generation
 ├── messageBuilder.js        # Message formatting
 ├── productService.js        # Product handling
 ├── databaseService.js       # Data layer (JSON-based)

 ├── telegramService.js       # Telegram integration
 ├── whatsappService.js       # WhatsApp integration

 ├── testTelegram.js          # Telegram tests
 ├── testWhatsApp.js          # WhatsApp tests

 ├── products.json            # Product source
 ├── sentProducts.json        # Sent history

 ├── package.json
```

---

## ⚙️ How It Works

1. The system loads products from `products.json`
2. Builds a message using `messageBuilder`
3. Sends the message via:

   * WhatsApp
   * Telegram
4. Tracks sent products to avoid duplicates

---

## 🧪 Running the Project

```bash
npm install
node index.js
```

---

## 🔐 Environment Variables

Create a `.env` file:

```env
TELEGRAM_TOKEN=your_token_here
```

(And other credentials if needed)

---

## ⚠️ Important

This project uses automation with messaging platforms.

👉 Use responsibly
👉 Respect platform policies
👉 Avoid spam behavior

---

## 🚧 Current Status

Project under active development.

Next steps:

* 📊 Analytics
* 🧠 Smarter message generation
* 🌐 Web dashboard
* 🔒 Better control of message targets

---

## 📈 Goal

Build a real automation system that can be used for:

* Marketing campaigns
* Product promotion
* Affiliate systems
* Notification services

---

## 📬 Contact

* LinkedIn: https://www.linkedin.com/in/vitordutramelo

---

## 📄 License

MIT
