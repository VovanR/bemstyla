#!/usr/bin/env node
'use strict';

var program = require('commander');
var pkg = require('../package.json');

program
    .version(pkg.version)
    .parse(process.argv);

if (program.args.length < 1) {
    program.help();
}

var index = require('../lib/index');
index(program.args[0])
