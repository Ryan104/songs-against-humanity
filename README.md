# SONGS AGAINST HUMANITY

## Setup

### DB
* `cd server/database`
* `docker-compose up -d`
* `cd ..`
* `cp .example-env .env`
* add DB password to `.env`
* `prisma deploy` (performs db migrations)

### Server
* `cd server`
* add jwt secret to `.env`
* `npm install`
* `npm start`
