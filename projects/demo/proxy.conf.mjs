/**
 * @type {import('vite').ServerOptions['proxy']}
 */
export default {
  '^/apis(?:/local)?/terrapi': {
    target: 'https://terrapi.devgeo.securite.gouv.qc.ca',
    rewrite: (path) => path.replace(/^\/apis(?:\/local)?\/terrapi/, ''),
    secure: false,
    changeOrigin: true,
    configure: configureProxy()
  },
  '^/apis(?:/local)?/icherche': {
    target: 'https://icherche.devgeo.securite.gouv.qc.ca',
    rewrite: (path) => path.replace(/^\/apis(?:\/local)?\/icherche/, ''),
    secure: false,
    changeOrigin: true,
    configure: configureProxy()
  }
};

function configureProxy() {
  /**
   * @param {import('vite').HttpProxy.Server} proxy
   * @param {import('vite').ProxyOptions} options
   */
  return (proxy, options) => {
    // Show log on DEBUG_PROXY
    if (process.env.DEBUG_PROXY === 'true') {
      proxy.on('proxyReq', (proxyReq, req, _res) => {
        const headers = proxyReq.getHeaders();
        console.log(
          'Proxy',
          req.method,
          req.url,
          ' -> ',
          `${headers.host}${proxyReq.path}`
        );
      });
    }
  };
}
