const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');
const ip = require('internal-ip');
const portFinderSync = require('portfinder-sync');

const infoColor = (_message) => {
  return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`;
};

const port = portFinderSync.getPort(8080);
const localIp = ip.v4.sync();

module.exports = merge(commonConfiguration, {
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    port: port,
    static: {
      directory: './dist',
      watch: true,
    },
    open: true,
    server: {
      type: 'http',
    },
    allowedHosts: 'all',
    client: {
      overlay: true,
      logging: 'info',
    },
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) throw new Error('webpack-dev-server is not defined');

      const domain1 = `http://${localIp}:${port}`;
      const domain2 = `http://localhost:${port}`;

      console.log(`\nProject running at:\n  - ${infoColor(domain1)}\n  - ${infoColor(domain2)}\n`);

      return middlewares;
    },
  },
});
