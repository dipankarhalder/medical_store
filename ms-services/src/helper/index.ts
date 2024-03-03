import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { app_config } from '../config/env';

const { JWTSECRET } = app_config;
export const generateJWTtoken = (email: string) => {
  return jwt.sign(
    { email }, 
    JWTSECRET, 
    { expiresIn: '2h' }
  )
};

export const jwtVerifyToken = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  jwt.verify(
    token, 
    JWTSECRET, 
    (error: any, decoded: any) => {
      if (error) {
        return res.status(403).send('Forbidden');
      }
      req.body.user = decoded;
      next();
    }
  );
}