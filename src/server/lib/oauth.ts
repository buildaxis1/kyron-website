import crypto from "crypto";
import { pendingAuthCache } from "./pendingAuth";

function base64url(input: Buffer | string) {
  return (typeof input === "string" ? Buffer.from(input) : input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function buildAuthUrlWithPKCE(params: {
  authorizationEndpoint: string;
  redirectUri: string;
  clientIdSsmParam: string;
  scope: string;
  statePayload: Record<string, unknown>;
  extraParams?: Record<string, string>;
}): Promise<{ authorizationUrl: string; state: string; codeVerifier: string }> {
  const state = base64url(JSON.stringify(params.statePayload));
  const codeVerifier = base64url(crypto.randomBytes(32));
  const challenge = base64url(
    crypto.createHash("sha256").update(codeVerifier).digest(),
  );
  const url = new URL(params.authorizationEndpoint);
  url.searchParams.set("redirect_uri", params.redirectUri);
  url.searchParams.set("client_id", params.clientIdSsmParam);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", params.scope);
  url.searchParams.set("state", state);
  url.searchParams.set("code_challenge", challenge);
  url.searchParams.set("code_challenge_method", "S256");
  if (params.extraParams) {
    for (const [k, v] of Object.entries(params.extraParams)) {
      url.searchParams.set(k, v);
    }
  }
  return { authorizationUrl: url.toString(), state, codeVerifier };
}

export async function rememberPendingAuth(args: {
  state: string;
  practiceId: string;
  codeVerifier: string;
  tokenEndpoint: string;
}): Promise<void> {
  await pendingAuthCache.set(args.state, {
    practiceId: args.practiceId,
    codeVerifier: args.codeVerifier,
    tokenEndpoint: args.tokenEndpoint,
    createdAt: Date.now(),
  });
}
