'use strict'

const request = require('request');
const convertTime = require('./helpers');

class Vigil {
  constructor(url) {
    this.URL = url;
    this.startTime = Date.now();
    this.runtime = 8;
    this.gap = 20;
    this.req = {
      interval: convertTime('mil', this.gap, 'min'),
      count: 0
    }
  }

  ping() {
    request(this.URL, (err, res) => {
      if (!err) {
        this.req.count++;
        console.log(`Request ${this.req.count} to ${this.URL} successful.`);
      } else {
        console.error(err.message);
      }
    });
  }

  exit(){
    this.endTime = Date.now();
    let elapsedTimeMil = (this.endTime - this.startTime);
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

    console.log(`
Vigil lasted: ${elapsedTime} ${unit}
Requests made: ${this.req.count}`);
  }

  init() {
    console.log(
`----------------
| Heroku Vigil |
----------------
Keeping your free Heroku dyno awake and alert
for as long as possible. ;)\n
Set to request ${this.URL}.
Every ${this.gap} minute(s) for ${this.runtime} hour(s).\n`);

    this.ping();
    setInterval(_ => {this.ping()}, this.req.interval);
    setTimeout(process.exit, convertTime('mil', this.runtime, 'hr'));
  }
}

module.exports = Vigil;
