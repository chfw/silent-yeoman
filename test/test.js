var suppose = require('suppose')
var fs = require('fs')
var assert = require('assert')

var value = 'CustomValue';

process.chdir('test');
suppose('node', ['../syo.js', './generator-syotest/app', '--someOption', value])
.error(function(err){
  console.log(err);
})
.debug(fs.createWriteStream('/tmp/debug.txt'))
.end(function(code){
  var packageFile = './package.json';
  fs.readFile(packageFile, function(err, data){
    var packageObj = JSON.parse(data.toString());
    console.log(packageObj.name); //'awesome_package'
    assert.equal(packageObj.name, value);
  })
  var packageFile = './bower.json';
  fs.readFile(packageFile, function(err, data){
    var packageObj = JSON.parse(data.toString());
    console.log(packageObj.name); //'awesome_package'
    assert.equal(packageObj.name, value);
  })
})
