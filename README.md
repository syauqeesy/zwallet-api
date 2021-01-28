# zwallet-api
Zwallet Back-End API

## Requirements
- Node.js
- MySQL
- yarn package manager
- Postman (optional)
- MySQL workbench (optional)

## Installation
1. clone repository

```
git clone https://github.com/syauqeesy/zwallet-api.git
```

2. Install dependencies

```
yarn install
```

3. Copy _images folder to images in project root folder

4. Copy env file to .env in project root folder

5. Fill all the config variables in .env file
```
PORT=
BASE_URL=
CLIENT_BASE_URL=

SECRET_KEY=
MAIL_USER=
MAIL_PASSWORD=

DB_HOST=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
DB_DIALECT=
```

6. Run create db command (make sure MySQL server is ready)
```
yarn sequelize db:create
```

7. Run the migration command
```
yarn sequelize db:migrate
```

8. Run the app
```
yarn devStart
or
yarn start
```

## Postman collection
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/cdb2c982deaeb2063c8f)
