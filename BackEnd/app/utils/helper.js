const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const appKey = 'difficult key!';

const genRandomString = function(length){
  return crypto.randomBytes(Math.ceil(length/2))
          .toString('hex')
          .slice(0,length);
};

const encrypt = (text) => {
  const cipher = crypto.createCipher(algorithm, appKey);
  let crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
};
 
const decrypt = (text) => {
  const decipher = crypto.createDecipher(algorithm, appKey);
  let decrypted = decipher.update(text,'hex','utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

const createHash = (text) => {
    return crypto.createHash('sha512')
                .update(text, 'utf8').digest('hex');
};

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt,
    hash: createHash,
    appKey: appKey
}