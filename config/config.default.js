'use strict';

/**
 * egg-cipher default config
 * @member Config#cipher
 * @property {String} passphrase - 默认的 cipher 密码
 */
exports.cipher = {
  client: {
    passphrase: '',
    outputEncoding: 'hex',
  },
};
