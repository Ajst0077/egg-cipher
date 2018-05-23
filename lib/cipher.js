'use strict';
const crypto = require('crypto');

class Cipher {
  constructor({ passphrase, cipher = 'bf-cbc',
    inputEncoding = 'utf8', outputEncoding = 'base64',
    defaultTTL = 0, ivLength = 8 }) {
    this.passphrase = passphrase;
    this.cipher = cipher;
    this.inputEncoding = inputEncoding;
    this.outputEncoding = outputEncoding;
    this.defaultTTL = defaultTTL;
    this.ivLength = ivLength;
  }
  encrypt(params) {
    if (params === null) {
      throw new Error('Missing encrypt data');
    }
    if (!this.passphrase) {
      throw new Error('Require passphrase in config');
    }
    let { ttl, data } = params;
    if (typeof params !== 'object') {
      data = params.toString();
      ttl = this.defaultTTL;
    }
    const randomBytes = this.randomIv();
    const time = (new Date()).getTime() / 1000;
    if (ttl > 0) {
      ttl += Math.floor(time);
    }
    data = `${ttl}:${data}`;
    const cipher = crypto.createCipheriv(this.cipher, this.passphrase, randomBytes);
    let cryptedData = cipher.update(data, this.inputEncoding, this.outputEncoding);
    cryptedData += cipher.final(this.outputEncoding);
    return cryptedData + ':' + randomBytes.toString(this.outputEncoding);
  }
  decrypt(encryptedData) {
    if (encryptedData.indexOf(':') === -1) {
      return false;
    }
    const dataParts = encryptedData.split(':');
    const encodedIV = dataParts.pop();
    const data = new Buffer(dataParts.pop(), this.outputEncoding);
    const iv = new Buffer(encodedIV, this.outputEncoding);

    const decipher = crypto.createDecipheriv(this.cipher, this.passphrase, iv);
    let result = decipher.update(data, this.inputEncoding);
    result += decipher.final(this.inputEncoding);

    const [ ttl, text ] = result.split(':');

    if (ttl > 0 && this.hasExpired(ttl)) {
      return false;
    } else {
      return text;
    }
  }
  hasExpired(ttl) {
    if (ttl === 0) {
      return false;
    } else {
      const time = Math.floor((new Date()).getTime() / 1000);
      return ttl < time;
    }
  }
  randomIv() {
    return crypto.randomBytes(this.ivLength);
  }
}

module.exports = app => {
  app.addSingleton('cipher', config => {
    const cipher = new Cipher(config);
    return cipher;
  });
};
