import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { UserModel } from '../../db/users';
import { IUser } from '../../interface/auth';
import { generateJWTtoken } from '../../helper';
import { log_schema, reg_schema } from "../../validation"
import { cookie_title, exist_user, not_email, wrong_password, something_wrong, successfully_created, successfully_login, successfully_logout, } from '../../config/content';

/* 
  @method: POST
  @endpoint: /v1/auth/signup
  @details: register
*/
export const register = async (req: Request, res: Response) => {
  const { first_name, last_name, email, phone, password,role } = req.body;

  // validate field
  const { error } = reg_schema.validate({ first_name, last_name, email, phone, password,role, });
  if(error) {
    return res.status(400).json({ 
      error: error.details[0].message 
    });
  } 

  try {
    // find email exist or not
    const existing_email = await UserModel.findOne({ email });
    if (existing_email) {
      return res.status(400).json({ 
        msg: `${email} ${exist_user}` 
      });
    }
    
    // hasing password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user: IUser = new UserModel({ first_name, last_name, email, phone, password: hashed, role, });

    // save user
    await user.save();
    return res.json({ code: 200, data: { first_name, last_name, email, phone, role }, message: successfully_created }).end();
  } catch (error) {
    return res.json({ code: 400, data: null, message: something_wrong, });
  }
};

/* 
  @method: POST
  @endpoint: /v1/auth/signin
  @details: login
*/
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // validate field
  const { error } = log_schema.validate({ email, password });
  if(error) {
    return res.status(400).json({ 
      error: error.details[0].message 
    });
  }

  try {
    // find user by email
    const current_user = await UserModel.findOne({ email });
    if (!current_user) {
      return res.status(400).json({ 
        msg: `${email} ${not_email}` 
      });
    }
    
    // validate password
    const valid_password = await bcrypt.compare(password, current_user.password);
    if (!valid_password) {
      return res.status(400).json({ 
        msg: wrong_password 
      });
    }

    // generate token and set it to cookie
    const token = generateJWTtoken(email);
    res.cookie(cookie_title, token, { httpOnly: true });

    return res.json({ code: 200, data: token, message: successfully_login }).end();
  } catch (error) {
    return res.json({ code: 400, data: null, message: something_wrong, });
  }
};

/* 
  @method: GET
  @endpoint: /v1/auth/logout
  @details: logout
*/
export const logout = async (req: Request, res: Response) => {
  // remove cookie
  res.clearCookie(cookie_title);
  return res.json({ code: 200, data: null, message: successfully_logout }).end();
}