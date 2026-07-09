import { describe, expect, it } from 'vitest';

import { parseCoordinate } from './coordinate-parser';

describe('parseCoordinate', () => {
  // ── DMS with cardinal ───────────────────────────────────────────────────

  describe('DMS with cardinal directions', () => {
    it('parses N/W directions (lat first)', () => {
      const result = parseCoordinate('45°30\'12"N, 73°30\'12"W');
      expect(result?.lonLat[0]).toBeCloseTo(-73.5033, 3);
      expect(result?.lonLat[1]).toBeCloseTo(45.5033, 3);
      expect(result?.confidence).toBe('high');
    });

    it('parses E/N directions (lon first)', () => {
      const result = parseCoordinate('73°30\'00"E, 45°30\'00"N');
      expect(result?.lonLat[0]).toBeCloseTo(73.5, 3);
      expect(result?.lonLat[1]).toBeCloseTo(45.5, 3);
      expect(result?.confidence).toBe('high');
    });

    it('parses space-separated DMS', () => {
      const result = parseCoordinate('45 30 12 N, 73 30 12 W');
      expect(result?.lonLat[0]).toBeCloseTo(-73.5033, 3);
      expect(result?.lonLat[1]).toBeCloseTo(45.5033, 3);
    });

    it('handles S and W (southern/western hemisphere)', () => {
      const result = parseCoordinate('33°52\'00"S, 151°12\'00"E');
      expect(result?.lonLat[0]).toBeCloseTo(151.2, 3);
      expect(result?.lonLat[1]).toBeCloseTo(-33.8667, 3);
    });
  });

  // ── DM with cardinal ────────────────────────────────────────────────────

  describe('DM (decimal minutes) with cardinal directions', () => {
    it('parses decimal minutes', () => {
      const result = parseCoordinate("45°30.5'N, 73°30.5'W");
      expect(result?.lonLat[0]).toBeCloseTo(-73.5083, 3);
      expect(result?.lonLat[1]).toBeCloseTo(45.5083, 3);
      expect(result?.confidence).toBe('high');
    });
  });

  // ── DD with cardinal ────────────────────────────────────────────────────

  describe('decimal degrees with cardinal direction', () => {
    it('parses 45.5°N 73.5°W', () => {
      const result = parseCoordinate('45.5°N, 73.5°W');
      expect(result?.lonLat).toEqual([-73.5, 45.5]);
      expect(result?.confidence).toBe('high');
    });

    it('parses E/N order', () => {
      const result = parseCoordinate('73.5°E, 45.5°N');
      expect(result?.lonLat).toEqual([73.5, 45.5]);
      expect(result?.confidence).toBe('high');
    });
  });

  // ── Plain decimal ───────────────────────────────────────────────────────

  describe('plain decimal degrees', () => {
    it('passes through as-is when both values fit in lat range (ambiguous)', () => {
      // Both fit in lat range — treated as [lon, lat] (WGS-84 convention)
      const result = parseCoordinate('45.5, -73.5');
      expect(result?.lonLat).toEqual([45.5, -73.5]);
    });

    it('detects longitude by magnitude > 90', () => {
      const result = parseCoordinate('151.2, -33.87');
      expect(result?.lonLat[0]).toBeCloseTo(151.2, 2);
      expect(result?.lonLat[1]).toBeCloseTo(-33.87, 2);
      expect(result?.confidence).toBe('high');
    });

    it('swaps when second value exceeds 90', () => {
      const result = parseCoordinate('-33.87, 151.2');
      expect(result?.lonLat[0]).toBeCloseTo(151.2, 2);
      expect(result?.lonLat[1]).toBeCloseTo(-33.87, 2);
      expect(result?.confidence).toBe('high');
    });

    it('marks low confidence when both values are within latitude range', () => {
      const result = parseCoordinate('45.5, -73.5');
      expect(result?.confidence).toBe('low');
    });

    it('accepts space as separator', () => {
      const result = parseCoordinate('45.5 -73.5');
      expect(result?.lonLat).toEqual([45.5, -73.5]);
    });

    it('accepts European decimal comma notation', () => {
      const result = parseCoordinate('45,5 -73,5');
      expect(result?.lonLat).toEqual([45.5, -73.5]);
    });
  });

  // ── Invalid inputs ──────────────────────────────────────────────────────

  describe('invalid inputs', () => {
    it('returns null for plain text', () => {
      expect(parseCoordinate('Montreal')).toBeNull();
    });

    it('returns null for a single number', () => {
      expect(parseCoordinate('45.5')).toBeNull();
    });

    it('returns null for out-of-range coordinates', () => {
      expect(parseCoordinate('200, 100')).toBeNull();
    });

    it('returns null for empty string', () => {
      expect(parseCoordinate('')).toBeNull();
    });

    it('returns null for invalid latitude in DMS', () => {
      expect(parseCoordinate('95°00\'00"N, 73°30\'00"W')).toBeNull();
    });
  });

  // ── Edge cases ──────────────────────────────────────────────────────────

  describe('edge cases', () => {
    it('handles zero coordinates', () => {
      const result = parseCoordinate('0°N, 0°E');
      expect(result?.lonLat).toEqual([0, 0]);
      expect(result?.confidence).toBe('high');
    });

    it('is case-insensitive', () => {
      const result = parseCoordinate('45.5°n, 73.5°w');
      expect(result?.lonLat).toEqual([-73.5, 45.5]);
    });

    it('handles leading/trailing whitespace', () => {
      const result = parseCoordinate('  45.5°N, 73.5°W  ');
      expect(result?.lonLat).toEqual([-73.5, 45.5]);
    });
  });
});
