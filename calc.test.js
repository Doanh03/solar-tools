// Run: node calc.test.js
const assert = require('node:assert');
const { estimate } = require('./calc.js');

const r = estimate({ bill: 150, price: 0.12, sunHours: 4.5, costPerKwp: 700, coverPct: 80 });
assert.ok(Math.abs(r.kwp - 9.259) < 0.01, 'system size');
assert.ok(Math.abs(r.investment - 6481) < 1, 'investment');
assert.strictEqual(r.yearlySavings, 1440);
assert.ok(Math.abs(r.paybackYears - 4.5) < 0.01, 'payback');

assert.strictEqual(estimate({ bill: 0, price: 0.12, sunHours: 4.5, costPerKwp: 700, coverPct: 80 }), null);
assert.strictEqual(estimate({ bill: 150, price: 0.12, sunHours: 4.5, costPerKwp: 700, coverPct: 150 }).cover, 1);

console.log('all tests passed');
