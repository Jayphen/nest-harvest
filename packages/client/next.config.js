require('dotenv').config();
const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  env: {
    API: process.env.API,
  },
  cssModules: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.tsx$/,
      use: ['astroturf/loader'],
    })

    return config
  },
});
