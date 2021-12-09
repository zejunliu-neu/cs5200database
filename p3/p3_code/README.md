# nodeExpressMongoJade

A basic example showcasing an Mongo Database with server side rendering

## Import data to redis
redis-cli -h localhost -p 6379 < ./movies.redis
## Installation

Clone the repository, then

```
cd nodeExpressMongoJade

npm install
npm run start
```

And your app should be running on http://localhost:3000 . It assumes that you have `mongod` running on `mongodb://localhost:27017` or that you have the MONGO_URL environment variable set to the database you want to use
# nodeExpressRedisJade
