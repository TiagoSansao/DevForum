// IMPORTS AND CONFIGS

import express from 'express';
import cors from 'cors';
import {} from 'dotenv/config.js';
import mongoose from 'mongoose';

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
  username: { type: String, min: 3, max: 20, required: true },
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

// API CALLS

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

app.post('/reply', (req, res) => {
  const { content, topic } = req.body;
  const author = '5fac1ac4f231cb2230cf8083'; // temporary
  const data = { author: author, content: content, date: new Date() };
  Topic.findById(topic, (err, result) => {
    if (err) return res.status(400).json({ status: 'Invalid topic ID.' });
    result.replies.push(data);
    result.save((err) => {
      if (err) console.log(err);
      res.status(200).json({ status: 'success' });
    });
  });
});

app.post('/topic', (req, res) => {
  const { title, content, author, category } = req.body;
  const date = new Date();
  const topicData = {
    title: title,
    content: content,
    author: author,
    date: date,
    category: category,
  };
  const newTopic = new Topic(topicData);
  newTopic.save((err) => {
    if (err) return res.status(400).json({ status: 'failed' });
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
        const userData = {
          username: user,
          password: password,
          email: email,
          registerDate: date,
          birthday: new Date(birthday),
        };
        const newUser = new User(userData);
        newUser.save((err) => {
          if (err) return res.status(400).json({ status: 'failed' });
          res.status(200).json({ status: 'success' });
        });
      }
    }
  );
});

// TURNING THE SERVER ON

app.listen(port, () => {
  console.log('Server is running on PORT: ' + port);
});
