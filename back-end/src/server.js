// IMPORTS AND CONFIGS

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {} from 'dotenv/config.js';

const port = process.env.PORT || 3000;
const app = express();

// DATABASE

mongoose.connect(process.env.MONGOOSE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const topicSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, reqired: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  replies: [
    {
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: { type: String, required: true },
      date: { type: Date },
    },
  ],
});

const userSchema = mongoose.Schema({
  username: { type: String, min: 3, max: 14, required: true },
  password: { type: String, min: 5, max: 256, required: true },
  email: { type: String, required: true, min: 5, max: 256 },
  registerDate: { type: Date, required: true },
  birthday: { type: Date, required: true },
});

const User = mongoose.model('User', userSchema);
const Topic = mongoose.model('Topic', topicSchema);

// MIDDLEWARES

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function auth(req, res, next) {
  const token = req.header('auth-token');
  console.log(token);
  if (!token) return res.status(403).send();
  try {
    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = verified;
  } catch (err) {
    return res.status(403).send();
  }
  next();
}

// API CALLS

app.get('/isLogged', async (req, res) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(200).send('not logged');
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    const userData = await User.findById(verified._id, { password: 0 });
    res.status(200).json(userData);
  } catch (err) {
    res.status(200).send('not logged');
  }
});

app.get('/user/:user', async (req, res) => {
  User.findOne(
    { username: req.params.user },
    { password: 0, email: 0 },
    (err, result) => {
      if (err || result === null) return res.status(404).send();
      res.status(200).json(result);
    }
  );
});

app.get('/topics/from/:userId', (req, res) => {
  Topic.find({ author: req.params.userId })
    .limit(20)
    .exec((err, result) => {
      if (err) console.log(err);
      res.status(200).json(result);
    });
});

app.get('/topics', (req, res) => {
  Topic.find()
    .limit(20)
    .populate('author', { password: 0, email: 0, __v: 0 })
    .exec((err, results) => {
      if (err) return console.log(err);
      res.status(200).json(results);
    });
});

app.get('/topics/:topic', (req, res) => {
  Topic.findById(req.params.topic)
    .populate('author', { password: 0, email: 0, __v: 0 })
    .populate('replies.author', { password: 0, email: 0, __v: 0 })
    .exec((err, result) => {
      if (err) return res.status(400).json({ status: err });
      console.log(result.author);
      res.status(200).json(result);
    });
});

app.post('/reply', auth, (req, res) => {
  const { content, topic } = req.body;
  const data = { author: req.user._id, content: content, date: new Date() };
  Topic.findById(topic, (err, result) => {
    if (err) return console.log(err);
    result.replies.push(data);
    result.save((err) => {
      if (err) console.log(err);
      res.status(200).json({ status: 'success' });
    });
  });
});

app.post('/topic', auth, (req, res) => {
  const { title, content, category } = req.body;
  const date = new Date();
  const topicData = {
    title: title,
    content: content,
    author: req.user._id,
    date: date,
    category: category,
  };
  const newTopic = new Topic(topicData);
  newTopic.save((err) => {
    if (err) return console.log(err);
    res.status(200).json({ status: 'success' });
  });
});

app.post('/register', (req, res) => {
  const { user, password, email, birthday } = req.body;
  const date = new Date();
  User.findOne(
    { $or: [{ username: user }, { email: email }] },
    (err, result) => {
      if (err) return console.log(err);
      if (result) {
        if (result.email === email && result.username === user) {
          res
            .status(250)
            .json({ status: 'This email and name are already in use.' });
        } else if (result.username === user) {
          res.status(250).json({ status: 'This name is already in use.' });
        } else {
          res.status(250).json({ status: 'This email is already in use.' });
        }
      } else {
        (async function () {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          const userData = {
            username: user,
            password: hashedPassword,
            email: email,
            registerDate: date,
            birthday: new Date(birthday),
          };
          const newUser = new User(userData);
          newUser.save((err, result) => {
            if (err)
              return res
                .status(250)
                .json({ status: 'You need to fill the whole form.' });
            console.log(result);
            const token = jwt.sign({ _id: result._id }, process.env.JWT_TOKEN);
            res.header('auth-token', token).status(200).send(token);
          });
        })();
      }
    }
  );
});

app.post('/login', (req, res) => {
  const { user, password } = req.body;
  User.findOne({ username: user }, (err, result) => {
    if (err) return console.log(err);
    if (!result) return res.status(250).json({ status: 'Username is wrong.' });
    bcrypt.compare(password, result.password).then((compareResult) => {
      if (compareResult) {
        const token = jwt.sign({ _id: result._id }, process.env.JWT_TOKEN);
        res.header('auth-token', token).send(token);
      } else return res.status(250).json({ status: 'Password is wrong.' });
    });
  });
});

// TURNING THE SERVER ON

app.listen(port, () => {
  console.log('Server is running on PORT: ' + port);
});
