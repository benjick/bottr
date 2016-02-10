import snabbdom from 'snabbdom';

import s1 from 'snabbdom/modules/class';
import s2 from 'snabbdom/modules/props';
import s3 from 'snabbdom/modules/style';
import s4 from 'snabbdom/modules/eventlisteners';

const patch = snabbdom.init([
  s1, s2, s3, s4
]);

export { patch };
