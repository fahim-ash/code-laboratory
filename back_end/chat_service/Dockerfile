FROM python:3.10
WORKDIR /app
RUN pip install --upgrade pip
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8002

CMD ["daphne", "-b", "0.0.0.0", "-p", "8002", "chat_service.asgi:application"]
