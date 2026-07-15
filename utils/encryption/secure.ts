import crypto from "crypto";

const algorithm = "aes-256-gcm";
const keyHex = process.env.PHI_ENCRYPTION_KEY!;
const ivLength = 12;
const authTagLength = 16; // GCM authentication tag length is 16 bytes (128 bits)

function hexToUint8Array(hex: string): Uint8Array {
  // Make sure the input is even-length and valid
  if (hex.length % 2 !== 0) {
    throw new Error("Invalid hex string");
  }
  const array = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    array[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return array;
}

function uint8ArrayToHex(array: Uint8Array): string {
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function encrypt(text: string): {
  data: string;
  iv: string;
  tag: string;
} {
  const iv = crypto.getRandomValues(new Uint8Array(ivLength)); // Use Web Crypto API for browser, or Node fallback
  const key = hexToUint8Array(keyHex);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  const tag = cipher.getAuthTag();

  return {
    data: encrypted,
    iv: uint8ArrayToHex(iv),
    tag: uint8ArrayToHex(new Uint8Array(tag)), // Make sure this is Uint8Array!
  };
}

export function decrypt({
  data,
  iv,
  tag,
}: {
  data: string;
  iv: string;
  tag: string;
}): string {
  const key = hexToUint8Array(keyHex);
  const ivArr = hexToUint8Array(iv);
  const tagArr = hexToUint8Array(tag);

  // Validate authentication tag length
  if (tagArr.length !== authTagLength) {
    throw new Error(
      `Invalid authentication tag length. Expected ${authTagLength} bytes, got ${tagArr.length} bytes`,
    );
  }

  const decipher = crypto.createDecipheriv(algorithm, key, ivArr, {
    authTagLength: authTagLength,
  });
  decipher.setAuthTag(tagArr);

  let decrypted = decipher.update(data, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
