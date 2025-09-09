/**
 *
 * @param routerUrl
 * @param lang
 * @param strategy default to 'segment' set the first segment of the path (e.g., '/en/alerts' => 'en')
 */
export function parseUrlWithLanguage(
  routerUrl: string,
  lang: string
): [url: string, params: string | undefined] {
  // eslint-disable-next-line prefer-const
  let [url, params] = routerUrl.split('?');

  const urlParts = url.split('/');
  if (urlParts.length > 1) {
    urlParts[1] = lang;
  }

  url = urlParts.join('/');

  return [url, params];
}
