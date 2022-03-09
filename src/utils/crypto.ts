import CryptoJS from 'crypto-js';

// 十六位十六进制数作为密钥
const key = CryptoJS.enc.Utf8.parse('202107231646ABCD');
// 十六位十六进制数作为密钥偏移量
const iv = CryptoJS.enc.Utf8.parse('ABCD202107231646');

/**
 * 解密方法
 * @param cipherText
 * @returns {string}
 * @constructor
 */
export function decrypt(cipherText: string) {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(cipherText);
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const options = {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  };
  const decryptRes = CryptoJS.AES.decrypt(srcs, key, options);
  const decryptedStr = decryptRes.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

/**
 * 加密方法
 * @param plainText
 * @returns {string}
 * @constructor
 */
export function encrypt(plainText: string | object) {
  let encryptedData: any;
  if (typeof plainText === 'string') {
    const srcs = CryptoJS.enc.Utf8.parse(plainText);
    const options = {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    };
    encryptedData = CryptoJS.AES.encrypt(srcs, key, options);
  } else if (typeof plainText === 'object') {
    // 对象格式的转成json字符串
    const data = JSON.stringify(plainText);
    const srcs = CryptoJS.enc.Utf8.parse(data);
    const options = {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    };
    encryptedData = CryptoJS.AES.encrypt(srcs, key, options);
  }
  return encryptedData.ciphertext.toString();
}

/**
 * sha256
 * @param plainText
 * @returns {string}
 * @constructor
 */
export function sha256(plainText: string) {
  return CryptoJS.SHA256(plainText).toString();
}
