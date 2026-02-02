from aiogram import Bot, Dispatcher
import asyncio
from config import BOT_TOKEN

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()  # <--- просто создаём без аргументов

async def send_message(chat_id: int, text: str):
    """Функция для отправки сообщения в Telegram"""
    await bot.send_message(chat_id, text, parse_mode="HTML")
