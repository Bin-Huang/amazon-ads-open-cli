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

export function registerReportCommands(program: Command): void {
  program
    .command("sp-report")
    .description("Request a Sponsored Products performance report")
    .requiredOption("--record-type <type>", "Record type: campaigns, adGroups, productAds, keywords, targets")
    .requiredOption("--start-date <date>", "Start date (YYYYMMDD)")
    .requiredOption("--end-date <date>", "End date (YYYYMMDD)")
    .option("--metrics <metrics>", "Metrics (comma-separated): impressions, clicks, cost, sales14d, etc.")
    .action(async (opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        requireProfile(creds);
        const body: Record<string, unknown> = {
          reportDate: opts.startDate,
          metrics: opts.metrics?.split(",") ?? ["impressions", "clicks", "cost", "sales14d"],
        };
        const data = await callApi({
          creds,
          method: "POST",
          path: `sp/${opts.recordType}/report`,
          body,
        });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("sb-report")
    .description("Request a Sponsored Brands performance report")
    .requiredOption("--record-type <type>", "Record type: campaigns, adGroups, keywords")
    .requiredOption("--start-date <date>", "Start date (YYYYMMDD)")
    .requiredOption("--end-date <date>", "End date (YYYYMMDD)")
    .option("--metrics <metrics>", "Metrics (comma-separated): impressions, clicks, cost, etc.")
    .action(async (opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        requireProfile(creds);
        const body: Record<string, unknown> = {
          reportDate: opts.startDate,
          metrics: opts.metrics?.split(",") ?? ["impressions", "clicks", "cost"],
        };
        const data = await callApi({
          creds,
          method: "POST",
          path: `sb/${opts.recordType}/report`,
          body,
        });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("sd-report")
    .description("Request a Sponsored Display performance report")
    .requiredOption("--record-type <type>", "Record type: campaigns, adGroups, productAds, targets")
    .requiredOption("--start-date <date>", "Start date (YYYYMMDD)")
    .requiredOption("--end-date <date>", "End date (YYYYMMDD)")
    .option("--metrics <metrics>", "Metrics (comma-separated): impressions, clicks, cost, etc.")
    .action(async (opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        requireProfile(creds);
        const body: Record<string, unknown> = {
          reportDate: opts.startDate,
          metrics: opts.metrics?.split(",") ?? ["impressions", "clicks", "cost"],
        };
        const data = await callApi({
          creds,
          method: "POST",
          path: `sd/${opts.recordType}/report`,
          body,
        });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("report-status <report-id>")
    .description("Check report generation status and get download URL")
    .action(async (reportId: string) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        requireProfile(creds);
        const data = await callApi({ creds, path: `reports/${reportId}` });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });
}
