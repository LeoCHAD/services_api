import {sign, verify} from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '1010';

const generateToken = async (data: {})=>{
  const jwt = sign(data, JWT_SECRET,{expiresIn: '1h'});
  return jwt
};

const verifyToken = (jwt: string)=>{
  const isOk = verify(jwt, JWT_SECRET);
  return isOk
};

export {generateToken, verifyToken}