import { Request, Response } from 'express';

import { SlotsModel } from '../db/slots';
import { ISlot } from '../interface';
import { slots_schema } from "../validation"
import { 
  empty_list,
  exist_item, 
  lists_of_items, 
  successfully_created, 
  successfully_updated, 
  successfully_deleted, 
  something_wrong 
} from '../config/content';

/* 
  @method: GET
  @endpoint: /v1/slots
  @details: all slots list
*/
export const get_all_slots = async (req: Request, res: Response) => {
  console.log("sdkjfhhjsdgfhjg");
  try{
    const slots = await SlotsModel.find();
    return res.json({ code: 200, data: slots, message: !slots ? lists_of_items : empty_list }).end();
  } catch(err) {
    return res.json({ code: 400, data: null, message: something_wrong, });
  }
}

/* 
  @method: GET
  @endpoint: /v1/slot/:id
  @details: view slot
*/
export const view_slot = async (req: Request, res: Response) => {
  try{
    const { slotid } = req.params;
    const view_info = await SlotsModel.findById(slotid);
    return res.json({ code: 200, data: view_info, message: `${successfully_deleted}` }).end();
  } catch(err) {
    return res.json({ code: 400, data: null, message: something_wrong, });
  }
}

/* 
  @method: POST
  @endpoint: /v1/slot
  @details: create slot
*/
export const create_slots = async (req: Request, res: Response) => {
  const { slot_name } = req.body;

  const { error } = slots_schema.validate({ slot_name });
  if(error) {
    return res.status(400).json({ 
      error: error.details[0].message 
    });
  } 
  
  try{
    const slot: ISlot = new SlotsModel({ slot_name: `${slot_name.split(' ').join('-')}-${new Date().toISOString().split('T')[0]}` });
    await slot.save();
    return res.json({ code: 200, data: { slot }, message: successfully_created }).end();
  } catch(err) {
    return res.json({ code: 400, data: null, message: something_wrong, });
  }
}

/* 
  @method: PATCH
  @endpoint: /v1/slot/:id
  @details: update slot
*/
export const update_slot = async (req: Request, res: Response) => {
  const { slot_name } = req.body;
  
  const { error } = slots_schema.validate({ slot_name });
  if(error) {
    return res.status(400).json({ 
      error: error.details[0].message 
    });
  } 

  try{
    const { slotid } = req.params;
    await SlotsModel.findByIdAndUpdate(slotid, { slot_name: `${slot_name.split(' ').join('-')}-${new Date().toISOString().split('T')[0]}` });
    const updated_info = await SlotsModel.findById(slotid);
    return res.json({ code: 200, data: updated_info, message: successfully_updated }).end();
  } catch(err) {
    return res.json({ code: 400, data: null, message: something_wrong, });
  }
}

/* 
  @method: DELETE
  @endpoint: /v1/slot/:id
  @details: delete slot
*/
export const remove_slot = async (req: Request, res: Response) => {
  try{
    const { slotid } = req.params;
    const view_info = await SlotsModel.findById(slotid);
    await SlotsModel.findOneAndDelete({ _id: slotid });
    return res.json({ code: 200, data: null, message: `${view_info.slot_name} ${successfully_deleted}` }).end();
  } catch(err) {
    return res.json({ code: 400, data: null, message: something_wrong, });
  }
}