// server-only: SSM secret fetcher with simple in-memory cache
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";

const ssmRegion =
  process.env.AWS_REGION ?? process.env.AWS_DEFAULT_REGION ?? "us-east-1";

// Debug AWS credentials and environment
function debugAwsEnvironment() {
  const awsEnv = Object.fromEntries(
    Object.entries(process.env)
      .filter(([k]) => k.startsWith("AWS_"))
      .map(([k, v]) => {
        if (!v) return [k, v];
        if (k.includes("SECRET") || k.includes("TOKEN") || k.includes("KEY")) {
          return [k, v.slice(0, 4) + "***"];
        }
        return [k, v];
      }),
  );
  console.log("[SSM Debug] AWS Environment:", awsEnv);
  console.log("[SSM Debug] Node process info:", {
    pid: process.pid,
    nodeVersion: process.version,
    platform: process.platform,
    cwd: process.cwd(),
  });
}

// Test AWS credentials before using SSM
async function testAwsCredentials() {
  try {
    const sts = new STSClient({ region: ssmRegion });
    const identity = await sts.send(new GetCallerIdentityCommand({}));
    console.log("[SSM Debug] AWS Identity verified:", {
      userId: identity.UserId,
      account: identity.Account,
      arn: identity.Arn,
    });
    return true;
  } catch (err: unknown) {
    const error = err as Error & {
      code?: string;
      name?: string;
      stack?: string;
    };
    console.error("[SSM Debug] AWS Credentials test failed:", {
      message: error.message,
      code: error.code,
      name: error.name,
      stack: error.stack,
    });
    return false;
  }
}

const ssm = new SSMClient({ region: ssmRegion });
const cache = new Map<string, string>();

export async function getSecretParam(name: string): Promise<string> {
  if (!name) throw new Error("SSM parameter name required");

  // Debug on first call
  if (cache.size === 0) {
    debugAwsEnvironment();
    const credsOk = await testAwsCredentials();
    if (!credsOk) {
      throw new Error("AWS credentials validation failed - check logs above");
    }
  }

  if (cache.has(name)) {
    console.log(`[SSM Debug] Using cached parameter: ${name}`);
    return cache.get(name)!;
  }

  console.log(
    `[SSM Debug] Fetching SSM parameter: ${name} from region: ${ssmRegion}`,
  );
  try {
    const out = await ssm.send(
      new GetParameterCommand({ Name: name, WithDecryption: true }),
    );
    const v = out.Parameter?.Value;
    if (!v) throw new Error(`SSM parameter not found: ${name}`);
    cache.set(name, v);
    console.log(`[SSM Debug] Successfully retrieved parameter: ${name}`);
    return v;
  } catch (err: unknown) {
    const error = err as Error & {
      code?: string;
      name?: string;
      stack?: string;
    };
    console.error(`[SSM Debug] Failed to retrieve parameter ${name}:`, {
      message: error.message,
      code: error.code,
      name: error.name,
      stack: error.stack,
      region: ssmRegion,
    });
    throw error;
  }
}
