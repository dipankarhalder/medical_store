import { Router } from 'express';

import { 
  REGISTER, 
  LOGIN, 
  LOGOUT 
} from '../config/routers';
import { 
  register, 
  login, 
  logout 
} from '../controllers/auth';

export default (router: Router) => {
  router.post(REGISTER, register);
  router.post(LOGIN, login);
  router.get(LOGOUT, logout);
};