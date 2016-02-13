//import editor from './ace';

const submit = document.getElementById('runCode');
const text = document.getElementById('codeInput');
const output = document.getElementById('console');
const result = document.getElementById('result');

const codeName = document.getElementById('codeName');
const save = document.getElementById('saveCode');

submit.addEventListener('click', e => {
  submit.className = `${submit.className} is-loading`;
  e.preventDefault();
  fetch('/api/run', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      string: text.value,
      func: editor.getValue(),
    }),
  })
  .then(val => val.text())
  .then(val => {
    const data = JSON.parse(val);
    output.innerText = data.console.join('\n');
    result.innerText = data.result;
    submit.className = submit.className.replace('is-loading', '');
    console.log(data);
  })
  .catch(console.log);
});

save.addEventListener('click', e => {
  e.preventDefault();
  fetch('/api/save', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      string: codeName.value,
      func: editor.getValue(),
    }),
  })
  .then(val => val.json())
  .then(val => {
    console.log(val);
  })
  .catch(console.log);
});
