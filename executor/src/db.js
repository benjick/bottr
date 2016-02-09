import Thinky from 'thinky';
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

export {
  Functions,
};
