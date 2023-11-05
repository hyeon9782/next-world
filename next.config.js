const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const path = require('path');
const withVanillaExtract = createVanillaExtractPlugin();

module.exports = withVanillaExtract({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.realworld.io',
        port: '',
      },
    ],
  },
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
});
