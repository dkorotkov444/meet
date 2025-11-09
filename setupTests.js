/*
 * setupTests.js
 * Test setup: extends jest matchers for DOM testing.
 */

// --- Testing utilities ---
/* eslint-env jest */
import '@testing-library/jest-dom';

// Silence noisy console.error / console.warn output during tests. Tests can
// still inspect calls with `console.error.mock.calls` if needed.
const noop = () => {};
jest.spyOn(console, 'error').mockImplementation(noop);
jest.spyOn(console, 'warn').mockImplementation(noop);

jest.setTimeout(30000);

const { ResizeObserver } = window;

beforeEach(() => {
  //@ts-ignore
  delete window.ResizeObserver;
  window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});

afterEach(() => {
  window.ResizeObserver = ResizeObserver;
  // Clear mock call history but keep spies (console.error/warn) active.
  jest.clearAllMocks();
});