module.exports = function createWebpackConfig() {
  /* eslint global-require: 'off' */

  const globalCfg = require('../global.cfg');

  let cfg = require('./parts/create-seed')(globalCfg);

  cfg = require('./parts/setup-js-entries')(cfg, globalCfg);
  cfg = require('./parts/setup-html-entries')(cfg, globalCfg);

  cfg = require('./parts/setup-output')(cfg, globalCfg);
  cfg = require('./parts/setup-debugging')(cfg, globalCfg);
  cfg = require('./parts/optimize-release-builds')(cfg, globalCfg);
  cfg = require('./parts/setup-dev-server')(cfg, globalCfg);
  cfg = require('./parts/process-js-code')(cfg, globalCfg);
  cfg = require('./parts/process-stylesheets')(cfg, globalCfg);
  cfg = require('./parts/process-assets')(cfg, globalCfg);

  return cfg;
};