import { Router } from 'express';

import {
  CREATEMED,
  LISTMEDS,
  VIEWMED,
  UPDATEMED,
  DELETEMED,
} from '../config/routers';
import {
  create_med,
  get_all_meds,
  view_med,
  update_med,
  remove_med,
} from '../controllers/medicine';

export default (router: Router) => {
  router.post(CREATEMED, create_med);
  router.get(LISTMEDS, get_all_meds);
  router.get(VIEWMED, view_med);
  router.patch(UPDATEMED, update_med);
  router.delete(DELETEMED, remove_med);
};
