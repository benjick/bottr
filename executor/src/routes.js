import express from 'express';
import { run } from './docker';
import { Functions } from './db';

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
  func.saveAll().then(() => {
    res.json({ status: 'ok' });
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

// router.post('/save', (req, res) => {
//   const validated = validateToken(req.params.token);
//   if (validated) {
//     var func = new Functions({
//       trigger: req.params.trigger,
//       code: req.param.code,
//       owner: validated.user,
//     });
//     func.saveAll().then(() => {
//       res.json({ status: 'ok' });
//     });
//   }
// });

export default router;
