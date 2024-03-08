import { Router } from 'express';

import { 
  CREATESLOT, 
  LISTSLOTS, 
  VIEWSLOT,
  UPDATESLOT, 
  DELETESLOT 
} from '../config/routers';
import { 
  create_slots, 
  get_all_slots, 
  view_slot,
  update_slot, 
  remove_slot 
} from '../controllers/slots';

export default (router: Router) => {
  router.post(CREATESLOT, create_slots);
  router.get(LISTSLOTS, get_all_slots);
  router.get(VIEWSLOT, view_slot);
  router.patch(UPDATESLOT, update_slot);
  router.delete(DELETESLOT, remove_slot);
};