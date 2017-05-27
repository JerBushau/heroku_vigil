'use strict'

const request = require('request');
const helpers = require('./helpers');

class Vigil {
  constructor(url) {
    this.startTime = Date.now();
    this.URL = url;
    this.gap = process.argv[2] || 20;
    this.runtime = process.argv[3] || 8;
    this.req = {
      interval: helpers.convertTime('mil', this.gap, 'min'),
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

    console.log(`
Vigil lasted: ${helpers.formatTime(elapsedTimeMil)}
Requests made: ${this.req.count}`);
  }

  init() {
    console.log(`
    ,,;;;;;,,
  ,;;:::::::;;,     ----------------
 ,;;::' , ':::;,    | Heroku Vigil |
 ;;::  /(   ::;;    ----------------
 ;;:: |  \\  ::;;
 ';;::.\\|/.::;;'    Keeping free Heroku dynos awake and alert
  ';:::'-.:::;'       for as long as possible.
    '';| |;''       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
       '-.          Set to request ${this.URL}.
       | |          Every ${helpers.formatTime(this.req.interval)} for ${helpers.formatTime(helpers.convertTime('mil', this.runtime, 'hr'))}.
      /\`"\`\\
     \`"---"\`
\n`)

    this.ping();
    setInterval(_ => { this.ping() }, this.req.interval);
    setTimeout(process.exit, helpers.convertTime('mil', this.runtime, 'hr'));
  }
}

module.exports = Vigil;
