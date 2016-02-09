var editor = ace.edit('editor');
editor.setTheme('ace/theme/twilight');
editor.getSession().setMode('ace/mode/javascript');
editor.getSession().setTabSize(2);
editor.setFontSize(20);

var submit = document.getElementById('runCode');
var text = document.getElementById('codeInput');
var output = document.getElementById('console');
var result = document.getElementById('result');

var codeName = document.getElementById('codeName');
var save = document.getElementById('saveCode');

submit.addEventListener('click', function (e) {
  submit.className = submit.className + ' is-loading';
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
    })
  })
  .then(val => { return val.text(); } )
  .then(val => {
    var data = JSON.parse(val);
    output.innerText = data.console.join('\n');
    result.innerText = data.result;
    submit.className = submit.className.replace('is-loading', '');
    console.log(data);
  })
  .catch(console.log);
});

save.addEventListener('click', function (e) {
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
    })
  })
  .then(val => { return val.json(); } )
  .then(val => {
    console.log(val);
  })
  .catch(console.log);
});
