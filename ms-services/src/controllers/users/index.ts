import { Request, Response } from 'express';

import { UserModel } from '../../db/users';
import { update_schema } from "../../validation"
import { lists_of_items, successfully_updated, successfully_deleted, empty_list, something_wrong } from '../../config/content';

/* 
  @method: GET
  @endpoint: /v1/users/userlist
  @details: all users list
*/
export const get_all_users = async (req: Request, res: Response) => {
  try{
    const users = await UserModel.find();
    return res.json({ code: 200, data: users, message: !users ? lists_of_items : empty_list }).end();
  } catch(err) {
    return res.json({ code: 400, data: null, message: something_wrong, });
  }
}

/* 
  @method: PATCH
  @endpoint: /v1/user/:id
  @details: update user
*/
export const update_user = async (req: Request, res: Response) => {
  const { first_name, last_name, phone, } = req.body;

  const { error } = update_schema.validate({ first_name, last_name, phone, });
  if(error) {
    return res.status(400).json({ 
      error: error.details[0].message 
    });
  } 

  try{
    const { userid } = req.params;
    await UserModel.findByIdAndUpdate(userid, { first_name, last_name, phone, });
    const updated_info = await UserModel.findById(userid);
    return res.json({ code: 200, data: updated_info, message: successfully_updated }).end();
  } catch(err) {
    return res.json({ code: 400, data: null, message: something_wrong, });
  }
}

/* 
  @method: DELETE
  @endpoint: /v1/user/:id
  @details: delete user
*/
export const remove_user = async (req: Request, res: Response) => {
  try{
    const { userid } = req.params;
    const view_info = await UserModel.findById(userid);
    await UserModel.findOneAndDelete({ _id: userid });
    return res.json({ code: 200, data: null, message: `${view_info.email} ${successfully_deleted}` }).end();
  } catch(err) {
    return res.json({ code: 400, data: null, message: something_wrong, });
  }
}