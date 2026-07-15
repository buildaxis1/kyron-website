import { DecryptedFile } from "trpc/types/decrypted-types";
import { encrypt, decrypt } from "../secure";

// Encrypt all PHI/sensitive fields for File
export function encryptFilePHI(file: {
  name: string;
  url: string;
  key: string;
}) {
  const encrypted: any = { ...file };
  if (file.name) {
    const { data, iv, tag } = encrypt(file.name);
    encrypted.name = data;
    encrypted.name_iv = iv;
    encrypted.name_tag = tag;
  }
  if (file.url) {
    const { data, iv, tag } = encrypt(file.url);
    encrypted.url = data;
    encrypted.url_iv = iv;
    encrypted.url_tag = tag;
  }
  if (file.key) {
    const { data, iv, tag } = encrypt(file.key);
    encrypted.key = data;
    encrypted.key_iv = iv;
    encrypted.key_tag = tag;
  }
  return encrypted;
}

// Decrypt all PHI/sensitive fields for File
export function decryptFilePHI(file: any): DecryptedFile {
  const decrypted: any = { ...file };
  if (file.name && file.name_iv && file.name_tag) {
    decrypted.name = decrypt({
      data: file.name,
      iv: file.name_iv,
      tag: file.name_tag,
    });
  }
  if (file.url && file.url_iv && file.url_tag) {
    decrypted.url = decrypt({
      data: file.url,
      iv: file.url_iv,
      tag: file.url_tag,
    });
  }
  if (file.key && file.key_iv && file.key_tag) {
    decrypted.key = decrypt({
      data: file.key,
      iv: file.key_iv,
      tag: file.key_tag,
    });
  }
  return decrypted;
}
