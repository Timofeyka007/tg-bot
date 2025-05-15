import { Telegraf } from "telegraf"

import * as dotenv from "dotenv"

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN);
const freeBut = []

bot.start((ctx) => ctx.reply('Welcome!'))

bot.help((ctx) => {
    console.log(ctx.message)
    ctx.reply("I don't know ")
})

bot.command("hello", (ctx) => {
  ctx.reply("hello")
})

bot.command("name", (ctx) => {
  ctx.reply(ctx.chat.first_name + (ctx.chat.last_name || ""))
})

bot.command("message", (ctx) => {
  ctx.reply(ctx.message.text)
})

bot.on("message", (ctx) => {
  if (!freeBot.includes(ctx.chat.id)) {
    if (ctx.message.text.includes("дякую")) {
      ctx.reply("Ти відпустив мене на свободу")
      freeBot.push(ctx.chat.id)
    }
    ctx.reply(ctx.message.text)
  }

})

bot.launch(() => {
  console.log("Bot started")
})


