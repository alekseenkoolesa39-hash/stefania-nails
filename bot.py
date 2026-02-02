from aiogram import Bot
from config import BOT_TOKEN

bot = Bot(token=BOT_TOKEN)

async def send_message(chat_id: int, text: str):
    """Отправка сообщения в Telegram"""
    await bot.send_message(chat_id, text, parse_mode="HTML")
