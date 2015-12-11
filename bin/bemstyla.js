#!/usr/bin/env node
'use strict';

var program = require('commander');
var _ = require('lodash');
var pkg = require('../package.json');

program
	.version(pkg.version)
	.option('-t, --type [type]', 'file type [styl]', 'styl')
	.parse(process.argv);

if (program.args.length < 1) {
	program.help();
}

var index = require('../lib/index');

_.forEach(program.args, function (arg) {
	index(arg, program.type);
});
