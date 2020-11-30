import Topic from '../models/Topic.js';

const getTopicsFromUser = (req, res) => {
  Topic.find({ author: req.params.userId })
    .limit(20)
    .exec((err, result) => {
      if (err) console.log(err);
      res.status(200).json(result);
    });
};

const getRecentTopics = (req, res) => {
  Topic.find()
    .limit()
    .populate('author', { password: 0, email: 0, __v: 0 })
    .exec((err, results) => {
      if (err) return console.log(err);
      res.status(200).json(results);
    });
};

const getSpecificTopic = (req, res) => {
  Topic.findById(req.params.topic)
    .populate('author', { password: 0, email: 0, __v: 0 })
    .populate('replies.author', { password: 0, email: 0, __v: 0 })
    .exec((err, result) => {
      if (err) return res.status(400).json({ status: err });
      res.status(200).json(result);
    });
};

const getTopicsWithFilters = (req, res) => {
  const { title, category } = req.body;
  if (!title && !category) return res.status(250).send('No topics were found.');
  Topic.find({ title: title })
    .limit(20)
    .populate('author', { password: 0, email: 0, __v: 0 })
    .exec((err, result) => {
      if (err) console.log(err);
      res.status(200).send(result);
    });
};

const reply = (req, res) => {
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
};

const createTopic = (req, res) => {
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
};

export {
  getTopicsFromUser,
  getRecentTopics,
  getSpecificTopic,
  reply,
  createTopic,
  getTopicsWithFilters,
};
