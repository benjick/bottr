import Thinky from 'thinky';
import { verify } from './token';

const thinky = Thinky({
  host: 'db',
  db: 'test',
});
const type = thinky.type;

// Create a model - the table is automatically created
const Functions = thinky.createModel('Functions', {
  trigger: type.string(),
  code: type.string(),
  owner: type.string(),
}, {
  pk: 'trigger',
});

function saveFunction(trigger, code, token) {
  const decoded = verify(token);
  if (decoded) {
    const insert = new this({
      trigger,
      code,
      owner: decoded.user,
    });
    return insert.saveAll();
  }
  throw new Error('Invalid token');
}

Functions.defineStatic('saveFunction', saveFunction);

function getCode(trigger) {
  return this.get(trigger)
    .then(result => result.code);
}

Functions.defineStatic('getCode', getCode);

export {
  Functions,
};
