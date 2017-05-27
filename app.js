#!/usr/bin/env node

'use strict'

const Vigil = require('./vigil');
const vigil = new Vigil('https://www.google.com/');

vigil.init();
