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

export function registerDspCommands(program: Command): void {
  program
    .command("dsp-orders")
    .description("List DSP orders (programmatic display)")
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
        const data = await callApi({ creds, path: "dsp/orders", version: "v3", params });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("dsp-order <order-id>")
    .description("Get a specific DSP order")
    .action(async (orderId: string) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        requireProfile(creds);
        const data = await callApi({ creds, path: `dsp/orders/${orderId}`, version: "v3" });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("dsp-line-items")
    .description("List DSP line items")
    .option("--order-id <id>", "Filter by order ID")
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
        if (opts.orderId) params.orderIdFilter = opts.orderId;
        const data = await callApi({ creds, path: "dsp/lineItems", version: "v3", params });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("dsp-creatives")
    .description("List DSP creatives")
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
        const data = await callApi({ creds, path: "dsp/creatives", version: "v3", params });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });
}
