export type LonLat = [number, number];

export interface CoordinateParseResult {
  lonLat: LonLat;
  /**
   * `'high'` – coord order is unambiguous (explicit direction letters or one
   * value is outside the ±90° latitude range).
   *
   * `'low'` – both values fit in the latitude range so order cannot be
   * determined; input is treated as already in `[lon, lat]` order (WGS-84
   * / GeoJSON convention).
   */
  confidence: 'high' | 'low';
}

/**
 * Attempts to parse a string as a WGS-84 geographic coordinate.
 *
 * Supported formats:
 * - **DMS** with cardinal direction – `45°30'12"N, 73°30'12"W`
 * - **DM** with cardinal direction  – `45°30.5'N, 73°30.5'W`
 * - **DD** with cardinal direction  – `45.5°N, 73.5°W`
 * - **Plain decimal**               – `45.5, -73.5` or `-73.5 45.5`
 *
 * Space-separated variants (e.g. `45 30 12 N, 73 30 12 W`) are also accepted
 * for DMS and DM formats.
 *
 * @returns A `CoordinateParseResult` with the coordinate in `[lon, lat]` order,
 *          or `null` when the input is not recognised as a coordinate.
 */
export function parseCoordinate(input: string): CoordinateParseResult | null {
  const str = input.trim().toUpperCase();

  // ── 1. DMS / DM with cardinal ─────────────────────────────────────────────
  let m = str.match(DMS_RE);
  if (m) {
    const [, d1, min1, sec1, dir1, d2, min2, sec2, dir2] = m;
    const a = dmsToDecimal(toFloat(d1), toFloat(min1), toFloat(sec1), dir1);
    const b = dmsToDecimal(toFloat(d2), toFloat(min2), toFloat(sec2), dir2);
    const lonLat = directedToLonLat(a, dir1, b);
    return lonLat ? { lonLat, confidence: 'high' } : null;
  }

  // ── 2. Decimal degrees with ° + cardinal ─────────────────────────────────
  m = str.match(DD_CARDINAL_RE);
  if (m) {
    const [, v1, dir1, v2, dir2] = m;
    const a = applyDirection(toFloat(v1), dir1);
    const b = applyDirection(toFloat(v2), dir2);
    const lonLat = directedToLonLat(a, dir1, b);
    return lonLat ? { lonLat, confidence: 'high' } : null;
  }

  // ── 3. Plain decimal ─────────────────────────────────────────────────────
  m = str.match(PLAIN_RE);
  if (m) {
    const a = toFloat(m[1]);
    const b = toFloat(m[2]);

    if (!isFinite(a) || !isFinite(b)) return null;
    if (Math.abs(a) > 180 || Math.abs(b) > 180) return null;

    // If one value is outside the latitude range it must be the longitude
    if (Math.abs(a) > 90 && Math.abs(b) <= 90) {
      return isValidLonLat(a, b)
        ? { lonLat: [a, b], confidence: 'high' }
        : null;
    }
    if (Math.abs(b) > 90 && Math.abs(a) <= 90) {
      return isValidLonLat(b, a)
        ? { lonLat: [b, a], confidence: 'high' }
        : null;
    }

    // Both values fit in the lat range — order is ambiguous.
    // Treat input as [lon, lat] (WGS-84 / GeoJSON convention).
    return isValidLonLat(a, b) ? { lonLat: [a, b], confidence: 'low' } : null;
  }

  return null;
}

function toFloat(s: string | undefined, fallback = 0): number {
  if (!s) return fallback;
  return parseFloat(s.replace(',', '.'));
}

function applyDirection(value: number, dir: string): number {
  return dir === 'S' || dir === 'W' ? -Math.abs(value) : Math.abs(value);
}

function dmsToDecimal(
  deg: number,
  min: number,
  sec: number,
  dir: string
): number {
  return applyDirection(deg + min / 60 + sec / 3600, dir);
}

function isValidLonLat(lon: number, lat: number): boolean {
  return (
    isFinite(lon) &&
    isFinite(lat) &&
    Math.abs(lat) <= 90 &&
    Math.abs(lon) <= 180
  );
}

/** Returns `[lon, lat]` given two values and their respective direction letters. */
function directedToLonLat(a: number, dirA: string, b: number): LonLat | null {
  const [lon, lat] = 'EW'.includes(dirA) ? [a, b] : [b, a];
  return isValidLonLat(lon, lat) ? [lon, lat] : null;
}

// ─── patterns ────────────────────────────────────────────────────────────────

// One coord component: degrees + minutes (with optional decimal) + optional seconds + cardinal.
// Handles DMS (`45°30'12"N`), DM (`45°30.5'N`), and space-separated equivalents.
const DMS_PART = String.raw`(\d{1,3})[°\s]\s*(\d{1,2}(?:[.,]\d+)?)['\s′]?\s*(?:(\d{1,2}(?:[.,]\d+)?)["″]?\s*)?([NSEW])`;
const DMS_RE = new RegExp(`^${DMS_PART}[,\\s]+${DMS_PART}$`);

// One coord component: decimal degrees with explicit ° symbol + cardinal.
// Handles `45.5°N`.
const DD_CARDINAL_PART = String.raw`(\d{1,3}(?:[.,]\d+)?)°\s*([NSEW])`;
const DD_CARDINAL_RE = new RegExp(
  `^${DD_CARDINAL_PART}[,\\s]+${DD_CARDINAL_PART}$`
);

// Two signed decimal numbers separated by a comma or whitespace.
const PLAIN_RE =
  /^([+-]?\d{1,3}(?:[.,]\d+)?)\s*[,\s]\s*([+-]?\d{1,3}(?:[.,]\d+)?)$/;
