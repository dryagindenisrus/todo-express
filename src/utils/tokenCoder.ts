import { Buffer } from 'buffer';

const codeToken = (email: string, code: string): string => {
  const stringForEncode = email + ':' + code;
  return Buffer.from(stringForEncode, 'binary').toString('base64');
};

export { codeToken };
