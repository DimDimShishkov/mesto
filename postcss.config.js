const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  // You can specify any options from https://postcss.org/api/#processoptions here
  // parser: 'sugarss',
  plugins: [autoprefixer, cssnano({ preset: "default" })],
};
