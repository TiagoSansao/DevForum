import User from '../models/User.js';

const getUser = async (req, res) => {
  User.findOne(
    { username: req.params.user },
    { password: 0, email: 0 },
    (err, result) => {
      if (err || result === null) return res.status(404).send();
      res.status(200).json(result);
    }
  );
};

const setDescription = async (req, res) => {
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
};

const setPhoto = async (req, res) => {
  const { _id } = req.body;
  const user = await User.findById(_id);
  user.imgKey = req.file.filename;
  const response = await user.save();
  if (response) return res.status(200).send('Image updated successfully');
  res.status(250).send('Something went wrong.');
};

const deletePhoto = async (req, res) => {
  const response = await User.findByIdAndUpdate(
    req.body._id,
    { imgKey: '' },
    { useFindAndModify: true }
  );
  if (response) return res.status(200).send('Image removed successfully.');
  res.status(250).send('Something went wrong.');
};

export { getUser, setDescription, setPhoto, deletePhoto };
