import express from 'express';
import { run } from './docker';
import { Functions } from './db';
import * as github from './github';

const router = express.Router();

router.post('/run', (req, res) => {
  run(req.body.string, req.body.func).then(val => {
    res.send(val);
  });
});

router.post('/save', (req, res) => {
  const func = new Functions({
    trigger: req.body.string,
    code: req.body.func,
    owner: 'Max',
  });
  func.saveAll()
  .then(() => {
    res.json({ status: 'ok' });
  })
  .catch((e) => {
    res.json({
      error: e,
    });
  });
});

router.get('/exec', (req, res) => {
  Functions.get(req.query.trigger)
    .then(result => result.code)
    .then(result => {
      run(req.query.string, result).then(val => {
        res.json({
          result: val.result,
        });
      });
    })
    .catch((e) => {
      res.json({
        status: 'error',
        error: e,
      });
    });
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
