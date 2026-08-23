/// <reference path="../.astro/types.d.ts" />
/// <reference types="@cloudflare/workers-types" />

interface Env {
  DB: D1Database;
  APP_ORIGIN: string;
  PAYMENTS_ENABLED: string;
  DATA_RETENTION_DAYS: string;
  RAZORPAY_KEY_ID?: string;
  RAZORPAY_KEY_SECRET?: string;
  ADMIN_TOKEN?: string;
}

interface ImportMetaEnv {
  readonly APP_ORIGIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
