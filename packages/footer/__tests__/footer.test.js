'use strict';

const footer = require('..');
const assert = require('assert').strict;

assert.strictEqual(footer(), 'Hello from footer');
console.info('footer tests passed');
