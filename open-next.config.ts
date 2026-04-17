import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/** Minimal Cloudflare adapter config (no R2/KV cache). Add overrides per https://opennext.js.org/cloudflare/caching if needed. */
export default defineCloudflareConfig({});
