'use strict'

// helper functions
function convertTime (unitOut, num, unitIn='mil') {
  let time = {
    hr: 3600000,
    min: 60000,
    sec: 1000,
    mil: 1
  };
  return ((time[unitIn] / time[unitOut]) * num)
}


module.exports = convertTime;
