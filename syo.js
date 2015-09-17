#! /usr/bin/env node

var yeoman = require('yeoman-environment');
var adapter = require('./adapter.js');
var argv = require('minimist')(process.argv.slice(2))

console.log(argv);
var env = yeoman.createEnv([], {}, new adapter(argv));
env.register(argv['_'][0], 'Slient');
env.run('Slient', {'skip-install': true});


