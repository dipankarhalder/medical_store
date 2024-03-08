import express from 'express';
import authentication from './authentication';
import users from './users';
import slots from './slots';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  slots(router);
  return router;
};
