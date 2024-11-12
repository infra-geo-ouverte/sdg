export function readQueryParamLanguage(): string | undefined {
  if (!window) {
    return undefined;
  }
  const queryParams = window.location.search.slice(1);
  const params = queryParams.split('&');
  const langParams = params.find((param) => param.includes('lang'));
  if (langParams) {
    return langParams.split('=').pop();
  }

  return undefined;
}

export function parseUrlWithLanguage(
  routerUrl: string,
  lang: string
): [url: string, params: string | undefined] {
  const [url, params] = routerUrl.split('?');

  let urlSegements = `lang=${lang}`;
  if (params) {
    const segments = params.split('&');
    const segmentsFiltered = segments.filter(
      (segement) => !segement.includes('lang=')
    );
    if (segmentsFiltered.length) {
      urlSegements += segmentsFiltered.join('&');
    }
  }

  return [url, urlSegements];
}
