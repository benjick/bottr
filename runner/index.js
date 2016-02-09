var args = process.argv.slice(2);
var text = args[0];
var code = args[1];

function done(msg) {
  console.log("RESULT:::", msg);
}

eval(code);
if(typeof(init) === 'function') {
  init(text, done);
} else {
  console.log("ReferenceError: init is not defined")
}
