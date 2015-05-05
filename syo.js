#! /usr/bin/env node

var yeoman = require('yeoman-environment');
var adapter = require('./adapter.js');
var argv = require('minimist')(process.argv.slice(2))

var env = yeoman.createEnv([], {}, new adapter());
env.register(argv['_'][0], 'Slient');
env.run('Slient', argv);


