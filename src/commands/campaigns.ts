import { Command } from "commander";
import { loadCredentials } from "../auth.js";
import { callApi } from "../api.js";
import { output, fatal } from "../utils.js";

function requireProfile(creds: { profile_id?: string }): void {
  if (!creds.profile_id) {
    throw new Error(
      "Profile ID required. Set AMAZON_ADS_PROFILE_ID env var or add profile_id to credentials file. Use 'profiles' command to list available profiles."
    );
  }
}

export function registerCampaignCommands(program: Command): void {
  // Sponsored Products campaigns
  program
    .command("sp-campaigns")
    .description("List Sponsored Products campaigns")
    .option("--start-index <n>", "Start index for pagination (default 0)", "0")
    .option("--count <n>", "Results per page (default 100, max 5000)", "100")
    .option("--state <state>", "Filter by state: enabled, paused, archived")
    .action(async (opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        requireProfile(creds);
        const params: Record<string, string> = {
          startIndex: opts.startIndex,
          count: opts.count,
        };
        if (opts.state) params.stateFilter = opts.state;
        const data = await callApi({ creds, path: "sp/campaigns", params });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("sp-campaign <campaign-id>")
    .description("Get a specific Sponsored Products campaign")
    .action(async (campaignId: string) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        requireProfile(creds);
        const data = await callApi({ creds, path: `sp/campaigns/${campaignId}` });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  // Sponsored Brands campaigns
  program
    .command("sb-campaigns")
    .description("List Sponsored Brands campaigns")
    .option("--start-index <n>", "Start index (default 0)", "0")
    .option("--count <n>", "Results per page (default 100)", "100")
    .option("--state <state>", "Filter by state: enabled, paused, archived")
    .action(async (opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        requireProfile(creds);
        const params: Record<string, string> = {
          startIndex: opts.startIndex,
          count: opts.count,
        };
        if (opts.state) params.stateFilter = opts.state;
        const data = await callApi({ creds, path: "sb/campaigns", params });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("sb-campaign <campaign-id>")
    .description("Get a specific Sponsored Brands campaign")
    .action(async (campaignId: string) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        requireProfile(creds);
        const data = await callApi({ creds, path: `sb/campaigns/${campaignId}` });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  // Sponsored Display campaigns
  program
    .command("sd-campaigns")
    .description("List Sponsored Display campaigns")
    .option("--start-index <n>", "Start index (default 0)", "0")
    .option("--count <n>", "Results per page (default 100)", "100")
    .option("--state <state>", "Filter by state: enabled, paused, archived")
    .action(async (opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        requireProfile(creds);
        const params: Record<string, string> = {
          startIndex: opts.startIndex,
          count: opts.count,
        };
        if (opts.state) params.stateFilter = opts.state;
        const data = await callApi({ creds, path: "sd/campaigns", params });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("sd-campaign <campaign-id>")
    .description("Get a specific Sponsored Display campaign")
    .action(async (campaignId: string) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        requireProfile(creds);
        const data = await callApi({ creds, path: `sd/campaigns/${campaignId}` });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });
}
