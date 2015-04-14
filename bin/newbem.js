#!/usr/bin/env node
'use strict';

var program = require('commander');
var pkg = require('../package.json');

program
    .version(pkg.version)
    .parse(process.argv);

if (program.args.length !== 2) {
    program.help();
}

var creator = require('../lib/creator');

creator(program.args[0])
    .catch(function (err) {
        console.error(err.stack || err);
    });
