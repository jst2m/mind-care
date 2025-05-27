// src/common/transformers/aes.transformer.ts
import { ValueTransformer } from 'typeorm';
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

export class AesTransformer implements ValueTransformer {
  private readonly key: Buffer;
  private readonly ivLength = 16;

  constructor(secret: string) {
    const buf = Buffer.from(secret, 'utf8');
    // if too long, truncate; if too short, pad with zeros
    this.key = buf.length >= 32
      ? buf.slice(0, 32)
      : Buffer.concat([buf, Buffer.alloc(32 - buf.length)]);
  }

  to(value: any): Buffer | null {
    if (value == null) return null;
    const iv = randomBytes(this.ivLength);
    const cipher = createCipheriv('aes-256-cbc', this.key, iv);
    const encrypted = Buffer.concat([
      cipher.update(Buffer.from(JSON.stringify(value), 'utf8')),
      cipher.final(),
    ]);
    return Buffer.concat([iv, encrypted]);
  }

  from(dbValue: Buffer | null): any {
    if (!dbValue) return null;
    const iv = dbValue.slice(0, this.ivLength);
    const encrypted = dbValue.slice(this.ivLength);
    const decipher = createDecipheriv('aes-256-cbc', this.key, iv);
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);
    return JSON.parse(decrypted.toString('utf8'));
  }
}
