import sha256 from 'js-sha256';

export default class HashService {
  static hashPW(pw) {
    return sha256(pw);
  }

  static verifyPW(pw, hash) {
    return sha256(pw) === hash;
  }
}
