/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1656984964406_2165';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: true,
    }
  };

  exports.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root1234',
    database: 'board',    
    define: {
      tableName: 'messages',
      timestamps: true,
      createdAt: 'created',
      updatedAt: 'updated',
    }
  };

  exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
      '.html': 'nunjucks',
    },
  };

  exports.validate = {
    convert: true,
    widelyUndefined: true
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
