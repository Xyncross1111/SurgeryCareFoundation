import "server-only";

const PRODUCTION_BACKEND_PROXY_FALLBACK = "http://213.199.63.29/surgery-care-api";

function backendOrigin(): string {
  const explicit = process.env.BACKEND_PROXY_ORIGIN?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.NODE_ENV === "production") return PRODUCTION_BACKEND_PROXY_FALLBACK;
  return "http://localhost:5000";
}

interface BackendEnvelope<T> {
  success: boolean;
  data?: T;
  error?: { code?: string; message?: string };
}

interface FetchOptions {
  revalidate?: number;
  params?: Record<string, string | number | boolean | undefined>;
}

export async function backendGet<T>(path: string, opts: FetchOptions = {}): Promise<T | null> {
  const origin = backendOrigin();
  const url = new URL(`${origin}/api/v1${path.startsWith("/") ? "" : "/"}${path}`);
  if (opts.params) {
    Object.entries(opts.params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.set(key, String(value));
    });
  }

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
      next: { revalidate: opts.revalidate ?? 300 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as BackendEnvelope<T>;
    if (!json.success || json.data === undefined) return null;
    return json.data;
  } catch {
    return null;
  }
}
