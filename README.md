# SONGS AGAINST HUMANITY

## Setup

### DB
* `cd server/database`
* `cp .example-env .env`
* add DB password to `.env`
* `docker-compose up`
* `prisma deploy --env-file .env` (performs db migrations)

### Server
* `cd server`
* `cp .example-env .env`
* add jwt secret to `.env`
* `npm install`
* `npm start`
