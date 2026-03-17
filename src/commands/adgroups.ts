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

export function registerAdGroupCommands(program: Command): void {
  program
    .command("sp-adgroups")
    .description("List Sponsored Products ad groups")
    .option("--start-index <n>", "Start index (default 0)", "0")
    .option("--count <n>", "Results per page (default 100)", "100")
    .option("--campaign-id <id>", "Filter by campaign ID")
    .option("--state <state>", "Filter by state: enabled, paused, archived")
    .action(async (opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        requireProfile(creds);
        const params: Record<string, string> = {
          startIndex: opts.startIndex,
          count: opts.count,
        };
        if (opts.campaignId) params.campaignIdFilter = opts.campaignId;
        if (opts.state) params.stateFilter = opts.state;
        const data = await callApi({ creds, path: "sp/adGroups", params });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("sp-adgroup <adgroup-id>")
    .description("Get a specific Sponsored Products ad group")
    .action(async (adgroupId: string) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        requireProfile(creds);
        const data = await callApi({ creds, path: `sp/adGroups/${adgroupId}` });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("sb-adgroups")
    .description("List Sponsored Brands ad groups")
    .option("--start-index <n>", "Start index (default 0)", "0")
    .option("--count <n>", "Results per page (default 100)", "100")
    .action(async (opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        requireProfile(creds);
        const params: Record<string, string> = {
          startIndex: opts.startIndex,
          count: opts.count,
        };
        const data = await callApi({ creds, path: "sb/adGroups", params });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("sd-adgroups")
    .description("List Sponsored Display ad groups")
    .option("--start-index <n>", "Start index (default 0)", "0")
    .option("--count <n>", "Results per page (default 100)", "100")
    .option("--campaign-id <id>", "Filter by campaign ID")
    .action(async (opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        requireProfile(creds);
        const params: Record<string, string> = {
          startIndex: opts.startIndex,
          count: opts.count,
        };
        if (opts.campaignId) params.campaignIdFilter = opts.campaignId;
        const data = await callApi({ creds, path: "sd/adGroups", params });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });
}
