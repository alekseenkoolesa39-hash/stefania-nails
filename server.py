from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from bot import send_message
from config import CHAT_ID

app = FastAPI(title="Stefania Nails API")

# Разрешаем запросы с любых доменов
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем статику
app.mount("/", StaticFiles(directory="static", html=True), name="static")

@app.post("/send_form")
async def send_form(name: str = Form(...), phone: str = Form(...),
                    date: str = Form(...), comment: str = Form("")):
    message = f"""
<b>Новая заявка с сайта!</b>

<b>Имя:</b> {name}
<b>Телефон:</b> {phone}
<b>Дата:</b> {date}
<b>Комментарий:</b> {comment}
"""
    try:
        await send_message(int(CHAT_ID), message)
        return {"status": "ok", "message": "Заявка отправлена"}
    except Exception as e:
        print(f"Ошибка при отправке в Telegram: {e}")
        return {"status": "error", "message": "Не удалось отправить заявку"}
