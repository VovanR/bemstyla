#!/usr/bin/env node
'use strict';

var program = require('commander');
var _ = require('lodash');
var pkg = require('../package.json');
var Promise = require('bluebird');
var fs = require('fs');

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

function checkExists(path) {
	return new Promise(function (resolve, reject) {
		fs.stat(path, function (err, stats) {
			if (!err || (stats && stats.isDirectory())) {
				return resolve(path);
			}
			console.log(err.message);
			return reject();
		});
	});
}

function checkAccess(path) {
	return new Promise(function (resolve, reject) {
		fs.access(path, fs.R_OK | fs.W_OK, function (err) {
			if (!err) {
				return resolve();
			}
			console.error(err.message);
			return reject();
		});
	});
}

function start() {
	var index = require('../lib/index');

	_.forEach(program.args, function (arg) {
		index({
			source: arg,
			fileType: program.type,
			baseDir: program.dir
		});
	});
}

if (program.dir) {
	checkExists(program.dir)
		.then(checkAccess)
		.then(function () {
			start();
		})
		.catch(function () {});
} else {
	start();
}
