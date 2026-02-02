from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from bot import send_message
from config import CHAT_ID  # CHAT_ID должен быть int

app = FastAPI(title="Stefania Nails Form API")

# Разрешаем запросы с GitHub Pages
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://alekseenkoolesa39-hash.github.io"],  # можно заменить на конкретный домен, например "https://alekseenkoolesa39-hash.github.io"
    allow_methods=["POST"],
    allow_headers=["*"],
)

@app.post("/send_form")
async def send_form(
    name: str = Form(...),
    phone: str = Form(...),
    date: str = Form(...),
    comment: str = Form("")
):
    message = (
        f"<b>Новая заявка с сайта!</b>\n\n"
        f"<b>Имя:</b> {name}\n"
        f"<b>Телефон:</b> {phone}\n"
        f"<b>Дата:</b> {date}\n"
        f"<b>Комментарий:</b> {comment}"
    )

    try:
        # CHAT_ID должен быть int, а не строкой
        await send_message(int(CHAT_ID), message)
        return {"status": "ok", "message": "Заявка отправлена"}
    except Exception as e:
        print(f"Ошибка при отправке в Telegram: {e}")
        return {"status": "error", "message": "Не удалось отправить заявку"}
