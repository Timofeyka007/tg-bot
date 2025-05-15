import { Telegraf } from "telegraf"

import * as dotenv from "dotenv"

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN);

// Стани гри для користувачів
const users = {};

bot.start((ctx) => {
  users[ctx.chat.id] = 'start';
  ctx.reply(
    '🔒 Ти залишився один у школі. Двері замкнені.\nКуди підеш?\n\n1️⃣ Кабінет директора\n2️⃣ Спортзал',
    gameKeyboard(['1', '2'])
  );
});

bot.on('text', (ctx) => {
  const id = ctx.chat.id;
  const msg = ctx.message.text.trim();

  if (!users[id]) {
    ctx.reply('Натисни /start, щоб почати гру!');
    return;
  }

  const state = users[id];

  if (state === 'start') {
    if (msg === '1') {
      users[id] = 'director';
      ctx.reply(
        '🔑 Кабінет закритий. Але на дверях висить ключ з підписом "спортзал".\n\n1️⃣ Іти до спортзалу\n2️⃣ Шукати іншого вчителя',
        gameKeyboard(['1', '2'])
      );
    } else if (msg === '2') {
      users[id] = 'gym';
      ctx.reply(
        '🏋️ У спортзалі порожньо, але в кутку блищить ключ.\n\n1️⃣ Взяти ключ\n2️⃣ Вийти без ключа',
        gameKeyboard(['1', '2'])
      );
    } else {
      ctx.reply('Оберіть 1 або 2.');
    }
  } else if (state === 'director') {
    if (msg === '1') {
      users[id] = 'gym';
      ctx.reply(
        '🏃‍♂️ Ти біжиш у спортзал і бачиш блискучий ключ на підлозі.\n\n1️⃣ Взяти ключ\n2️⃣ Залишити',
        gameKeyboard(['1', '2'])
      );
    } else {
      users[id] = 'gameover';
      ctx.reply('🚫 Немає інших вчителів. Камери тебе засікли. Гра завершена.');
    }
  } else if (state === 'gym') {
    if (msg === '1') {
      users[id] = 'escape';
      ctx.reply('🔓 Ти відкрив двері і втік зі школи! Перемога! 🎉');
    } else {
      users[id] = 'gameover';
      ctx.reply('🚪 Без ключа ти не зміг вийти. Гра завершена.');
    }
  } else {
    ctx.reply('Натисни /start, щоб почати знову.');
  }
});

function gameKeyboard(buttons) {
  return {
    reply_markup: {
      keyboard: [buttons],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };
}

bot.launch();
