type Pending = {
  practiceId: string;
  codeVerifier: string;
  tokenEndpoint: string;
  createdAt: number;
};

const mem = new Map<string, Pending>();

export const pendingAuthCache = {
  async get(key: string): Promise<Pending | null> {
    return mem.get(key) ?? null;
  },
  async set(key: string, value: Pending): Promise<void> {
    mem.set(key, value);
  },
  async delete(key: string): Promise<void> {
    mem.delete(key);
  },
};
