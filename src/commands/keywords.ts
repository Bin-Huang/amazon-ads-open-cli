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

export function registerKeywordCommands(program: Command): void {
  program
    .command("sp-keywords")
    .description("List Sponsored Products keywords")
    .option("--start-index <n>", "Start index (default 0)", "0")
    .option("--count <n>", "Results per page (default 100)", "100")
    .option("--adgroup-id <id>", "Filter by ad group ID")
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
        if (opts.adgroupId) params.adGroupIdFilter = opts.adgroupId;
        if (opts.campaignId) params.campaignIdFilter = opts.campaignId;
        if (opts.state) params.stateFilter = opts.state;
        const data = await callApi({ creds, path: "sp/keywords", params });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("sp-negative-keywords")
    .description("List Sponsored Products negative keywords")
    .option("--start-index <n>", "Start index (default 0)", "0")
    .option("--count <n>", "Results per page (default 100)", "100")
    .option("--adgroup-id <id>", "Filter by ad group ID")
    .option("--campaign-id <id>", "Filter by campaign ID")
    .action(async (opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        requireProfile(creds);
        const params: Record<string, string> = {
          startIndex: opts.startIndex,
          count: opts.count,
        };
        if (opts.adgroupId) params.adGroupIdFilter = opts.adgroupId;
        if (opts.campaignId) params.campaignIdFilter = opts.campaignId;
        const data = await callApi({ creds, path: "sp/negativeKeywords", params });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("sp-targets")
    .description("List Sponsored Products product targets")
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
        const data = await callApi({ creds, path: "sp/targets", params });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("sb-targets")
    .description("List Sponsored Brands targets")
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
        const data = await callApi({ creds, path: "sb/targets", params });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("sd-targets")
    .description("List Sponsored Display targets")
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
        const data = await callApi({ creds, path: "sd/targets", params });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });
}
