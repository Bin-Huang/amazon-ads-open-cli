import { Command } from "commander";
import { loadCredentials } from "../auth.js";
import { callApi } from "../api.js";
import { output, fatal } from "../utils.js";

function requireProfile(creds: { profile_id?: string }): void {
  if (!creds.profile_id) {
    throw new Error(
      "Profile ID required. Set AMAZON_ADS_PROFILE_ID or use 'profiles' command."
    );
  }
}

export function registerAdCommands(program: Command): void {
  program
    .command("sp-ads")
    .description("List Sponsored Products ads (product ads)")
    .option("--start-index <n>", "Start index (default 0)", "0")
    .option("--count <n>", "Results per page (default 100)", "100")
    .option("--adgroup-id <id>", "Filter by ad group ID")
    .option("--state <state>", "Filter by state: enabled, paused, archived")
    .action(async (opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        requireProfile(creds);
        const params: Record<string, string> = {
          startIndex: opts.startIndex,
          count: opts.count,
        };
        if (opts.adgroupId) params.adGroupIdFilter = opts.adgroupId;
        if (opts.state) params.stateFilter = opts.state;
        const data = await callApi({ creds, path: "sp/productAds", params });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("sp-ad <ad-id>")
    .description("Get a specific Sponsored Products ad")
    .action(async (adId: string) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        requireProfile(creds);
        const data = await callApi({ creds, path: `sp/productAds/${adId}` });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("sd-ads")
    .description("List Sponsored Display ads")
    .option("--start-index <n>", "Start index (default 0)", "0")
    .option("--count <n>", "Results per page (default 100)", "100")
    .option("--adgroup-id <id>", "Filter by ad group ID")
    .action(async (opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        requireProfile(creds);
        const params: Record<string, string> = {
          startIndex: opts.startIndex,
          count: opts.count,
        };
        if (opts.adgroupId) params.adGroupIdFilter = opts.adgroupId;
        const data = await callApi({ creds, path: "sd/productAds", params });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });
}
