'use strict'

const request = require("request");
const URL = 'https://packtpubbot.herokuapp.com/';
const gap = 25;
const interval = convertTime('min', 'mil', gap);
const startTime = Date.now();
let requestCount = 0;

function convertTime(unitIn, unitOut, num) {
  let time = {
    hr: 3600000,
    min: 60000,
    sec: 1000,
    mil: 1
  };
  return Math.floor((time[unitIn] / time[unitOut]) * num)
}

function ping() {
  request(URL, function(err, res) {
    if (!err) {
      requestCount++;
      console.log('Request successful.');
    } else {
      console.error(err.message);
    }
  });
}

console.log(
  `Heroku vigil!\n
Set to request ${URL}.
Every ${gap} minutes.\n`)

ping()
setInterval(ping, interval);

process.on('SIGINT', function() {
  let endTime = Date.now();
  let elapsedTime = Math.floor(convertTime('mil', 'min', (endTime - startTime)));

  console.log(`\nElapsed time: ${elapsedTime} minutes.`);
  console.log(`\nSent ${requestCount} successful request(s).`);
  process.exit();
});
