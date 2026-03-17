#!/usr/bin/env node
import { Command } from "commander";
import { registerProfileCommands } from "./commands/profiles.js";
import { registerCampaignCommands } from "./commands/campaigns.js";
import { registerAdGroupCommands } from "./commands/adgroups.js";
import { registerAdCommands } from "./commands/ads.js";
import { registerKeywordCommands } from "./commands/keywords.js";
import { registerReportCommands } from "./commands/reports.js";
import { registerDspCommands } from "./commands/dsp.js";
import { registerAudienceCommands } from "./commands/audiences.js";

const program = new Command();

program
  .name("amazon-ads-open-cli")
  .description(
    "Amazon Ads CLI for AI agents (Sponsored Products, Brands, Display, DSP)"
  )
  .version("1.0.0")
  .option("--format <format>", "Output format", "json")
  .option("--credentials <path>", "Path to credentials JSON file")
  .addHelpText(
    "after",
    "\nDocs: https://github.com/Bin-Huang/amazon-ads-cli"
  );

program.configureOutput({
  writeErr: (str: string) => {
    const msg = str.replace(/^error: /i, "").trim();
    if (msg) process.stderr.write(JSON.stringify({ error: msg }) + "\n");
  },
  writeOut: (str: string) => {
    process.stdout.write(str);
  },
});

program.showHelpAfterError(false);

program.hook("preAction", () => {
  const format = program.opts().format;
  if (format !== "json" && format !== "compact") {
    process.stderr.write(
      JSON.stringify({ error: "Format must be 'json' or 'compact'." }) + "\n"
    );
    process.exit(1);
  }
});

registerProfileCommands(program);
registerCampaignCommands(program);
registerAdGroupCommands(program);
registerAdCommands(program);
registerKeywordCommands(program);
registerReportCommands(program);
registerDspCommands(program);
registerAudienceCommands(program);

program.on("command:*", (operands) => {
  process.stderr.write(
    JSON.stringify({
      error: `Unknown command: ${operands[0]}. Run --help for available commands.`,
    }) + "\n"
  );
  process.exit(1);
});

if (process.argv.length <= 2) {
  program.outputHelp();
  process.exit(0);
}

program.parse();
