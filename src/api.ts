import type { AmazonAdsCredentials } from "./auth.js";

const BASE_URL = "https://advertising-api.amazon.com";

export interface ApiOptions {
  creds: AmazonAdsCredentials;
  method?: "GET" | "POST";
  path: string;
  version?: string;
  params?: Record<string, string>;
  body?: Record<string, unknown>;
  profileRequired?: boolean;
}

export async function callApi(opts: ApiOptions): Promise<unknown> {
  const method = opts.method ?? "GET";
  const version = opts.version ?? "v2";
  let url = `${BASE_URL}/${version}/${opts.path}`;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${opts.creds.access_token}`,
    "Amazon-Advertising-API-ClientId": opts.creds.client_id,
    "Content-Type": "application/json",
  };

  if (opts.profileRequired !== false && opts.creds.profile_id) {
    headers["Amazon-Advertising-API-Scope"] = opts.creds.profile_id;
  }

  if (method === "GET" && opts.params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(opts.params)) {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.set(key, value);
      }
    }
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  const fetchOpts: RequestInit = { method, headers };
  if (method === "POST" && opts.body) {
    fetchOpts.body = JSON.stringify(opts.body);
  }

  const res = await fetch(url, fetchOpts);

  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const errJson = (await res.json()) as Record<string, unknown>;
      msg = (errJson.details as string) ?? (errJson.message as string) ?? msg;
    } catch {
      // use HTTP status
    }
    throw new Error(msg);
  }

  return res.json();
}
