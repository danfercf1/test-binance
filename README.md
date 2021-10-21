# Binance Test

It is a binance pair test.

## How to run the project for development environment

```bash
docker-compose -f docker-compose-dev up
```

And then you can run the service using the debug mode:

```bash
npm run service:debug
```

## Environment variables configuration

You need to create a `.env` file and configure the below variables inside the `.env` file

```text
MONGO_URI = mongodb://my_user:my_pass@localhost:27017/binance_dev # This is for development environment
PORT = 8080
MONGO_INITDB_ROOT_USERNAME = root
MONGO_INITDB_ROOT_PASSWORD = my_root_pass
MONGO_DB_USER = my_user
MONGO_DB_PASSWORD = my_pass
MONGO_DB_NAME = binance_dev
CRON_TIME = */60 * * * *
ENABLE_CRON = 1
```

## How to run the project in production mode

Run the project following the next steps:

```bash
npm run prepare
```

And then:

```bash
docker-compose up
```
