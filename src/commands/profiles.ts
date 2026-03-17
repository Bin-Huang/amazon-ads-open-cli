import { Command } from "commander";
import { loadCredentials } from "../auth.js";
import { callApi } from "../api.js";
import { output, fatal } from "../utils.js";

export function registerProfileCommands(program: Command): void {
  program
    .command("profiles")
    .description("List advertising profiles (marketplaces) accessible by this account")
    .action(async () => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        const data = await callApi({
          creds,
          path: "profiles",
          profileRequired: false,
        });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("profile <profile-id>")
    .description("Get a specific advertising profile")
    .action(async (profileId: string) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        const data = await callApi({
          creds,
          path: `profiles/${profileId}`,
          profileRequired: false,
        });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });
}
