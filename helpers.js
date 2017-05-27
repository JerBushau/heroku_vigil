'use strict'

// helper functions

module.exports = {
  convertTime: function(unitOut, num, unitIn='mil') {
    let time = {
      hr: 3600000,
      min: 60000,
      sec: 1000,
      mil: 1
    };
    return ((time[unitIn] / time[unitOut]) * num)
  },
  formatTime: function(timeInMil) {
    let time;
    let unit;

    if (timeInMil > 3600000) {
      unit = 'hour(s)';
      time = +this.convertTime('hr', timeInMil).toFixed(1);

    } else if (timeInMil > 60000) {
      unit = 'minute(s)';
      time = +this.convertTime('min', timeInMil).toFixed(1);

    } else if (timeInMil > 1000) {
      unit = 'second(s)';
      time = this.convertTime('sec', timeInMil).toFixed(0);
    }
    return `${time} ${unit}`
  }
}
