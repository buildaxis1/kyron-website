// server-only: ModMed sandbox auth + probe helpers
import { getSecretParam } from "./ssm";

// No SMART discovery for ModMed; derive token URL from FHIR base

export function trimSlash(u: string) {
  return u.replace(/\/+$/, "");
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit = {},
  timeoutMs = 6000,
) {
  const controller = new AbortController();
  const id = setTimeout(() => {
    console.error("Fetch timeout", { url, timeoutMs });
    controller.abort();
  }, timeoutMs);
  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    return res;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Fetch error in fetchWithTimeout", {
      message,
      url,
      timeoutMs,
    });
    throw err instanceof Error ? err : new Error(message);
  } finally {
    clearTimeout(id);
  }
}

function tokenUrlFromFhirBase(fhirBaseUrl: string): string {
  const base = trimSlash(fhirBaseUrl);
  // Expected FHIR base: https://.../ema/.../firm/{firm}/ema/fhir/v2
  // Token URL:           https://.../ema/.../firm/{firm}/ema/ws/oauth2/grant
  if (/\/fhir\/v2$/i.test(base)) {
    return base.replace(/\/fhir\/v2$/i, "/ws/oauth2/grant");
  }
  // Fallback: remove trailing /fhir and append grant path
  if (/\/fhir$/i.test(base)) {
    return base.replace(/\/fhir$/i, "/ws/oauth2/grant");
  }
  // Last resort: append grant path at current base
  return `${base}/ws/oauth2/grant`;
}

export async function getModMedSandboxToken(opts: {
  fhirBaseUrl: string;
  ssmUsernameParam: string;
  ssmPasswordParam: string;
  ssmClientIdParam?: string | null;
  ssmClientSecretParam?: string | null;
  ssmApiKeyParam?: string | null;
}) {
  console.log("[ModMed Debug] Starting token request with params:", {
    fhirBaseUrl: opts.fhirBaseUrl,
    ssmUsernameParam: opts.ssmUsernameParam,
    ssmPasswordParam: opts.ssmPasswordParam,
    ssmClientIdParam: opts.ssmClientIdParam,
    ssmClientSecretParam: opts.ssmClientSecretParam,
    ssmApiKeyParam: opts.ssmApiKeyParam,
  });

  const usernamePromise = getSecretParam(opts.ssmUsernameParam);
  const passwordPromise = getSecretParam(opts.ssmPasswordParam);
  const clientIdPromise = opts.ssmClientIdParam
    ? getSecretParam(opts.ssmClientIdParam)
    : Promise.resolve("");
  const clientSecretPromise = opts.ssmClientSecretParam
    ? getSecretParam(opts.ssmClientSecretParam)
    : Promise.resolve("");
  const apiKeyPromise = opts.ssmApiKeyParam
    ? getSecretParam(opts.ssmApiKeyParam)
    : Promise.resolve("");

  const [username, password, clientId, clientSecret, xApiKey] =
    await Promise.all([
      usernamePromise,
      passwordPromise,
      clientIdPromise,
      clientSecretPromise,
      apiKeyPromise,
    ]);

  const tokenUrl = tokenUrlFromFhirBase(opts.fhirBaseUrl);
  console.log("[ModMed Debug] Token request details:", {
    fhirBaseUrl: opts.fhirBaseUrl,
    tokenUrl,
    hasApiKey: !!xApiKey,
    usernameLength: username.length,
    passwordLength: password.length,
    apiKeyLength: xApiKey.length,
    hasAuthHeaderPlanned: !!clientId && !!clientSecret,
  });

  const body = new URLSearchParams({
    grant_type: "password",
    username,
    password,
  }).toString();

  let res: Response;
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/x-www-form-urlencoded",
      ...(xApiKey ? { "x-api-key": xApiKey } : {}),
    };
    if (clientId && clientSecret) {
      headers.Authorization = `Basic ${Buffer.from(
        `${clientId}:${clientSecret}`,
        "utf8",
      ).toString("base64")}`;
    }
    console.log("[ModMed Debug] headers sent:", {
      hasAuth: !!headers.Authorization,
      hasApiKey: !!headers["x-api-key"],
    });
    res = await fetchWithTimeout(
      tokenUrl,
      {
        method: "POST",
        headers,
        body,
      },
      15000,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("ModMed token fetch failed", {
      message,
      tokenUrl,
    });
    throw new Error(`ModMed token network error: ${message}`);
  }

  if (!res.ok) {
    const text = await res.text();
    console.error("ModMed token fetch failed with non-OK status", {
      status: res.status,
      statusText: res.statusText,
      text,
      tokenUrl,
    });
    throw new Error(`ModMed token network error: ${res.statusText}`);
  }

  const data = (await res.json()) as {
    access_token: string;
    expires_in: number;
    token_type: string;
  };
  return data;
}

export async function testModMedConnection(opts: {
  fhirBaseUrl: string;
  ssmUsernameParam: string;
  ssmPasswordParam: string;
  ssmClientIdParam?: string | null;
  ssmClientSecretParam?: string | null;
  ssmApiKeyParam?: string | null;
}) {
  try {
    const tokenResponse = await getModMedSandboxToken(opts);
    const xApiKey = opts.ssmApiKeyParam
      ? await getSecretParam(opts.ssmApiKeyParam)
      : "";
    const url = `${trimSlash(opts.fhirBaseUrl)}/Patient?_count=1`;
    const probe = await fetch(url, {
      headers: {
        Authorization: `Bearer ${tokenResponse.access_token}`,
        ...(xApiKey ? { "x-api-key": xApiKey } : {}),
      },
    });
    return { ok: probe.ok, status: probe.status } as const;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false as const, status: 0, error: message } as const;
  }
}
