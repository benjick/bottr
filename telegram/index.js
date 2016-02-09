var TelegramBot = require('node-telegram-bot-api');
var fetch = require('node-fetch');
var qs = require('querystring');

var token = process.env.TELEGRAM;
var api = process.env.APIURL || 'http://192.168.99.100:3000/api/exec?';
var bot = new TelegramBot(token, {polling: true});

bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  if(msg.text && msg.text.slice(0, 1) === '/') {
    var command = msg.text.replace('/', '');
    var cmd = command.split(/ (.+)?/);
    var query = qs.stringify({
      trigger: cmd[0],
      string: cmd[1],
    })
    fetch(api + query)
      .then(function(res) {
        return res.json();
      })
      .then(function(res) {
        if(!res.error && res.result !== '') {
          bot.sendMessage(chatId, res.result);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
});
