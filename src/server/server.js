const express = require('express');
require('dotenv').config();
const session = require('express-session');
// const connectRedis = require('connect-redis');
const redis = require('redis');
const Redis = require('ioredis');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const router = require('./routes');
const { passportConfig } = require('./utils/passport');

const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 3000;

//app middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');

// redis config
let redisClient;
if (process.env.NODE_ENV !== 'production') {
  redisClient = redis.createClient({ legacyMode: true });
  redisClient.connect().catch(console.error);
} else {
  redisClient = new Redis(process.env.REDIS_URL);
}

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

app.use(router);

app.listen(PORT, () => {
  console.log(`Server started at port http://localhost:${PORT}`);
});
