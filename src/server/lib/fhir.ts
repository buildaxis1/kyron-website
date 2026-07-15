export async function discoverSmartConfig(args: {
  baseUrl: string;
  overrideAuth?: string;
  overrideToken?: string;
}): Promise<{ authorization_endpoint: string; token_endpoint: string }> {
  if (args.overrideAuth && args.overrideToken) {
    return {
      authorization_endpoint: args.overrideAuth,
      token_endpoint: args.overrideToken,
    };
  }
  const base = args.baseUrl.replace(/\/+$/, "");
  try {
    const wellKnown = `${base}/.well-known/smart-configuration`;
    const res = await fetch(wellKnown);
    if (res.ok) {
      const json = (await res.json()) as Partial<{
        authorization_endpoint: unknown;
        token_endpoint: unknown;
      }>;
      const authEndpoint =
        typeof json.authorization_endpoint === "string"
          ? json.authorization_endpoint
          : undefined;
      const tokenEndpoint =
        typeof json.token_endpoint === "string"
          ? json.token_endpoint
          : undefined;
      if (authEndpoint && tokenEndpoint) {
        return {
          authorization_endpoint: authEndpoint,
          token_endpoint: tokenEndpoint,
        };
      }
    }
  } catch (_) {}
  // Fallback
  return {
    authorization_endpoint: `${base}/auth`,
    token_endpoint: `${base}/token`,
  };
}
