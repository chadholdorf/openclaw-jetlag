import { isFlightEvent } from './index.js';

let passed = 0, failed = 0;

function assert(label, actual, expected) {
  if (actual === expected) {
    console.log(`  PASS  ${label}`);
    passed++;
  } else {
    console.error(`  FAIL  ${label} — expected ${expected}, got ${actual}`);
    failed++;
  }
}

assert('detects a known flight event',
  isFlightEvent({ summary: 'Delta Air: JFK → LAX' }), true);

assert('ignores a non-flight event',
  isFlightEvent({ summary: 'Dentist appointment' }), false);

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
