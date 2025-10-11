/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { KJUR } from 'jsrsasign';
const excludeFields = [
  'sign',
  'sign_type',
  'header',
  'refund_info',
  'openType',
  'raw_request',
  'biz_content',
];

/**
 * Sign a request object (includes biz_content)
 */
export function signRequestObject(requestObject: Record<string, any>): string {
  const fields: string[] = [];
  const fieldMap: Record<string, any> = {};

  // Top-level fields
  for (const key in requestObject) {
    if (excludeFields.includes(key)) continue;
    fields.push(key);
    fieldMap[key] = requestObject[key];
  }

  // biz_content fields
  if (requestObject.biz_content) {
    const biz = requestObject.biz_content;
    for (const key in biz) {
      if (excludeFields.includes(key)) continue;
      fields.push(key);
      fieldMap[key] = biz[key];
    }
  }

  // Sort by ASCII
  fields.sort();

  // Build signing string
  const signStrList = fields.map((key) => `${key}=${fieldMap[key]}`);
  const signOriginStr = signStrList.join('&');
  console.log('signOriginStr', signOriginStr);
  const privateKeyRaw = process.env.TELEBIRR_PRIVATE_KEY;
  if (!privateKeyRaw) throw new Error('Private key missing');

  const privateKey = privateKeyRaw.replace(/\\n/g, '\n');

  return signString(signOriginStr, privateKey);
}

/**
 * Sign a string using SHA256withRSA and PKCS1 padding
 */
export function signString(raw: string, privateKeyText: string): string {
  const sig = new KJUR.crypto.Signature({ alg: 'SHA256withRSAandMGF1' });
  sig.init(privateKeyText);
  sig.updateString(raw);
  return Buffer.from(sig.sign(), 'hex').toString('base64');
}

/**
 * Generate current timestamp in seconds
 */
export function createTimeStamp(): string {
  return Math.floor(Date.now() / 1000).toString();
}

/**
 * Generate a 32-character random nonce string
 */
export function createNonceStr(): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let str = '';
  for (let i = 0; i < 32; i++) {
    const index = Math.floor(Math.random() * chars.length);
    str += chars[index];
  }
  return str;
}
