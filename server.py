from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from bot import send_message
from config import CHAT_ID

app = FastAPI(title="Stefania Nails Form API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://alekseenkoolesa39-hash.github.io"],
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
        await send_message(CHAT_ID, message)
        return {"status": "ok", "message": "Заявка отправлена"}
    except Exception as e:
        # Теперь выводим полную ошибку в лог uvicorn
        import traceback
        traceback.print_exc()
        return {"status": "error", "message": "Не удалось отправить заявку"}
