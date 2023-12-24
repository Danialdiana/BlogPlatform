// Подключение необходимых модулей и настройка приложения
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const flash = require('connect-flash');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Подключение модели пользователя
const User = require('./models/user');

// Создание экземпляра приложения Express
const app = express();

// Подключение маршрутов
const blogRoutes = require('./routes/index');

// Настройка приложения
app.use(cors());
app.use(bodyParser.json());

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6/university', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Ошибка подключения к базе данных:'));
db.once('open', () => {
  console.log('Успешное подключение к базе данных');
});

// Настройка сеанса Express и подключение модуля flash
app.use(expressSession({ 
  secret: 'diana', 
  resave: false, 
  saveUninitialized: false 
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username: username }).exec()
      .then((user) => {
        if (!user || user.password !== password) {
          return done(null, false, { message: 'Неправильное имя пользователя или пароль' });
        }
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).exec()
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});


app.use('/', blogRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порте ${PORT}`);
});
