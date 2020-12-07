# test-job-task
Backend api

## Зависимости
1) postgresql server или любой другой SQL server
2) redis server
3) node modules

## Установка
1) `npm install`
2) создайте .env файл в корневой папке, в .env указать `JWT_SECRET_KEY`. К сожалению, по неясной мне причине, не удалось использовать sequelize вместе c dotenv, так что вот конфигурации sequelize:
  `('db', 'name', 'password', 
  {
    host: 'localhost',
    dialect: 'postgres'
  }
  )`
  Если же вы хотите поменять названия, то sequelize данные вводятся в трех разных файлах: `models/database`, `/tests/unit/authService.test.js`, `/tests/unit/noteService.test.js`

## API документация
`jwt header` - ввести токен в `authorization` header
| URL | method |jwt header|success response| error response|params|description|
| ------ | ------ |------ | ------ | ------ | ------ |------ |
| ``/auth/signup`` | POST |не требуется|jwt| 400/500 |username:string, password:string|регестрирует нового пользователя
|``/auth/login``|POST| не требуется|jwt|403/500|username:string, password:string|вход в систему|
|``/auth/logout``|POST|authorization(jwtToken) |200| 403/500| нет|деактивирует jwt пользователя
|``/auth/isValidToken``|GET|authorization(jwtToken) | 200| 403| нет| проверка jwt

| URL | method |jwt header|success response| error response|params|description|
| ------ | ------ |------ | ------ | ------ | ------ |------ |
| ``/note/my`` | GET |authorization(jwtToken)|массив заметок пользователя|500/403 |нет|возвращает все заметки конкретного пользователя
| ``/note`` | POST |authorization(jwtToken)|новосозданная заметка|500/403/400 |text:string|создает новую заметку
| ``/note/:id`` | DELETE |authorization(jwtToken)|200|500/403/404 |нет|удаляет заметку
| ``/note/:id`` | PUT |authorization(jwtToken)|200|500/403/404 |text:string|редактирует заметку
| ``/note/share/:id`` | GET |authorization(jwtToken)|ссылка на шейрнутую заметку|500/403/404 |нет|создает ссылку на любую собственную заметку
| ``/note/:id/:key`` | GET |не требуется|шейрнутая заметка|500/404 |нет|возвращает заметку

## API требования

- [x] Регистрация пользователя  

- [x] Авторизация пользователя

- [x] Разлогин пользователя со сбросом всех сессий пользователя

- [x] Создание заметки

- [x] Получение списка заметок (учесть, что заметок может быть сколь угодно много у каждого пользователя)

- [x] Редактирование заметки

- [x] Удаление заметки

- [x] Расшаривание заметки для неавторизованного пользователя

- [x] Отображение текста заметки неавторизованному пользователю по ссылке

## Тесты
1) Юнит тесты, проверял работу отдельно взятой функции
2) Интеграционные тесты, проверял работу отдельных url раутов
