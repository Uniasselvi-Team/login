const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json());

const conn = require('./db/conn');
const User = require('./models/User');

const mainRoutes = require('./routes/mainRoutes')
app.use('/', mainRoutes)

conn
    .sync()
    .then(() => {
        app.listen(3000);
    })
    .catch((error) => {
        console.log(error);
    })