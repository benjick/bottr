import express from 'express';
import { run } from './docker';
import { Functions } from './db';
import * as github from './github';

const router = express.Router();

function error(err, res) {
  res.status(500).json({
    status: 'error',
    error: err,
  });
}

router.post('/run', (req, res) => {
  run(req.body.string, req.body.func).then(val => {
    res.send(val);
  });
});

router.post('/save', (req, res) => {
  Functions.saveFunction(req.body.string, req.body.func, req.query.token)
  .then(() => {
    res.json({ status: 'ok' });
  })
  .catch(e => error(e, res));
});

router.get('/exec', (req, res) => {
  Functions.getCode(req.query.trigger)
  .then(result => run(req.query.string, result))
  .then(result => {
    res.json({ result: result.result });
  })
  .catch(e => error(e, res));
});

router.get('/login', (req, res) => {
  res.redirect(github.url());
});

router.get('/callback', (req, res) => {
  github.callback(req.query.code)
  .then(token => res.json({
    token,
  }));
});

export default router;
