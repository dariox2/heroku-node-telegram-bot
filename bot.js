
var token = process.env.TOKEN;

var Bot = require('node-telegram-bot-api');
var bot;

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

bot.onText(/^/, function (msg) {
  var fname = msg.from.first_name;
  var lname = (msg.from.last_name || '');
  var uname = msg.from.username;
  var time = new Date().toLocaleString();
  var reply = 'Hello, ' + fname + ' ' + lname + ' (@' + uname + ')\n'+ 'The time is '+time
  bot.sendMessage(msg.chat.id, reply).then(function () {
    // reply sent!
  });
});

module.exports = bot;
