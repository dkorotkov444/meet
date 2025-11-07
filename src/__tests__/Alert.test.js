/*
 * src/__tests__/Alert.test.js
 * Unit tests for the Alert components (InfoAlert, WarningAlert, ErrorAlert).
 */

/* eslint-env jest */

import React from 'react';
import { render } from '@testing-library/react';
import { InfoAlert, WarningAlert, ErrorAlert } from '../components/Alert';

describe('<Alert /> components', () => {
    test('InfoAlert renders provided text and applies the correct styles', () => {
        const { getByText } = render(<InfoAlert text="Info message" />);
        const p = getByText('Info message');
        expect(p).toBeInTheDocument();
        // color and background-color are set in the subclass constructor
        expect(p).toHaveStyle('color: rgb(0, 0, 255)');
        expect(p).toHaveStyle('background-color: rgb(220, 220, 255)');
        // common Alert styles
        expect(p).toHaveStyle('border-width: 2px');
        expect(p).toHaveStyle('border-style: solid');
        expect(p).toHaveStyle('font-weight: bolder');
        expect(p).toHaveStyle('border-radius: 7px');
        expect(p).toHaveStyle('font-size: 12px');
        expect(p).toHaveStyle('text-align: center');
        expect(p).toHaveStyle('padding: 10px');
    });

    test('WarningAlert and ErrorAlert render with their distinct colors/backgrounds', () => {
        const { getByText: getWarn } = render(<WarningAlert text="Warning here" />);
        const warn = getWarn('Warning here');
        expect(warn).toBeInTheDocument();
        expect(warn).toHaveStyle('color: rgb(255, 165, 0)');
        expect(warn).toHaveStyle('background-color: rgb(255, 235, 204)');

        const { getByText: getErr } = render(<ErrorAlert text="Error occurred" />);
        const err = getErr('Error occurred');
        expect(err).toBeInTheDocument();
        expect(err).toHaveStyle('color: rgb(255, 0, 0)');
        expect(err).toHaveStyle('background-color: rgb(255, 204, 204)');
    });

    test('InfoAlert still renders when `text` prop is not provided (no crash)', () => {
        const { container } = render(<InfoAlert />);
        const p = container.querySelector('p');
        expect(p).toBeInTheDocument();
        expect(p.textContent).toBe('');
    });
});
