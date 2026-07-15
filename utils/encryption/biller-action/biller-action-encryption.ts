import { encrypt, decrypt } from "../secure";

// Encrypt all PHI/sensitive fields for billerAction
export function encryptBillerActionPHI(action: {
  content?: string | null;
  transcript?: string | null;
  summary?: string | null;
}) {
  const encrypted: any = { ...action };
  if (action.content) {
    const { data, iv, tag } = encrypt(action.content);
    encrypted.content = data;
    encrypted.content_iv = iv;
    encrypted.content_tag = tag;
  }
  if (action.transcript) {
    const { data, iv, tag } = encrypt(action.transcript);
    encrypted.transcript = data;
    encrypted.transcript_iv = iv;
    encrypted.transcript_tag = tag;
  }
  if (action.summary) {
    const { data, iv, tag } = encrypt(action.summary);
    encrypted.summary = data;
    encrypted.summary_iv = iv;
    encrypted.summary_tag = tag;
  }
  return encrypted;
}

// Decrypt all PHI/sensitive fields for billerAction
export function decryptBillerActionPHI(action: any) {
  const decrypted: any = { ...action };
  if (action.content && action.content_iv && action.content_tag) {
    decrypted.content = decrypt({
      data: action.content,
      iv: action.content_iv,
      tag: action.content_tag,
    });
  }
  if (action.transcript && action.transcript_iv && action.transcript_tag) {
    decrypted.transcript = decrypt({
      data: action.transcript,
      iv: action.transcript_iv,
      tag: action.transcript_tag,
    });
  }
  if (action.summary && action.summary_iv && action.summary_tag) {
    decrypted.summary = decrypt({
      data: action.summary,
      iv: action.summary_iv,
      tag: action.summary_tag,
    });
  }
  return decrypted;
}
