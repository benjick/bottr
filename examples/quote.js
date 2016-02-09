var init = function(text, done) {
    var fetch = require('node-fetch')
    fetch('http://quotes.stormconsultancy.co.uk/random.json')
	.then(function(res) {
		return res.json();
	}).then(function(json) {
		done(json.quote + " - " + json.author)
	});
}
