## Начало работы

#### Настройка IDE
NB! Я разрабатываю в VSCode, так что тут будет инструкция будет только для него
Нужные расширения:
1. ESLint
2. Prettier
3. SCSS Formatter
4. Stylelint

После чего добавить в settings.json в VSCode:

```json
"eslint.useFlatConfig": true,
"stylelint.config": null,
"stylelint.validate": ["css", "scss"]
```

Рекомендованные расширения:
1. Twoslash Query Comments
2. Pretty TypeScript Errors
3. Path Intellisense
4. npm Intellisense
5. GitLens — Git supercharged
6. CSS Modules
7. CSS Variable Autocomplete
8. Conventional Commits
9. SCSS IntelliSense

#### Установка зависимостей
1. Установите [nvm](https://github.com/nvm-sh/nvm) или [nvm-windows](https://github.com/coreybutler/nvm-windows)
2. `nvm install && nvm use`
3. `corepack enable && corepack install`
4. `pnpm -v` -- нажми Y, если есть промт на установку pnpm
5. `pnpm install`

#### Настройка конфигов сервера для фронтенда
0. Запустить сервер
1. Скопировать .env.example в .env, добавить протокол, ip и порт сервера, чтобы заработали запросы
2. `pnpm codegen`

#### Команды
1. Для девсборки  `pnpm dev`
2. Для продакшена  `pnpm build` и `pnpm start`, либо `pnpm serve`
3. Анализ бандла `pnpm build:analyze`
4. Подчистить стили `pnpm lint`

#### Настройка тестов
1. `pnpm exec playwright install`

#### Troubleshooting
1. Если next выдал ошибку после добавления useQuery/useMutation в компонент, добавь `'use client';` в начало файла
