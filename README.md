# SONGS AGAINST HUMANITY

## Setup

### DB
* `cd server`
* `cp .example-env .env` (need prisma endpoint)
* `cd database`
* `cp .example-env .env` (db config info)
* add DB password to `.env`
* `docker-compose up -d`
* `cd ..`
* `prisma deploy` (performs db migrations)

### Server
* `cd server`
* add jwt secret to `.env`
* `npm install`
* `npm start`
