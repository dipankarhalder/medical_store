import { Router } from 'express';

import {
  LISTUSERS,
  VIEWUSER,
  UPDATEUSER,
  DELETEUSER,
} from '../config/routers';
import {
  get_all_users,
  get_user,
  update_user,
  remove_user,
} from '../controllers/users';

export default (router: Router) => {
  router.get(LISTUSERS, get_all_users);
  router.get(VIEWUSER, get_user);
  router.patch(UPDATEUSER, update_user);
  router.delete(DELETEUSER, remove_user);
};
