export function pathIsExternal(path: string): boolean {
  const regex = /^https?:\/\//;
  return regex.test(path);
}

export function isSafeUrl(url: string): boolean {
  const safePattern = /^(https?:\/\/|\/(?!\/)|\.\/|\.\.\/)/;
  const unsafePattern = /^(javascript:|data:|vbscript:)/i;
  return safePattern.test(url) && !unsafePattern.test(url.trim());
}
