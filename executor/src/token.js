import jwt from 'jsonwebtoken';

export function sign(user) {
  return jwt.sign({ user }, process.env.JWT_SECRET);
}

export function verify(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    return false;
  }
}
