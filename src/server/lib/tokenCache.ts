const mem = new Map<string, string>();

export const tokenCache = {
  async get(key: string): Promise<string | null> {
    return mem.get(key) ?? null;
  },
  async set(key: string, value: string): Promise<void> {
    mem.set(key, value);
  },
  async delete(key: string): Promise<void> {
    mem.delete(key);
  },
};
