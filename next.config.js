const path = require('path');
const withReactSvg = require('next-react-svg');

module.exports = withReactSvg({
  include: path.resolve(__dirname, 'src/assets'),
  trailingSlash: true,
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  images: {
    domains: ['image.tmdb.org', "www.themoviedb.org"],
  },
});
