import Router from 'express';
import multer from 'multer';
import multerConfig from './config/multer.js';
import auth from './controllers/AuthController.js';
import {
  isLogged,
  login,
  register,
  updatePassword,
} from './controllers/AuthenticationControllers.js';
import {
  deletePhoto,
  getUser,
  setDescription,
  setPhoto,
} from './controllers/UserControllers.js';
import {
  createTopic,
  getRecentTopics,
  getSpecificTopic,
  getTopicsFromUser,
  getTopicsWithFilters,
  reply,
} from './controllers/TopicsControllers.js';

const routes = Router();

routes.get('/isLogged', isLogged);
routes.post('/register', register);
routes.post('/login', login);
routes.put('/setPassword', auth, updatePassword);

routes.get('/user/:user', getUser);
routes.put('/setDescription', auth, setDescription);
routes.put('/setPhoto', auth, multer(multerConfig).single('file'), setPhoto);
routes.put('/deletePhoto', auth, deletePhoto);

routes.get('/topics/from/:userId', getTopicsFromUser);
routes.get('/topics/:topic', getSpecificTopic);
routes.get('/topics', getRecentTopics);
routes.post('/search', getTopicsWithFilters);
routes.post('/reply', auth, reply);
routes.post('/topic', auth, createTopic);

export default routes;
