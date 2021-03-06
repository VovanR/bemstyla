#!/usr/bin/env node
'use strict';

var fs = require('fs');
var program = require('commander');
var updateNotifier = require('update-notifier');
var pkg = require('../package.json');

program
	.version(pkg.version)
	.option('-t, --type [type]', 'file type [styl]', 'styl')
	.option('-f, --format [format]', 'file content format [styl] (by default based on type)')
	.option('-d, --dir [path]', 'output files location')
	.on('--help', function () {
		console.log('  Examples:');
		console.log('');
		console.log('    bemstyla -h');
		console.log('    bemstyla block__elem');
		console.log('    bemstyla block_mod block__elem_mod foo__bar foo__qux');
		console.log('    bemstyla block--mod block__elem--mod');
		console.log('    bemstyla header.pug body.jade footer.html');
		console.log('    bemstyla -t css bar__baz_qux');
		console.log('    bemstyla -f less foo_bar');
		console.log('    bemstyla -d styles/blocks blockname');
		console.log('');
	})
	.parse(process.argv);

updateNotifier({pkg: pkg}).notify();

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

	program.args.forEach(function (arg) {
		index({
			source: arg,
			fileType: program.type,
			fileFormat: program.format || program.type,
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
