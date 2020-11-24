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
  title: { type: String, required: true, max: 50, min: 5 },
  content: { type: String, reqired: true, max: 2048, min: 5 },
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
  description: { type: String, max: 256 },
});

const User = mongoose.model('User', userSchema);
const Topic = mongoose.model('Topic', topicSchema);

// MIDDLEWARES

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function auth(req, res, next) {
  const token = req.header('auth-token');
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
    .limit()
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
      res.status(200).json(result);
    });
});

app.post('/reply', auth, (req, res) => {
  const { content, topic } = req.body;
  if (content.length > 2048) return res.status(404);
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
  if (title.length > 50 || content.length > 2048) return res.status(404);
  const date = new Date();
  const topicData = {
    title: title,
    content: content,
    author: req.user._id,
    date: date,
    category: category,
  };
  const newTopic = new Topic(topicData);
  newTopic.save((err, result) => {
    if (err) return console.log(err);
    res.status(200).send(result._id);
  });
});

app.post('/register', (req, res) => {
  const { user, password, email, birthday } = req.body;
  if (user.length > 14 || email.length > 256)
    return res.status(250).json({
      status:
        'Exceeding the max length? Are you challenging my capacity to make a simple validation Sr.Hacker-man?',
    });
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
        const token = jwt.sign({ _id: result._id }, process.env.JWT_TOKEN, {
          expiresIn: '12h',
        });
        res.header('auth-token', token).send(token);
      } else return res.status(250).json({ status: 'Password is wrong.' });
    });
  });
});

app.put('/setDescription', async (req, res) => {
  const { _id, desc } = req.body;
  if (desc.length > 256)
    res
      .status(250)
      .send(
        'The maximum length is 256, are you challenging my capacity to make a simple validation Sr.Hacker-man?'
      );
  const response = await User.findByIdAndUpdate(_id, { description: desc });
  if (response) return res.status(200).send();
  res.status(250).send('Something went wrong.');
});

app.put('/setPassword', (req, res) => {});

app.put('/setPhoto', (req, res) => {});

// TURNING THE SERVER ON

app.listen(port, () => {
  console.log('Server is running on PORT: ' + port);
});
