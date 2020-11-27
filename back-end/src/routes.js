import Router from 'express';
import auth from './controllers/AuthController.js';
import {
  isLogged,
  login,
  register,
  updatePassword,
} from './controllers/AuthenticationControllers.js';
import {
  getUser,
  setDescription,
  setPhoto,
} from './controllers/UserControllers.js';
import {
  createTopic,
  getRecentTopics,
  getSpecificTopic,
  getTopicsFromUser,
  reply,
} from './controllers/TopicsControllers.js';

const routes = Router();

routes.get('/isLogged', isLogged);
routes.post('/register', register);
routes.post('/login', login);
routes.put('/setPassword', auth, updatePassword);

routes.get('/user/:user', getUser);
routes.put('/setDescription', auth, setDescription);
routes.put('/setPhoto', auth, setPhoto);

routes.get('/topics/from/:userId', getTopicsFromUser);
routes.get('/topics', getRecentTopics);
routes.get('/topics/:topic', getSpecificTopic);
routes.post('/reply', auth, reply);
routes.post('/topic', auth, createTopic);

export default routes;
