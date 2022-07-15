const express = require('express');

const app = express();
const port = 3000;

const handlebars = require('express-handlebars');

app.set('view engine', 'hbs');

app.engine(
  'hbs',
  handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    partialsDir: __dirname + '/views/partials/',
  })
);

app.use(express.static('public'));

fakeApi = () => 'Faker';
app.get('/', (req, res) => {
  res.render('main', { layout: 'index', posts: fakeApi() });
});

app.listen(port, () =>
  console.log(`App listening to http://localhost:${port}`)
);
