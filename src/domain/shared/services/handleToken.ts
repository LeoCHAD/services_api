import {JwtPayload, sign, verify} from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '1010';

const generateToken = (payload: {}, expiresIn: string)=>{
  const jwt = sign(payload, JWT_SECRET,{expiresIn});
  return jwt
};
const decodeToken = (jwt: string): string | JwtPayload | boolean=>{
  try {
    return verify(jwt, JWT_SECRET);
  } catch (error) {
    return false;
  }
};
const verifyToken = (jwt: string): boolean=>{
  try {
    verify(jwt, JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

export {generateToken, verifyToken, decodeToken}