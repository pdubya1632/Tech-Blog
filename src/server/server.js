const express = require('express');
require('dotenv').config();
const session = require('express-session');
const connectRedis = require('connect-redis');
const redis = require('redis');
const passport = require('passport');
const router = require('./routes');
const { passportConfig } = require('./utils/passport');

const app = express();
const PORT = process.env.PORT || 8000;

//app middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// redis config local
// const redisClient = redis.createClient({ legacyMode: true });

// const redisClient = createClient({
//   url: process.env.REDISCLOUD_URL,
//   no_ready_check: true,
//   legacyMode: true,
// });

// redis config heroku
const redisClient = redis.createClient({
  socket: {
    host: process.env.REDISCLOUD_HOST,
    port: 18021,
  },
  password: process.env.REDISCLOUD_PASS,
});

redisClient.on('error', (err) => {
  console.log('Error ' + err);
});

// redisClient.connect().catch(console.error);
const RedisStore = connectRedis(session);

// session middleware config
const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 1000 * 60 * 10,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passportConfig();

// router middleware
app.use(router);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
