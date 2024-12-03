export function pathIsExternal(path: string): boolean {
  const regex = /^https?:\/\//;
  return regex.test(path);
}
