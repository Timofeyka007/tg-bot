import('dotenv');
import { Telegraf } from 'telegraf';
const fetch = import('node-fetch');

const bot = new Telegraf (process.env.BOT_TOKEN);

const jokes = [
  "Небо ясне, як твій настрій після останнього уроку!",
  "Дощ. Ідеальний час сидіти вдома з чаєм і домашкою (чи ні?).",
  "Сніг валить. Час ліпити сніговика або падати в замет.",
  "Спека така, що навіть коти шукають тінь.",
  "Вітер такий, що капюшон живе своїм життям."
];

bot.start((ctx) => {
  ctx.reply('Привіт! Напиши назву міста, і я скажу тобі погоду з коментарем 😉');
});

bot.on('text', async (ctx) => {
  const city = ctx.message.text;
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${process.env.WEATHER_API_KEY}&units=metric&lang=ua`
    );
    const data = await res.json();

    if (data.cod !== 200) {
      ctx.reply('Не знайшов таке місто. Перевір написання 🌍');
      return;
    }

    const temp = Math.round(data.main.temp);
    const condition = data.weather[0].description;
    const joke = jokes[Math.floor(Math.random() * jokes.length)];

    ctx.reply(`📍 ${data.name}\n🌡 ${temp}°C, ${condition}\n💬 ${joke}`);
  } catch (error) {
    console.error(error);
    ctx.reply('Щось пішло не так. Спробуй пізніше 😢');
  }
});

bot.launch();
