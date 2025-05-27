import { AesTransformer } from './aes.transformer';

describe('AesTransformer', () => {
  const secret = '88b7b9f428d7e1130ab88243db97df8c3fe4dcd7184da29502991a72bd80aa48'; // 32 chars
  const transformer = new AesTransformer(secret);

  it('to() et from() doivent chiffrer puis déchiffrer fidèlement', () => {
    const data = { foo: 'bar', num: 42, arr: [1, 2, 3] };
    const encrypted = transformer.to(data);

    expect(Buffer.isBuffer(encrypted)).toBe(true);
    expect((encrypted as Buffer).equals(Buffer.from(JSON.stringify(data)))).toBe(false);

    const decrypted = transformer.from(encrypted as Buffer);
    expect(decrypted).toEqual(data);
  });

  it('to(null) et from(null) retournent null', () => {
    expect(transformer.to(null)).toBeNull();
    expect(transformer.from(null)).toBeNull();
  });
});
