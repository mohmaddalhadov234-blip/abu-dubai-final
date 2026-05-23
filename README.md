# Abu Dhabi Final - Роскошный веб-проект

Современный веб-сайт премиум-класса, посвящённый Абу-Даби. Адаптивный дизайн, тёмная тема, плавные анимации и интеграция с Supabase.

## ✨ Особенности

- ⚡ Next.js 16 (App Router)
- 🎨 Tailwind CSS + Shadcn/ui компоненты
- 🌙 Поддержка тёмной темы
- 🔥 Полностью адаптивный дизайн
- 🔐 Аутентификация и база данных через Supabase
- 📱 Оптимизировано для мобильных устройств
- ⚡ Быстрая производительность

## 🛠 Технологии

- **Frontend**: Next.js 16, React 19, TypeScript
- **Стили**: Tailwind CSS, Shadcn/ui, Lucide Icons
- **Бэкенд**: Supabase (Auth + Database)
- **Формы**: React Hook Form + Zod
- **UI**: Radix UI + Tailwind

## 🚀 Быстрый старт

### 1. Клонируйте репозиторий
```bash
git clone https://github.com/mohmaddalhadov234-blip/abu-dubai-final.git
cd abu-dubai-final
```

### 2. Установите зависимости
```bash
npm install
```

### 3. Настройте окружение
Скопируйте файл `.env.local.example` в `.env.local` и заполните данные Supabase:

```bash
cp .env.local.example .env.local
```

### 4. Запустите проект
```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 📁 Структура проекта

```
abu-dubai-final/
├── app/                 # App Router (Next.js 16)
├── components/          # Переиспользуемые компоненты
├── lib/                 # Утилиты и Supabase client
├── hooks/               # Кастомные React хуки
├── styles/              # Глобальные стили
├── public/              # Статические файлы
├── supabase-setup.sql   # SQL скрипт для базы данных
└── components.json      # Конфигурация Shadcn/ui
```

## 📸 Скриншоты

*(Добавь скриншоты проекта позже)*

## Лицензия

MIT License.