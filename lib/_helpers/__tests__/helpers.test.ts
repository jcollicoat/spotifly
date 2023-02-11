import { describe, expect, test } from '@jest/globals';
import { appendUUID } from '../helpers';

describe('appendUUID()', () => {
    test('Should append a UUID', () => {
        // Arrange
        const input = 'somestring';
        // Act
        const output = appendUUID(input);
        // Assert
        expect(output.length).toBe(input.length + 37);
        const regex =
            /^somestring-[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
        expect(regex.test(output)).toBe(true);
    });
});
