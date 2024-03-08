import { Router } from 'express';

import {
  LISTUSERS,
  UPDATEUSER,
  DELETEUSER,
} from '../config/routers';
import {
  get_all_users,
  update_user,
  remove_user,
} from '../controllers/users';

export default (router: Router) => {
  router.get(LISTUSERS, get_all_users);
  router.patch(UPDATEUSER, update_user);
  router.delete(DELETEUSER, remove_user);
};
