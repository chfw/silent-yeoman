'use strict';

var inquirer = require('inquirer');
var diff = require('diff');
var chalk = require('chalk');
var events = require('events');
var _ = require('lodash');
var logger = require('./log.js');

function DummyPrompt(answers, q) {
  this.answers = answers;
  this.question = q;
}

DummyPrompt.prototype.run = function (cb) {
  var answer = this.answers[this.question.name];
  var isSet;

  console.log(this.answers);
  console.log(this.question.name);
  console.log(answer);

  switch (this.question.type) {
    case 'list':
      // list prompt accepts any answer value including null
      isSet = answer !== undefined;
      break;
    case 'confirm':
      // ensure that we don't replace `false` with default `true`
      isSet = answer || answer === false;
      break;
    case 'input':
      isSet = true;
      break;
    default:
      // other prompts treat all falsy values to default
      isSet = !!answer;
  }

  if (!isSet) {
    answer = this.question.default;

    if (answer === undefined && this.question.type === 'confirm') {
      answer = true;
    }
  }

  setImmediate(function () {
    cb(answer);
  });
};

/**
 * `TerminalAdapter` is the default implementation of `Adapter`, an abstraction
 * layer that defines the I/O interactions.
 *
 * It provides a CLI interaction
 *
 * @constructor
 */
var TerminalAdapter = module.exports = function TerminalAdapter(answers) {
  answers = answers || {}
  this.prompt = inquirer.createPromptModule();

  Object.keys(this.prompt.prompts).forEach(function (promptName) {
    this.prompt.registerPrompt(promptName, DummyPrompt.bind(DummyPrompt, answers));
  }, this);

};

TerminalAdapter.prototype._colorDiffAdded = chalk.black.bgGreen;
TerminalAdapter.prototype._colorDiffRemoved = chalk.bgRed;
TerminalAdapter.prototype._colorLines = function colorLines(name, str) {
  return str.split('\n').map(function (str) {
    return this['_colorDiff' + name](str);
  }, this).join('\n');
};

/**
 * Prompt a user for one or more questions and pass
 * the answer(s) to the provided callback.
 *
 * It shares its interface with `Base.prompt`
 *
 * (Defined inside the constructor to keep interfaces separated between
 * instances)
 *
 * @param {Array} questions
 * @param {Function} callback
 */
TerminalAdapter.prototype.prompt = function () {};

/**
 * Shows a color-based diff of two strings
 *
 * @param {string} actual
 * @param {string} expected
 */
TerminalAdapter.prototype.diff = function _diff(actual, expected) {
  var msg = diff.diffLines(actual, expected).map(function (str) {
    if (str.added) {
      return this._colorLines('Added', str.value);
    }

    if (str.removed) {
      return this._colorLines('Removed', str.value);
    }

    return str.value;
  }, this).join('');

  // legend
  msg = '\n' +
    this._colorDiffRemoved('removed') +
    ' ' +
    this._colorDiffAdded('added') +
    '\n\n' +
    msg +
    '\n';

  console.log(msg);
  return msg;
};

/**
 * Logging utility
 * @type {env/log}
 */
TerminalAdapter.prototype.log = logger();
