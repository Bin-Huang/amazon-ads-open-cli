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

export function registerAudienceCommands(program: Command): void {
  program
    .command("audiences")
    .description("List DSP audiences")
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
        const data = await callApi({ creds, path: "dsp/audiences", version: "v3", params });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("audience <audience-id>")
    .description("Get a specific audience")
    .action(async (audienceId: string) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        requireProfile(creds);
        const data = await callApi({ creds, path: `dsp/audiences/${audienceId}`, version: "v3" });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("brand-safety-lists")
    .description("List brand safety deny lists")
    .action(async () => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        requireProfile(creds);
        const data = await callApi({ creds, path: "dsp/brandSafety/denyLists", version: "v3" });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });
}
