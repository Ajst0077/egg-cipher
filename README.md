# new auto tool will be publish on the basis of below code 
# egg-cipher

Cipher for egg.

## Install

```bash
npm i egg-cipher --save
```

Edit `config/plugin.js`

```javascript
exports.cipher = {
  enable: true,
  package: 'egg-cipher',
};
```

## Examples

```javascript
const letter = "Across the Great Wall we can reach every corner in the world.";
const encryptedLetter = this.app.cipher.encrypt(letter);
const decryptedLetter = this.app.cipher.decrypt(letter);
console.log(letter, encryptedLetter, decryptedLetter);
```

## TTL for encrypted data: expire after one hour

```javascript
const letter = "Across the Great Wall we can reach every corner in the world.";
const encryptedLetter = this.app.cipher.encrypt({ data: letter, ttl: 3600 });
const decryptedLetter = this.app.cipher.decrypt(letter);
console.log(letter, encryptedLetter, decryptedLetter);
```

## config

`config/config.default.js`

```javascript
config.cipher = {
  client: {
    // required, passphrase is the encoding key
    passphrase: 'nKJzOSeabeaOsIV4cK3H0lEO07U4DzGf',
    // default bf-cbc
    cipher: 'bf-cbc',
    // default input encoding: utf-8
    inputEncoding: 'utf8',
    // default output encoding: hex
    outputEncoding: 'hex',
    // default ttl:0, means never expires.
    defaultTTL: 0,
    // default iv length 8 for bf-cbc 
    ivLength: 8
  },
};
```



## License

[MIT](LICENSE)
