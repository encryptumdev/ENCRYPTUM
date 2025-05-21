import CryptoJS from "crypto-js";

const encryptFile = (
  base64: string | CryptoJS.lib.WordArray,
  secret: CryptoJS.lib.WordArray | string
) => {
  const encrypted = CryptoJS.AES.encrypt(base64, secret);
  return encrypted.toString();
};

const decryptFile = (
  encrypted: string | CryptoJS.lib.CipherParams,
  secret: CryptoJS.lib.WordArray | string
) => {
  var decrypted = CryptoJS.AES.decrypt(encrypted, secret);
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export { decryptFile, encryptFile };
