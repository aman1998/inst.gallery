#!/bin/bash

# Названия контейнеров и портов
OLD_CONTAINER="inst-gallery"
NEW_CONTAINER="inst-gallery-new"
IMAGE_NAME="inst-gallery"
IMAGE_TAG="latest"
PORT_OLD=3000
PORT_NEW=3001

echo "🚮 1. Очистка неиспользуемых Docker-объектов (images, volumes, containers)..."
docker system prune -a -f --volumes

echo "🐳 2. Сборка нового образа..."
docker build -t $IMAGE_NAME:$IMAGE_TAG .

echo "🚀 3. Запуск нового контейнера на порту $PORT_NEW..."
docker run -d --name $NEW_CONTAINER --env-file .env -p $PORT_NEW:3000 $IMAGE_NAME:$IMAGE_TAG

echo "⏳ 4. Проверка, что новый контейнер отвечает..."
for i in {1..30}; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT_NEW)
  echo "Проверка $i: HTTP $STATUS"
  if [ "$STATUS" == "200" ]; then
    echo "✅ Новый контейнер успешно запущен."
    break
  fi
  sleep 1
done

if [ "$STATUS" != "200" ]; then
  echo "❌ Новый контейнер не отвечает. Откат."
  docker stop $NEW_CONTAINER && docker rm $NEW_CONTAINER
  exit 1
fi

echo "🛑 5. Остановка и удаление старого контейнера ($OLD_CONTAINER)..."
docker stop $OLD_CONTAINER && docker rm $OLD_CONTAINER

echo "🔁 6. Остановка нового контейнера и запуск под старым именем и портом..."
docker stop $NEW_CONTAINER
docker run -d --name $OLD_CONTAINER --env-file .env -p $PORT_OLD:3000 $IMAGE_NAME:$IMAGE_TAG

echo "✅ Деплой завершён успешно и без даунтайма!"
