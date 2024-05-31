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
const axios = require('axios');
const { ApolloServer, gql } = require('apollo-server-express');


const User = require('./models/user');

const app = express();

const blogRoutes = require('./routes/index');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6/university', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Ошибка подключения к базе данных:'));
db.once('open', () => {
  console.log('Успешное подключение к базе данных');
});

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

const typeDefs = gql`
  type Fact {
    fact: String
  }

  type Query {
    facts: [Fact]
  }
`;

// Define GraphQL resolvers
const resolvers = {
  Query: {
    facts: async () => {
      try {
        const response = await axios.get('https://api.api-ninjas.com/v1/facts', {
          headers: { 'X-Api-Key': '1pOanPeQTuRzQLlh5G93hw==WH9yUyUrSpAqYR12' }
        });
        return response.data.map(fact => ({ fact: fact.fact }));
      } catch (error) {
        console.error('Error fetching facts:', error);
        throw new Error('Не удалось получить факты');
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer().catch(error => {
  console.error('Error starting server:', error.message);
});

app.get('/api/facts', async (req, res) => {
  try {
    const response = await axios.get('https://api.api-ninjas.com/v1/facts', {
      headers: { 'X-Api-Key': '1pOanPeQTuRzQLlh5G93hw==WH9yUyUrSpAqYR12' }
    });
    res.json(JSON.stringify(response.data)); // Преобразование объекта в JSON-строку
  } catch (error) {
    console.error('Error fetching facts:', error);
    res.status(500).json({ error: 'Не удалось получить факты' });
  }
});



app.use('/', blogRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порте ${PORT}`);
});

