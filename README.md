# amazon-ads-open-cli

Amazon Ads CLI for AI agents (and humans). Manage Sponsored Products, Brands, Display, and DSP campaigns across marketplaces, generate async reports, configure brand safety, and more.

**Works with:** OpenClaw, Claude Code, Cursor, Codex, and any agent that can run shell commands.

## Installation

```bash
npm install -g amazon-ads-open-cli
```

Or run directly: `npx amazon-ads-open-cli --help`

## How it works

Built on the official [Amazon Advertising API](https://advertising.amazon.com/API/docs/en-us/info/api-overview) (v2/v3). Authenticates via OAuth2 using a Login with Amazon app -- you provide an access token and client ID, scoped to a specific marketplace profile.

Core endpoints covered:

- **Profiles** -- list and inspect marketplace profiles
- **Sponsored Products** -- campaigns, ad groups, ads, keywords, negative keywords, targets, and performance reports
- **Sponsored Brands** -- campaigns, ad groups, targets, and performance reports
- **Sponsored Display** -- campaigns, ad groups, ads, targets, and performance reports
- **Amazon DSP** -- orders, line items, creatives, audiences, and brand safety lists
- **Reporting** -- async report requests and status polling for all ad types

## Setup

### What you need

1. A [Login with Amazon](https://developer.amazon.com/loginwithamazon/console/site/lwa/overview.html) app
2. OAuth2 access token + client ID
3. A profile ID (marketplace-specific, get it with `amazon-ads-open-cli profiles`)

### Option 1: Environment variables

```bash
export AMAZON_ADS_ACCESS_TOKEN="your_access_token"
export AMAZON_ADS_CLIENT_ID="your_client_id"
export AMAZON_ADS_PROFILE_ID="your_profile_id"
```

### Option 2: Credentials file

Create `~/.config/amazon-ads-open-cli/credentials.json`:

```json
{
  "access_token": "your_access_token",
  "client_id": "your_client_id",
  "profile_id": "your_profile_id"
}
```

### Option 3: Per-command credentials

```bash
amazon-ads-open-cli profiles --credentials /path/to/creds.json
```

## Entity hierarchy

```
Profile (marketplace: US, UK, DE, JP, etc.)
 ├── Sponsored Products
 │    └── Campaign → Ad Group → Product Ad / Keyword / Target
 ├── Sponsored Brands
 │    └── Campaign → Ad Group → Keyword / Target
 ├── Sponsored Display
 │    └── Campaign → Ad Group → Product Ad / Target
 └── DSP (programmatic)
      ├── Advertiser → Order → Line Item → Creative
      └── Audience (configured at Line Item level)
```

## Profiles and marketplace

Amazon Ads requires a **profile ID** to scope API calls to a specific marketplace (US, UK, DE, etc.). Use the `profiles` command first to discover your profile IDs, then set `AMAZON_ADS_PROFILE_ID`.

## Usage

### profiles

List advertising profiles (marketplaces) accessible by this account. No profile ID required.

```bash
amazon-ads-open-cli profiles
```

### profile

Get a specific advertising profile.

```bash
amazon-ads-open-cli profile 1234567890
```

### sp-campaigns

List Sponsored Products campaigns.

```bash
amazon-ads-open-cli sp-campaigns
amazon-ads-open-cli sp-campaigns --state enabled
```

Options:
- `--start-index <n>` -- start index (default 0)
- `--count <n>` -- results per page (default 100, max 5000)
- `--state <state>` -- filter: enabled, paused, archived

### sp-campaign

Get a specific Sponsored Products campaign.

```bash
amazon-ads-open-cli sp-campaign 123456
```

### sb-campaigns

List Sponsored Brands campaigns.

```bash
amazon-ads-open-cli sb-campaigns
```

Options: same as sp-campaigns

### sb-campaign

Get a specific Sponsored Brands campaign.

```bash
amazon-ads-open-cli sb-campaign 123456
```

### sd-campaigns

List Sponsored Display campaigns.

```bash
amazon-ads-open-cli sd-campaigns
```

Options: same as sp-campaigns

### sd-campaign

Get a specific Sponsored Display campaign.

```bash
amazon-ads-open-cli sd-campaign 123456
```

### sp-adgroups

List Sponsored Products ad groups.

```bash
amazon-ads-open-cli sp-adgroups
amazon-ads-open-cli sp-adgroups --campaign-id 123456
```

Options:
- `--start-index <n>` -- start index
- `--count <n>` -- results per page
- `--campaign-id <id>` -- filter by campaign
- `--state <state>` -- filter: enabled, paused, archived

### sp-adgroup

Get a specific Sponsored Products ad group.

```bash
amazon-ads-open-cli sp-adgroup 789012
```

### sb-adgroups

List Sponsored Brands ad groups.

```bash
amazon-ads-open-cli sb-adgroups
```

Options:
- `--start-index <n>` -- start index (default 0)
- `--count <n>` -- results per page (default 100)

### sd-adgroups

List Sponsored Display ad groups.

```bash
amazon-ads-open-cli sd-adgroups --campaign-id 123456
```

Options:
- `--start-index <n>` -- start index (default 0)
- `--count <n>` -- results per page (default 100)
- `--campaign-id <id>` -- filter by campaign

### sp-ads

List Sponsored Products ads (product ads).

```bash
amazon-ads-open-cli sp-ads
amazon-ads-open-cli sp-ads --adgroup-id 789012
```

Options:
- `--start-index <n>` -- start index
- `--count <n>` -- results per page
- `--adgroup-id <id>` -- filter by ad group
- `--state <state>` -- filter: enabled, paused, archived

### sp-ad

Get a specific Sponsored Products ad.

```bash
amazon-ads-open-cli sp-ad 345678
```

### sd-ads

List Sponsored Display ads.

```bash
amazon-ads-open-cli sd-ads --adgroup-id 789012
```

Options:
- `--start-index <n>` -- start index (default 0)
- `--count <n>` -- results per page (default 100)
- `--adgroup-id <id>` -- filter by ad group

### sp-keywords

List Sponsored Products keywords.

```bash
amazon-ads-open-cli sp-keywords
amazon-ads-open-cli sp-keywords --campaign-id 123456 --state enabled
```

Options:
- `--start-index <n>` -- start index
- `--count <n>` -- results per page
- `--adgroup-id <id>` -- filter by ad group
- `--campaign-id <id>` -- filter by campaign
- `--state <state>` -- filter: enabled, paused, archived

### sp-negative-keywords

List Sponsored Products negative keywords.

```bash
amazon-ads-open-cli sp-negative-keywords --campaign-id 123456
```

Options:
- `--start-index <n>` -- start index (default 0)
- `--count <n>` -- results per page (default 100)
- `--adgroup-id <id>` -- filter by ad group
- `--campaign-id <id>` -- filter by campaign

### sp-targets

List Sponsored Products product targets (ASIN and category targeting).

```bash
amazon-ads-open-cli sp-targets --adgroup-id 789012
```

Options:
- `--start-index <n>` -- start index (default 0)
- `--count <n>` -- results per page (default 100)
- `--adgroup-id <id>` -- filter by ad group
- `--state <state>` -- filter: enabled, paused, archived

### sb-targets

List Sponsored Brands targets.

```bash
amazon-ads-open-cli sb-targets
```

Options:
- `--start-index <n>` -- start index (default 0)
- `--count <n>` -- results per page (default 100)

### sd-targets

List Sponsored Display targets.

```bash
amazon-ads-open-cli sd-targets --adgroup-id 789012
```

Options:
- `--start-index <n>` -- start index (default 0)
- `--count <n>` -- results per page (default 100)
- `--adgroup-id <id>` -- filter by ad group

### sp-report

Request a Sponsored Products performance report (async).

```bash
amazon-ads-open-cli sp-report --record-type campaigns --start-date 20260101
amazon-ads-open-cli sp-report --record-type keywords --start-date 20260101 --metrics impressions,clicks,cost,sales14d
```

Options:
- `--record-type <type>` -- campaigns, adGroups, productAds, keywords, targets **required**
- `--start-date <date>` -- YYYYMMDD **required**
- `--metrics <metrics>` -- comma-separated (default: impressions, clicks, cost, sales14d)

### sb-report

Request a Sponsored Brands performance report.

```bash
amazon-ads-open-cli sb-report --record-type campaigns --start-date 20260101
```

### sd-report

Request a Sponsored Display performance report.

```bash
amazon-ads-open-cli sd-report --record-type campaigns --start-date 20260101
```

### report-status

Check report generation status and get download URL.

```bash
amazon-ads-open-cli report-status amzn1.report.abc123
```

### dsp-orders

List DSP orders (programmatic display/video).

```bash
amazon-ads-open-cli dsp-orders
```

Options:
- `--start-index <n>` -- start index (default 0)
- `--count <n>` -- results per page (default 100)

### dsp-order

Get a specific DSP order.

```bash
amazon-ads-open-cli dsp-order 123456
```

### dsp-line-items

List DSP line items.

```bash
amazon-ads-open-cli dsp-line-items --order-id 123456
```

Options:
- `--order-id <id>` -- filter by order ID
- `--start-index <n>` -- start index (default 0)
- `--count <n>` -- results per page (default 100)

### dsp-creatives

List DSP creatives.

```bash
amazon-ads-open-cli dsp-creatives
```

Options:
- `--start-index <n>` -- start index (default 0)
- `--count <n>` -- results per page (default 100)

### audiences

List DSP audiences.

```bash
amazon-ads-open-cli audiences
```

Options:
- `--start-index <n>` -- start index (default 0)
- `--count <n>` -- results per page (default 100)

### audience

Get a specific audience.

```bash
amazon-ads-open-cli audience 123456
```

### brand-safety-lists

List brand safety deny lists.

```bash
amazon-ads-open-cli brand-safety-lists
```

## Error output

All errors are JSON to stderr:

```json
{"error": "No credentials found. Set AMAZON_ADS_ACCESS_TOKEN + AMAZON_ADS_CLIENT_ID env vars..."}
```

## API Reference

- [Amazon Ads API Documentation](https://advertising.amazon.com/API/docs/en-us)

## Related

- [google-ads-open-cli](https://github.com/Bin-Huang/google-ads-open-cli) -- Google Ads
- [meta-ads-open-cli](https://github.com/Bin-Huang/meta-ads-open-cli) -- Meta Ads
- [pinterest-ads-cli](https://github.com/Bin-Huang/pinterest-ads-cli) -- Pinterest Ads
- [apple-ads-cli](https://github.com/Bin-Huang/apple-ads-cli) -- Apple Ads
- [spotify-ads-cli](https://github.com/Bin-Huang/spotify-ads-cli) -- Spotify Ads

## License

Apache-2.0
