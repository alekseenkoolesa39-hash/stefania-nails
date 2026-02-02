# bot.py
from aiogram import Bot
from config import BOT_TOKEN

async def send_message(chat_id: int, text: str):
    """Функция для отправки сообщения в Telegram"""
    async with Bot(token=BOT_TOKEN, parse_mode="HTML") as bot:
        await bot.send_message(chat_id, text)
