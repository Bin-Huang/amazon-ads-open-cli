import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";

export interface AmazonAdsCredentials {
  access_token: string;
  client_id: string;
  profile_id?: string;
}

const CONFIG_PATH = join(
  homedir(),
  ".config",
  "amazon-ads-open-cli",
  "credentials.json"
);

export function loadCredentials(
  credentialsPath?: string
): AmazonAdsCredentials {
  // 1. Explicit credentials file
  const filePath = credentialsPath ?? CONFIG_PATH;
  if (existsSync(filePath)) {
    const raw = readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw) as Partial<AmazonAdsCredentials>;
    if (parsed.access_token && parsed.client_id) {
      return {
        access_token: parsed.access_token,
        client_id: parsed.client_id,
        profile_id: parsed.profile_id ?? process.env.AMAZON_ADS_PROFILE_ID,
      };
    }
  }

  // 2. Environment variables
  const token =
    process.env.AMAZON_ADS_ACCESS_TOKEN;
  const clientId =
    process.env.AMAZON_ADS_CLIENT_ID;

  if (token && clientId) {
    return {
      access_token: token,
      client_id: clientId,
      profile_id: process.env.AMAZON_ADS_PROFILE_ID,
    };
  }

  throw new Error(
    "No credentials found. Set AMAZON_ADS_ACCESS_TOKEN + AMAZON_ADS_CLIENT_ID env vars, or create " +
      CONFIG_PATH
  );
}
