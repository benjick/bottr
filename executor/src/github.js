import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';

export function url() {
  return `https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.GITHUB_CLIENT}`;
}

function signToken(user) {
  return jwt.sign({ user }, process.env.JWT_SECRET);
}

export function callback(code) {
  return fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT,
      client_secret: process.env.GITHUB_SECRET,
      code,
    }),
  })
  .then(res => res.json())
  .then(res => res.access_token)
  .then(token =>
    fetch(`https://api.github.com/user?access_token=${token}`)
  )
  .then(res => res.json())
  .then(res => res.login)
  .then(signToken)
  .catch(console.log);
}
