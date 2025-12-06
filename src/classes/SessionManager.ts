type StoredValue<T> = {
  value: T;
  expiresAt: number | null;
};

export class SessionManager {
  private storage: Storage;

  constructor(useSession = false) {
    this.storage = useSession ? sessionStorage : localStorage;
  }

  set<T>(key: string, value: T, expireInSeconds?: number): void {
    const expiresAt = expireInSeconds
      ? Date.now() + expireInSeconds * 1000
      : null;

    const payload: StoredValue<T> = { value, expiresAt };
    this.storage.setItem(key, JSON.stringify(payload));
  }

  get<T>(key: string): T | null {
    const raw = this.storage.getItem(key);
    if (!raw) return null;

    try {
      const data: StoredValue<T> = JSON.parse(raw);

      if (data.expiresAt && Date.now() > data.expiresAt) {
        this.storage.removeItem(key);
        return null;
      }

      return data.value;
    } catch {
      return null;
    }
  }

  update<T>(key: string, newValue: Partial<T>): T | null {
    const existing = this.get<T>(key);
    if (!existing) return null;

    const updated: T = { ...existing, ...newValue };

    const raw = this.storage.getItem(key);
    const data: StoredValue<T> = raw ? JSON.parse(raw) : null;

    this.set<T>(
      key,
      updated,
      data?.expiresAt ? (data.expiresAt - Date.now()) / 1000 : undefined
    );

    return updated;
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}

export const SessionData = new SessionManager(true);
