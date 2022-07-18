require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: `http://localhost:${process.env.PORT}` }));

require('./app/routes/')(app);

app.get('/', (request, response) => response.send('Test'));

app.listen(process.env.PORT, () =>
  console.log(`Listening: port ${process.env.PORT}`)
);

// const handlebars = require('express-handlebars');

// app.set('view engine', 'hbs');

// app.engine(
//   'hbs',
//   handlebars.engine({
//     layoutsDir: __dirname + '/views/layouts',
//     partialsDir: __dirname + '/views/partials/',
//     extname: 'hbs',
//   })
// );

// app.use(express.static('public'));

// fakeApi = () => 'Faker';

// app.get('/', (req, res) => {
//   res.render('home-main', { layout: 'index', posts: fakeApi() });
// });

// app.get('/login', (req, res) => {
//   res.render('login-main', { layout: 'index' });
// });

// app.get('/register', (req, res) => {
//   res.render('register-main', { layout: 'index' });
// });
