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
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVwYUBlcGEuY29tIiwiaWF0IjoxNjc2OTM0NjU1LCJleHAiOjE2NzY5MzgyNTV9.wajnCz9XB4K1XRIgW3AyCmd1iWbCl9n0du3FdAA-QYw

export {generateToken, verifyToken}