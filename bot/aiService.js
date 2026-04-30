require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateProductText(product) {
  try {
    const prompt = `
Create a short and engaging promotional message for this product.

Product:
- Title: ${product.title}
- Description: ${product.description}
- Price: ${product.price}

Make it:
- Friendly
- Short
- Good for WhatsApp/Telegram
- Include emojis
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'user', content: prompt }
      ]
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('❌ Erro na IA:', error.message);

    // fallback
    return `${product.title}\n${product.description}`;
  }
}

module.exports = { generateProductText };