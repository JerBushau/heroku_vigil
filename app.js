#!/usr/bin/env node

'use strict'

const request = require("request");
const startTime = Date.now();
const URL = 'https://packtpubbot.herokuapp.com/';
const runtime = process.argv[2] || 8;
const gap = process.argv[3] || 20;
const reqInterval = convertTime('mil', gap, 'min');
let reqCount = 0;

function convertTime(unitOut, num, unitIn='mil') {
  let time = {
    hr: 3600000,
    min: 60000,
    sec: 1000,
    mil: 1
  };
  return ((time[unitIn] / time[unitOut]) * num)
}

function ping() {
  request(URL, function(err, res) {
    if (!err) {
      reqCount++;
      console.log('Request successful.');
    } else {
      console.error(err.message);
    }
  });
}

function gracefulExit() {
  const endTime = Date.now();
  const elapsedTimeMil = endTime - startTime;
  let elapsedTime;
  let unit;

  if (elapsedTimeMil > 3600000) {
    unit = 'hour(s)';
    elapsedTime = +convertTime('hr', elapsedTimeMil).toFixed(1);

  } else if (elapsedTimeMil > 60000) {
    unit = 'minute(s)';
    elapsedTime = +convertTime('min', elapsedTimeMil).toFixed(1);

  } else if (elapsedTimeMil > 1000) {
    unit = 'second(s)';
    elapsedTime = convertTime('sec', elapsedTimeMil).toFixed(0);
  }

  console.log(`\nSent ${reqCount} successful request(s).`);
  console.log(`Vigil ran for ${elapsedTime} ${unit}.`);
}

function initApp() {
  console.log(`
Heroku vigil!\n
Set to request ${URL}.
Every ${gap} minute(s) for ${runtime} hour(s).\n`)

  ping()
  setInterval(ping, reqInterval);
  setTimeout(process.exit, convertTime('mil', runtime, 'hr'));
}

// main program
initApp();

// on exit
process.on('SIGINT', function() {
  process.exit();
});
process.on('exit', gracefulExit);
