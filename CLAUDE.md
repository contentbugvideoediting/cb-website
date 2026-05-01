# CONTENT BUG — STACK BIBLE
**Single source of truth. Identical at the root of every CB repo.**
**Last sync:** 2026-04-24
**If this file disagrees with `cb-studio/CB_CONTEXT.md`, CB_CONTEXT.md wins.**

> AI assistants: read this file first, then the repo's own `SPEC.md` / `README.md` before touching anything.

---

## TABLE OF CONTENTS
0. [Access & tokens](#0-access--tokens)
1. [GitHub repos (32)](#1-github-repos-32)
2. [Railway services (27)](#2-railway-services-27)
3. [API endpoints (by service)](#3-api-endpoints-by-service)
5. [Environment variables](#5-environment-variables)
6. [AI models](#6-ai-models)
7. [Tools we built recently](#7-tools-we-built-recently)
8. [Portal HTML inventory](#8-portal-html-inventory)
9. [Claude skills](#9-claude-skills)
10. [Operating rules](#10-operating-rules)

---

## 0. ACCESS & TOKENS

### 0.1 GitHub
- Org: `contentbugvideoediting` (private, 32 repos as of 2026-04-27)
- Auth: `gh` CLI on operator's machine. `gh auth status` should show `contentbugvideoediting` active.
- Do NOT embed PATs in code/commits — use `gh auth token` at boot if needed.

### 0.2 Railway
- Project: `zippy-connection`
- Project ID: `00734216-9f4f-4a75-86f9-5a9ac87baa4e`
- Production Env ID: `d7e1d27c-5859-420f-87a5-f6dfe40d57ae`
- Project Access Token: `6d384c07-4ded-4fb9-8e61-975756a9276b`
- GraphQL endpoint: `https://backboard.railway.com/graphql/v2`
- Auth header: `Project-Access-Token: {token}`
- Token-scope limit: CAN create services, set env vars, generate domains, read deployments. CANNOT use `githubRepoDeploy` (account-level auth required). Workaround for refreshing a service from latest commit: destroy + recreate the service (service ID changes — update this doc after).

- Portal base: `app3feWOvRGhRF3lN` (CB Studio)
- Operator base: `app5QC9TKqfXvQL7E`
- MCP server: prefix `mcp__883cdfee-9514-4008-8e21-0622338f8eb1__`
- Key tools: `list_bases`, `list_tables_for_base`, `list_records_for_table`, `search_records`, `get_table_schema`, `update_records_for_table`, `create_records_for_table`.

### 0.4 Chrome MCPs
- `mcp__Claude_in_Chrome__*` — dedicated tab group (non-intrusive). Operator's main window untouched.
- `mcp__Control_Chrome__*` — cross-tab ops on operator's main window. Use when needed.
- `mcp__computer-use__*` — desktop screenshots + macOS ops. Browsers gate at tier `"read"` (no clicks/typing).

### 0.5 Vast.ai
- API key: `VAST_API_KEY` env var
- Endpoints used by `cb-video-gen-engine` (`/vast/account`, `/vast/offers`, `/vast/instances`, `/boot-instance`, `/start-instance/{id}`, `/stop-instance/{id}`, `DELETE /instance/{id}`)
- SSH keys: `VAST_AI_IP`, `VAST_AI_SSH_PORT`, `VAST_AI_PRIVATE_KEY`

### 0.6 GHL (GoHighLevel)
- API key: `GHL_API_KEY`
- Location: `GHL_LOCATION_ID`
- Webhook IDs: 25 separate `GHL_WEBHOOK_*` vars wired into cb-studio for each lifecycle event (checkout, onboarding-{client,editor,admin,owner,staff}, project-{created,activated,approved,review,revisions,status,approved}, trial-{booking,demo-booked,demo-showed,edit-approved,edit-submitted,offer-activated,qualified,unqualified}, report-email, payment, login-email).

---

## 1. GITHUB REPOS (32)

| Repo | Visibility | Role | Live URL |
|---|---|---|---|
| cb-studio | PRIVATE | Main portal API + shell UI | `api.contentbug.io` |
| cb-blueprint-builder | PUBLIC | Blueprint Builder v3 (React + Remotion preview) | — |
| cb-blueprints | PRIVATE | Legacy v2 builder | `cb-blueprints-production.up.railway.app` |
| cb-project-assistant | PUBLIC | AI assist + Premiere CEP plugin (branch `blueprint-v3-ingestion`) | — |
| cb-framelab-engine | PRIVATE | Video review + revision system | `framelab.contentbug.io` |
| cb-video-gen-engine | PRIVATE | Gold-tier b-roll (Wan/Hunyuan/CogVideoX, ComfyUI) | `cb-video-gen-engine-production.up.railway.app` |
| cb-creator-scraper | PRIVATE | Creator intel scraper (Apify) | `cb-creator-scraper-production.up.railway.app` |
| cb-audio-library-api | PRIVATE | Audio library browse/packs | `cb-audio-library-api-production.up.railway.app` |
| cb-audio-library-worker | PRIVATE | Ingest + tag worker (Freesound/FMA/Pixabay/YT) | (internal queue) |
| cb-remotion-worker | PRIVATE | Remotion MP4 renderer | `cb-remotion-worker-production.up.railway.app` |
| cb-blenderbug | PRIVATE | 3D render engine | `cb-blenderbug-production.up.railway.app` |
| thumbnail-engine | PRIVATE | FLUX + InstantID on Vast.ai | `cb-thumbnail-engine-production.up.railway.app` |
| cb-ollama | PRIVATE | Local LLM (Llama 3) | internal |
| cb-discord | PRIVATE | Discord embed for portal | `content-bot-production-a5fe.up.railway.app` |
| cb-id-verify | PRIVATE | Gov-ID + ArcFace verify | `cb-id-verify-production.up.railway.app` |
| cb-command | PRIVATE | Owner finance + ops center | `cb-command-production.up.railway.app` |
| cb-finances | PRIVATE | Payouts, transactions, reports | `cb-finances-production.up.railway.app` |
| cb-ghl-emails | PRIVATE | 63 transactional email templates | — |
| cb-viral-intelligence | PRIVATE | Viral perf dashboards | — |
| cb-cleangrab | PRIVATE | IG downloader + metadata strip | — |
| cb-sample-renamer | PRIVATE | Audio sample mgmt | — |
| cb-website | PUBLIC | Marketing websites (home/pricing/etc.) | `api.contentbug.io/website/*` |

---

## 2. RAILWAY SERVICES (27)

Project `zippy-connection` · `00734216-9f4f-4a75-86f9-5a9ac87baa4e`

| Service | Service ID | Public URL | Source repo |
|---|---|---|---|
| Redis | `a6cf7209-d4e4-4fbd-af17-6e60525e8bfe` | — | shared cache |
| ai-assistant | `20bbc921-d87b-4656-b8f3-4d6d78b9ec6f` | — | (TBD) |
| cb-audio-library-api | `37132a32-b730-4185-bbb1-a2b7f9897337` | cb-audio-library-api-production.up.railway.app | cb-audio-library-api |
| cb-audio-library-worker | `bc7a1eca-5f44-4ae8-a5b0-6917528c2479` | — | cb-audio-library-worker |
| cb-blenderbug | `12699f40-7e52-4453-8d94-c93bf9b89002` | cb-blenderbug-production.up.railway.app | cb-blenderbug |
| cb-blenderbug-worker | `e8afc84c-009a-4ae4-b1db-ca066da3e265` | — | cb-blenderbug |
| cb-blueprints | `031f8f43-e9f3-4082-b45f-c41116ce6417` | cb-blueprints-production.up.railway.app | cb-blueprints |
| cb-brand-engine | `37c4d83b-aee9-43b1-bb64-8e0638eccf3e` | — | (TBD) |
| cb-command | `6741feb3-c684-4b44-bc53-bfa1c5d4aebc` | cb-command-production.up.railway.app | cb-command |
| cb-creator-scraper | `23af28be-510d-45f4-a7ed-27155d120b87` | cb-creator-scraper-production.up.railway.app | cb-creator-scraper |
| cb-finances | `83875b71-145d-46f5-96b8-433ebfcff01d` | cb-finances-production.up.railway.app | cb-finances |
| cb-framelab-engine | `a2e295d5-e31a-45d4-8d49-6e82ccb91071` | framelab.contentbug.io | cb-framelab-engine |
| cb-id-verify | `6803cd6d-2757-42d9-87b6-c513f4f68140` | cb-id-verify-production.up.railway.app | cb-id-verify |
| cb-ingest-engine | `de8825c4-8a89-45ad-97dd-5cefc5434680` | — | (TBD) |
| cb-learning-engine | `36325222-05ae-432e-be71-bf55121ce003` | — | (TBD) |
| cb-ollama | `c193ed82-ffab-415c-afa9-2f82743fcc00` | — | cb-ollama |
| cb-discord | `8c210c87-0348-4271-9b17-dc4b41ab888d` | content-bot-production-a5fe.up.railway.app | cb-discord |
| cb-studio | `70077cff-31ac-42c3-aa9d-b9b9ff66fef2` | api.contentbug.io | cb-studio |
| cb-prproj-engine | `6511bada-589a-4496-a989-71d6ab734c69` | — | cb-project-assistant |
| cb-remotion-worker | `f4f01802-a5ce-4b17-bb37-cef0bda661ec` | cb-remotion-worker-production.up.railway.app | cb-remotion-worker |
| cb-render-engine | `f6b6b0b1-9903-4258-afa6-7cc51f619c68` | — | (TBD) |
| cb-review-engine | `119dd08e-3284-4244-a71e-2801523d66c6` | — | (TBD) |
| cb-s-claude | `eb6c99c8-55ad-4ccf-927a-5471fff7fc83` | cb-s-claude-production.up.railway.app | (Claude API proxy) |
| cb-telemetry | `30b78763-cb86-4473-91ce-1ec74f4c3a9d` | — | (TBD) |
| cb-thumbnail-engine | `f8064d3d-9ed8-4ec0-a3fc-829bb248ea63` | cb-thumbnail-engine-production.up.railway.app | thumbnail-engine |
| cb-video-gen-engine | `ca562d50-65bf-497a-a1c6-f9fd64cb0070` | cb-video-gen-engine-production.up.railway.app | cb-video-gen-engine |
| cb-ws | `6f51fe7a-a581-4dd5-9efe-6344cc495c86` | cb-ws-production.up.railway.app | (WebSocket gateway) |

**Orphan:** `cb-creator-scraper-d0d88397-*` (`45b8bbe2-7f9f-43be-ab87-c26a7ea81cc3`, status NONE) — queued for deletion in next audit.

**Port map (internal):** portal-shell 3000, audio-library-api 3008, creator-scraper 3007, video-gen-engine 3006, remotion-worker 3005, blenderbug 3004, project-assistant 8080, ollama 11434.

---

## 3. API ENDPOINTS (BY SERVICE)

### 3.1 cb-studio (Node/Express, 200+ routes) — source `server.js`

**Auth:** `POST /api/auth/login` · `POST /api/auth/verify` · `GET /api/auth/session` · `POST /api/auth/logout` · `POST /api/auth/trial-login` · `POST /api/auth/booking-autologin` · `POST /api/auth/trial-token`
**Discord OAuth:** `GET /auth/discord/callback` · `GET /auth/discord/connect` · `POST /api/discord/disconnect` · `GET /api/discord/embed-token|oauth/start|token`
**User:** `GET /api/user/profile|onboarding-status` · `PATCH /api/user/profile|notifications`
**Projects:** `GET/POST /api/projects` · `GET/DELETE /api/projects/:id` · `GET /api/projects/:id/assets|revisions|thread|thumbnail|thumbnail/debug|video` · `POST /api/projects/:id/approve|deliver|extract-hooks|finalize-uploads|probe|rate-quality|reassign-editor|request-revisions|revisions|revisions/confirm|send-for-review|start|thread|thread/read|thumbnails/generate|transcribe|transcribe/enqueue` · `DELETE /api/projects/:id/revisions/:revId` · `PATCH /api/projects/:id/status|assign-editor|blueprint-overrides`
**Blueprints:** `GET/POST /api/blueprints` · `GET/PATCH /api/blueprints/:id` · `GET /api/blueprints/presets`
**Teams:** `GET/POST /api/teams` · `DELETE /api/teams/:id` · `PATCH /api/teams/assign|unassign` · `GET /api/teams/:teamId/chat/messages|dashboard`
**Pools:** `GET /api/pools|pools/clients|pools/editors` · `POST /api/contacts/:id/pool`
**Admin:** `GET /api/admin/billboard|health-dashboard|payout-config|staff-pay|weekly-report|adobe/seats|adobe/status/:id` · `POST /api/admin/adobe/provision|deprovision|backfill-staff-report-folders|backfill-storage-folders|demo-reset|demo-role|expire-contact/:id|health/archive-month|invite|repair-storage|trigger-weekly-report` · `PATCH /api/admin/assign-editor|contact-status|editor-status|payout-config|staff-pay/:contactId` · `DELETE /api/admin/contacts/:id`
**Operator:** `GET /api/operator/:resource|health-overview` · `POST /api/operator/creators/:id/scrape|expenses|health-reports/generate|payouts/generate|scraped-videos/:id/reanalyze|transactions` · `PATCH /api/operator/bank-accounts/:id`
**GHL operator mirror:** `GET/POST/PATCH/DELETE /api/ghl-operator/*` (contacts, custom-fields, custom-values, funnel-pages, funnels, opportunities, payments/{orders,subscriptions,transactions}, pipelines, products, templates, workflows; plus `funnel-pages/bulk-{delete,push}`, `templates/bulk-delete`)
**FrameLab:** `GET /api/framelab/editors/:id/scorecard|projects/:id/budget|projects/:id/hooks|projects/:id/revision-clusters|projects/:id/transcript|queue|ws-token` · `POST /api/framelab/projects/:id/assistant/:action|submit`
**Chat:** `GET /api/chat/avatar-proxy|channels|channels/:contactId/messages|channels/:contactId/projects|group/:type/messages|participants` · `POST /api/chat/channels/:contactId/messages|group/:type/messages`
**Onboarding:** `GET /api/onboarding/client/character-board|public/client/character-board|public/profile|public/social-verify|social-verify|staff-record` · `POST /api/onboarding/client|client/headshots|client/logo|complete|progress|public/client|public/client/headshots|public/client/logo|public/complete|public/progress|public/staff/gov-id|staff/gov-id|test-phase-pass|test-score` · `PATCH /api/onboarding/step`
**Contracts:** `POST /api/contracts/employment/sign|nda/sign`
**ID Verify:** `GET /api/id-verify/start|result/:sid` · `POST /api/id-verify/start|webhook`
**AI assist:** `POST /api/ai/ghl-chat|hooks-suggest|project-name-suggest`
**Storage:** `GET /api/storage/files/:folderId|folders|tree/:folderId|gcs/media/*|drive/media/:fileId` · `PATCH /api/storage/folders/:driveId/move|rename` · `DELETE /api/storage/folders/:driveId|gcs`
**Queue tails (pending work for workers):** `GET /api/cut/pending|thumbgen/pending|transcribe-clean/pending|transcribe/pending|transcribe/queue|vision/pending|notifications/pending` · `POST /api/cut/:projectId/callback`
**Misc:** `GET /api/billboard|booking-landing|calendar/slots|contacts|contacts/:id/detail|stripe/config|website-timestamps|wiki/content|wizard/footage-intel|zoom/meetings|zoom/meetings/all|social/youtube-search|meta/ip|deploy-info|trial/status` · `GET /api/health` · `GET /dev-mode.js` · `GET /ghl-operator|portal/email-template-library.html|portal/ghl-operator|website-library.html`

### 3.2 cb-audio-library-api (FastAPI, 12 routes)
`GET /`, `GET /health`
**Packs:** `GET|PATCH|DELETE /{pack_id}`
**SFX:** `GET /{sfx_id}`
**Tracks:** `GET /{track_id}` · `POST /{track_id}/play` · `POST /{upload_id}/auto-tag` · `POST /{upload_id}/promote`
**Ingest:** `POST /ingest/{source}` (source ∈ {freesound, fma, pixabay, archive, incompetech, youtube}) · `GET /ingest/{job_id}`

### 3.3 cb-creator-scraper (FastAPI, 13 routes)
`GET /`, `GET /health`
**Creators:** `GET /creators` · `GET /creators/{key}` · `GET /creators/{key}/default-blueprint` · `GET /creators/{key}/top-thumbs`
**Jobs:** `POST /run` · `GET /jobs` · `GET /jobs/{job_id}` · `POST /jobs/{job_id}/cancel`
**Data:** `GET /posts` · `GET /search` · `GET /stats`

### 3.4 cb-video-gen-engine (FastAPI, 13 routes)
`GET /`, `GET /health`
**Jobs:** `POST /single-clip` · `POST /blueprint-broll` · `GET /{job_id}` · `GET /{job_id}/clips/{n}`
**Vast admin:** `GET /vast/account|offers|instances` · `POST /boot-instance` · `POST /start-instance/{id}` · `POST /stop-instance/{id}` · `DELETE /instance/{id}`

### 3.5 cb-project-assistant (FastAPI, 14 routes)
`GET /healthz` · `GET /jobs/{job_id}`
**Pipeline:** `POST /ingest|check|generate|render`
**Assistant AI:** `POST /assistant/brief-parse|brolly-suggest|caption-polish|cluster-revisions|hook-select|rough-cut|tighten`

### 3.6 cb-remotion-worker (Node/Express, 3 routes)
`GET /health` · `POST /render` · `GET /jobs/:jobId`

### 3.7 cb-blenderbug
`GET /api/v1/health` · `POST /api/v1/render` · queue-backed (`cb-blenderbug-worker`)

### 3.8 cb-id-verify
`GET /api/v1/health` · `POST /api/verify` · webhook → cb-studio `/api/id-verify/webhook`

### 3.9 cb-ollama
Standard Ollama: `POST /api/generate` · `POST /api/chat` · `GET /api/tags`

### 3.10 cb-s-claude · cb-ws · cb-ingest-engine · cb-review-engine · cb-render-engine · cb-brand-engine · cb-learning-engine · cb-telemetry
Endpoints to be harvested during next `gh repo clone` pass (source repos TBD).

---

### 4.1 Portal base — `app3feWOvRGhRF3lN` (CB Studio)

| Table | Table ID | Fields | Role |
|---|---|---|---|
| contacts | `tblrMDb4gcQf4plzY` | 197 | Users, contacts, leads, editors, admins, trials, owners |
| blueprints | `tblLLvLQyRsv2xBWL` | 49 | Editing blueprints (per-project snapshot, v1/v2 schema) |
| projects | `tblXbDh5i7phvLBgc` | 124 | Projects + pipeline status + framelab threads + thumbnails |
| login_history | `tblTLJrAz3cC0fPSh` | 10 | Every login event + OTP code |
| pools | `tblwJwkUzLjAlzIHk` | 8 | Tiered editor pools (T1/T2/T3 + tier_matches) |

**Contacts key fields (cross-service):**
`full_name fldCii2SINJf1lZxM` · `first_name fldODBtgZ7lWpDPB8` · `last_name fldJnvzxRfbEiTT59` · `email fld2hYRwPV1QPoxzi` · `role fldkSpfcQG42eI53f` (Lead/Trial/Client/Editor/Admin/Owner) · `contact_id fldRYkebkPWnswwlV` · `verification_code fldfZUmABXb7cW4LI` · `code_expires fldrF1Ji2fVmBqSvM` · `last_login fldoVFpOQIRNBphdh` · `discord_chat_channel_id fld6pIWwfnEwq6U28` · `avatar_url fldntvlUsKGezyAcr` · `portal_access_mc fldefNDFiBJM9tCbK` · `onboarding_complete fldxzf60Itel4kEIo` · `owner_onboarding_status_mc fldJOBa0rEZ9m9Vbx` · `trial_status_mc fldjwHakKqAwy91NW` · `id_verify_status fldGylnuVts5Cv7h9` · `id_verify_score fldHyiddGvoqjflgY` · `nda_signed fldju5amg8MxUQ7qZ` · `contract_signed fld2aXLQ9w3eoIX6F`

**Projects key fields (cross-service):**
`project_name fldg9mAzIKmOsgeNr` · `project_id fldRh7HXKoVcgtnxd` · `project_status fldoEVNFVkIuusen2` · `project_type fldxDDwCXPm8FD05K` · `assigned_editor fldqs0dqZT60vkXcl` · `blueprint fld6BmwHVi67BP6jg` · `gcs_project_path fldKQZs5V59Z9aqrm` · `hls_manifest_path fldxQwfz9jBPaOOa1` · `transcript_raw_path fldvn6JhY64viCMH3` · `transcript_clean_path fldIq83WeH6Yyrb30` · `cleaned_gcs_path fldB5XXgGXqIMAqFY` · `framelab_tier fldo8PA5UWbvU6uZF` · `framelab_used_rounds fldd9DyhTxxeYk5b3` · `framelab_revisions_json fldrypaVXAsNeIEf8` · `framelab_revisions_open_count fldnmObphkp2gbcU2` · `quality_score fldm0Bs8ONfrGtpbs` · `project_grade fldKyyGGGRnTh1LiF` · `thumbnails_status fld6Gap1hPzxdYeux` · `selected_thumbnail_url fldeb3S2jTjaOCOAU` · `is_trial fld34PAxssOHMPzgO`

### 4.2 Operator base — `app5QC9TKqfXvQL7E`

| Table | Table ID | Fields | Role |
|---|---|---|---|
| Health Reports | `tblXchfV8ET2WpWJN` | 23 | Weekly editor health rollups |
| Payout Reports | `tbllEyreCndse0HVa` | 21 | Payout batches |
| Sales Reports | `tblcWKIvctHvYyIbb` | 23 | Sales + revenue |
| Staff Records | `tblO1E9NAEisN6ZRn` | 46 | Staff ledger |
| Expenses | `tblW19CsVo3kyuqG8` | 15 | Finance expenses |
| Bank Accounts | `tblqwsJfRANWgIrMw` | 22 | Financial accounts |
| Transactions | `tblj5ji5g9JyoEP2I` | 20 | Transaction log |
| Creators | `tblesuqgJ3G72i6TW` | 20 | Scraper creator catalog |
| Scraped Videos | `tbl20OGCze5jEUn7H` | 28 | Scraper output |
| _TRASH_default_table | `tblIdRvTOP64pfxoC` | 6 | deprecated |

---

## 5. ENVIRONMENT VARIABLES

**Values** live in `/Users/contentbug/cb/workspace/.env.master` (chmod 600, gitignored). Names + consumers:

### 5.2 GCS
`GCS_BUCKET` (portal-shell) · `GCS_BUCKET_FRAMELAB` (audio-library-worker, remotion-worker)
`GCS_INGEST_BUCKET`, `GCS_TRAINING_BUCKET` (project-assistant)
`GCS_SA_KEY_JSON`, `GOOGLE_SERVICE_ACCOUNT_JSON` (portal-shell, project-assistant) · `GCS_KEY_JSON_B64` (remotion, video-gen, creator-scraper)

### 5.3 Redis
`REDIS_URL` (audio-library-api, creator-scraper, remotion-worker, video-gen-engine, portal-shell, project-assistant)

### 5.4 Vast.ai
`VAST_API_KEY` (video-gen, creator-scraper) · `VAST_AI_IP`, `VAST_AI_SSH_PORT`, `VAST_AI_PRIVATE_KEY` (portal-shell)

### 5.5 Apify
`APIFY_TOKEN` / `APIFY_API_TOKEN` (creator-scraper, portal-shell)
`APIFY_ACTOR_YT`, `APIFY_ACTOR_YT_TRANSCRIPTS`, `APIFY_ACTOR_TIKTOK` (creator-scraper)

### 5.6 Ollama
`OLLAMA_URL`, `OLLAMA_MODEL` (creator-scraper, video-gen-engine, portal-shell)

### 5.7 YouTube
`YOUTUBE_API_KEY` (creator-scraper, portal-shell)

### 5.8 ComfyUI
`COMFYUI_HOST`, `COMFYUI_PORT`, `MODEL_CACHE_DIR`, `IDLE_SHUTDOWN_S` (video-gen-engine)

### 5.9 Internal handoff tokens
`CB_PORTAL_TOKEN` (all services calling portal API)
`INTERNAL_API_KEY` (portal-shell + derivatives: `vg_{INT[:24]}` for video-gen, `cs_admin_{INT[:24]}` for creator-scraper)
`WORKER_TOKEN` (portal-shell, remotion-worker, audio-library-worker, blenderbug-worker)
`API_KEY` (per-service, bound to that service's auth check) · `ADMIN_API_KEY` (creator-scraper)
`CB_WS_API_KEY`, `CB_WS_TOKEN`, `CB_WS_URL`, `CB_WS_HMAC_SECRET`, `CENTRIFUGO_API_KEY`, `CENTRIFUGO_TOKEN_HMAC_SECRET_KEY` (portal-shell, project-assistant)

### 5.10 Portal → other services
`CB_ASSISTANT_ENGINE_URL`, `CB_FINANCES_URL`, `CB_LEARNING_ENGINE_URL`, `CB_REVIEW_ENGINE_URL`, `CB_THUMBNAIL_ENGINE_URL`, `CB_THUMBNAIL_ENGINE_TOKEN`, `FRAMELAB_ENGINE_URL`, `ID_VERIFY_URL`, `ID_VERIFY_INTERNAL_TOKEN`, `BLENDERBUG_URL`, `BLENDERBUG_API_KEY`, `BLENDERBUG_WELCOME_LOGO`, `RAILWAY_SERVICE_*_URL`

### 5.11 GHL
`GHL_API_KEY`, `GHL_LOCATION_ID`, `GHL_FIELD_LEAD_STATUS`, `GHL_WORKFLOW_LOGIN_EMAIL`
`GHL_WEBHOOK_{blueprints,blueprint_created,checkout,contact_details,demo_showed,lead_qualified,lead_unqualified,login_email,onboarding_{admin,client,editor,owner,staff},payment,projects,project_{activated,approved,created,review,revisions,status},report_email,trial,trial_{booking,demo_booked,demo_showed,edit_approved,edit_submitted,offer_activated,qualified,unqualified}}`

### 5.12 Discord
`DISCORD_BOT_TOKEN`, `DISCORD_BOT_JWT_SECRET`, `DISCORD_GUILD_ID`, `DISCORD_OAUTH_CLIENT_ID`, `DISCORD_OAUTH_CLIENT_SECRET`, `DISCORD_OAUTH_REDIRECT_URI`, `DISCORD_PINGS_ENABLED` (portal-shell, portal-discord)

### 5.13 Adobe Admin Console (FrameLab seats)
`ADOBE_CLIENT_ID`, `ADOBE_CLIENT_SECRET`, `ADOBE_IMS_URL`, `ADOBE_ORG_ID`, `ADOBE_PRIVATE_KEY_PEM`, `ADOBE_TECH_ACCOUNT_ID`, `ADOBE_UMAPI_URL`, `ADOBE_FRAMELAB_PRODUCT_PROFILE` (portal-shell)

### 5.14 Stripe
`STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` (portal-shell)

### 5.15 Zoom
`ZOOM_WEBHOOK_SECRET` (portal-shell)

### 5.16 Google Drive folders
`DRIVE_PROJECTS_FOLDER_ID`, `DRIVE_ROOT_FOLDER_ID`, `DRIVE_SHARED_DRIVE_ID`, `DRIVE_STORAGE_FOLDER_ID` (portal-shell)

### 5.17 Session / security
`SESSION_SECRET`, `REVIEW_JWT_SECRET`, `WEBHOOK_SECRET`, `DEV_MODE_SECRET`, `OWNER_WHITELIST_EMAILS`, `GITHUB_TOKEN` (portal-shell)

### 5.18 Content / tunables
`BILLBOARD_SLIDES`, `BLUEPRINT_V`, `FRAMELAB_OVERFLOW_CENTS`, `PAYOUT_CORE_BASE`, `PAYOUT_MASTER_BASE`, `TRIAL_OFFER_TITLE|DESC|URL`, `UPLOAD_CONCURRENCY` (portal-shell)

### 5.19 Render-time tunables
`WHISPER_MODEL`, `BRAND_FRAME_SAMPLES`, `BRAND_LOGO_BOOKEND_SEC`, `BRAND_LOGO_MATCH_THRESHOLD`, `BRAND_WORKDIR`, `INGEST_WORKDIR`, `RENDER_HW_ACCEL`, `RENDER_PARALLEL_LIMIT`, `RENDER_PROGRESS_EVERY`, `RENDER_WORKDIR` (project-assistant)

### 5.20 Assistant AI (multi-provider)
`ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `GEMINI_API_KEY`, `GOOGLE_API_KEY`, `GOOGLE_CLOUD_PROJECT` (project-assistant)

### 5.21 `PORT` (every HTTP service)

---

## 6. AI MODELS

| Model | Host | Consumers | Purpose |
|---|---|---|---|
| Llama 3 (Ollama) | `cb-ollama` service (`OLLAMA_URL`) | creator-scraper, video-gen, portal-shell AI endpoints | General LLM |
| Whisper / WhisperX | `cb-ingest-engine` (Vast.ai burst) | portal `/api/projects/:id/transcribe` | Transcripts |
| Wan 2.1 + HunyuanVideo + CogVideoX (ComfyUI) | `cb-video-gen-engine` + Vast GPU | portal `/single-clip`, `/blueprint-broll` | Text→video b-roll |
| FLUX.2 + InstantID | `thumbnail-engine` + Vast GPU | portal `/api/projects/:id/thumbnails/generate` | Thumbnails with face preserve |
| ArcFace | `cb-id-verify` | portal `/api/id-verify/start` | Face ↔ ID photo match |
| Claude (Anthropic API) | `cb-s-claude` proxy | project-assistant, portal `/api/ai/*` | High-quality assistant tasks |
| Apify scrapers | apify.com | creator-scraper `/run` | YT / TikTok scraping |
| CLAP (music embedding) | `cb-ingest-engine` | blueprint music matching | Music retrieval |

---

## 7. TOOLS WE BUILT RECENTLY

| Tool | Repo | Railway service | Produces |
|---|---|---|---|
| Blueprint v3 ingestion CEP plugin | cb-project-assistant (branch `blueprint-v3-ingestion`) | Premiere Pro panel | `delivery_report.json`, cuts on timeline |
| Video gen engine | cb-video-gen-engine | cb-video-gen-engine | MP4 clip URL (GCS) |
| Remotion worker | cb-remotion-worker | cb-remotion-worker | MP4 render in GCS |
| Blenderbug | cb-blenderbug | cb-blenderbug + worker | 3D frame / MP4 in GCS |
| Thumbnail engine | thumbnail-engine | cb-thumbnail-engine | 3 thumbnail URLs |
| Portal Discord | cb-discord | cb-discord | In-portal chat |
| Ingest engine | (source repo TBD) | cb-ingest-engine | Transcripts + framelab_assets_json |
| Review engine | (source repo TBD) | cb-review-engine | Revision clusters + open_count |
| WS gateway | (source repo TBD) | cb-ws | WebSocket channels |
| S-Claude proxy | (source repo TBD) | cb-s-claude | Claude API responses |

---

## 8. PORTAL HTML INVENTORY

29 pages at `cb-studio/public/*.html` (Step 2 scope):

| File | Mode |
|---|---|
| `login.html` | standalone |
| `index.html` | standalone (shell container) |
| `framelab-project-pipeline.html` | iframe (default `#frame_pipeline`) |
| `framelab/framelab-project-view.html` | iframe |
| `blueprints.html` | iframe |
| `storage.html` | iframe |
| `operator.html` | iframe |
| `operator-automation.html` | iframe |
| `account.html` | iframe |
| `settings.html` | iframe |
| `request.html` | iframe |
| `onboarding.html` | standalone |
| `onboarding-tests.html` | iframe |
| `faq.html` | iframe |
| `content-bug-wiki.html` | iframe |
| `discord.html` | iframe |
| `gpu-terminal.html` | iframe |
| `health.html` | iframe |
| `blenderbug.html` | iframe |
| `library.html` | standalone/dev |
| `component-library.html` | standalone/dev |
| `email-template-library.html` | standalone/dev |
| `_v2-preview.html` | standalone/dev |
| `logo-preview.html` | standalone/dev |
| `launcher.html` | standalone |
| `tool-index.html` | standalone |
| `client-profile.html` | iframe |
| `editor-profile.html` | iframe |
| `internal/workflow-templates.html` | standalone |

---

## 9. CLAUDE SKILLS

Local to operator machine, in `~/.claude/skills/`:

- `portal-self-contain/` — tree-shake + inliner + resolver map. Scripts: `tree-shake.py`, `batch-self-contain.py`, `cb-inline-v2.py`, `resolver-map.css`.
- `portal-audit-and-fix/` — chain skill: self-contain → audit → fix → deploy-verify.
- `design-consistency-audit/` — cross-page drift scan.
- `railway-deploy-verify/` — push → wait-for-SUCCESS → verify live URL.
- `tight-execution/` — boot-discipline rules.
- `livestream-protocol/` — Chrome lock-in at session boot.

---

## 10. OPERATING RULES

### 10.1 Boot tabs (mandatory core four)
Always open at session start:
1. GitHub: `https://github.com/contentbugvideoediting/cb-studio`
2. Railway: `https://railway.com/project/00734216-9f4f-4a75-86f9-5a9ac87baa4e`
3. Portal: `https://api.contentbug.io/portal/`

### 10.2 Deploy discipline
- Every push to `cb-studio/main` auto-triggers Railway deploy.
- Wait for GraphQL deploy status `SUCCESS` before reporting shipped.
- Curl live URL with cache-bust: `curl -sS "$URL?cb=$(date +%s)"`.
- Screenshot live via Chrome MCP before signing off.

### 10.3 Self-contain discipline (portal pages)
- Zero `<link rel="stylesheet">` · zero `var(--*)` · zero `/portal/` absolute paths.
- Every page has its own embedded `<style>` block with literal values only.
- Logo inlined as base64 data URI (no external SVG fetch).
- Fonts referenced with relative paths (`fonts/sf-pro-*.woff2`) or inlined base64.
- Before re-running inliner on an already-inlined file: `git show 92a42f7:public/<file> > public/<file>` to reset first.

### 10.4 Chrome ops
- Use `mcp__Claude_in_Chrome__*` for my dedicated tab group (operator's main window untouched).
- Use `mcp__Control_Chrome__*` to see/drive operator's main window tabs.
- Never use AppleScript or System Events on Chrome (browser tier `"read"` enforces this).
- Screenshots via `mcp__computer-use__screenshot`.

- Schema first: `list_tables_for_base` → `get_table_schema` before any write.
- For `singleSelect` writes: use the option NAME (string), not the object form returned by reads.

### 10.6 Railway ops
- Project token grants service-level ops (create service, env vars, domain, env writes, redeploy).
- Does NOT grant `githubRepoDeploy` (account-level). To pull a new commit after push: manually hook GitHub in Railway dashboard, OR destroy + recreate the service (update this doc with the new service ID).

### 10.7 Git discipline
- Branch strategy: `main` is the deployed branch on most repos. Feature work on `feature/*`, hotfixes direct to `main` only on explicit user sign-off.
- Commit messages follow conventional commits: `feat`, `fix`, `chore`, `docs`.
- Always `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>` on commits made by an AI agent.

### 10.8 What NOT to do
- Don't introduce new external CSS / CDN / design-token files to the portal.
- Don't create new Railway services without explicit approval.
- Don't force-push to `main` on any repo.
- Don't embed tokens/secrets in code or commits.

---

**END OF STACK BIBLE.** Cross-reference cb-studio/CB_CONTEXT.md for any divergence; update this file as the stack evolves.
