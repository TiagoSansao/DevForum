import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const isLogged = async (req, res) => {
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
};

const register = (req, res) => {
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
            const token = jwt.sign({ _id: result._id }, process.env.JWT_TOKEN);
            res.header('auth-token', token).status(200).send(token);
          });
        })();
      }
    }
  );
};

const login = (req, res) => {
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
};

const updatePassword = async (req, res) => {
  const { _id, newPassword, currentPassword } = req.body;
  if (newPassword.length === 0 || currentPassword.length === 0)
    return res.status(250).send('Fill the whole form before submiting');
  if (newPassword.length < 6)
    return res
      .status(250)
      .send('Your new password needs to have at least 6 characters.');
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  const response = await User.findById(_id, { password: 1 });
  bcrypt.compare(currentPassword, response.password).then((compareResult) => {
    if (!compareResult) {
      return res.status(250).send('Your current password is invalid');
    }
    response.password = hashedPassword;
    response.save((err) => {
      if (err) console.log(err);
      return res.status(200).send('Changed password successfully');
    });
  });
};

export { isLogged, register, login, updatePassword };
