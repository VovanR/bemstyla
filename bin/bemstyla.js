#!/usr/bin/env node
'use strict';

var program = require('commander');
var _ = require('lodash');
var pkg = require('../package.json');

program
	.version(pkg.version)
	.option('-t, --type [type]', 'file type [styl]', 'styl')
	.option('-d, --dir [value]', 'output files location')
	.on('--help', function () {
		console.log('  Examples:');
		console.log('');
		console.log('    bemstyla -h');
		console.log('    bemstyla block__elem');
		console.log('    bemstyla block__foo block__bar_baz foo__bar foo__qux');
		console.log('    bemstyla header.jade footer.html');
		console.log('    bemstyla -t css bar__baz_qux');
		console.log('    bemstyla -d styles/blocks blockname');
		console.log('');
	})
	.parse(process.argv);

if (program.args.length < 1) {
	program.help();
}

var index = require('../lib/index');

_.forEach(program.args, function (arg) {
	index({
		source: arg,
		fileType: program.type,
		baseDir: program.dir
	});
});
