"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AesTransformer = void 0;
var crypto_1 = require("crypto");
var AesTransformer = /** @class */ (function () {
    function AesTransformer(secret) {
        this.ivLength = 16;
        var buf = Buffer.from(secret, 'utf8');
        // if too long, truncate; if too short, pad with zeros
        this.key = buf.length >= 32
            ? buf.slice(0, 32)
            : Buffer.concat([buf, Buffer.alloc(32 - buf.length)]);
    }
    AesTransformer.prototype.to = function (value) {
        if (value == null)
            return null;
        var iv = (0, crypto_1.randomBytes)(this.ivLength);
        var cipher = (0, crypto_1.createCipheriv)('aes-256-cbc', this.key, iv);
        var encrypted = Buffer.concat([
            cipher.update(Buffer.from(JSON.stringify(value), 'utf8')),
            cipher.final(),
        ]);
        return Buffer.concat([iv, encrypted]);
    };
    AesTransformer.prototype.from = function (dbValue) {
        if (!dbValue)
            return null;
        var iv = dbValue.slice(0, this.ivLength);
        var encrypted = dbValue.slice(this.ivLength);
        var decipher = (0, crypto_1.createDecipheriv)('aes-256-cbc', this.key, iv);
        var decrypted = Buffer.concat([
            decipher.update(encrypted),
            decipher.final(),
        ]);
        return JSON.parse(decrypted.toString('utf8'));
    };
    return AesTransformer;
}());
exports.AesTransformer = AesTransformer;
