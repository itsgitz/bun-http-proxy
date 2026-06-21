# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) and OpenCode (opencode.ai) when working with code in this repository.

## What this is

A minimal HTTP reverse proxy that fronts the FinPay CRM v2 backend microservices.
Built with **Hono** + **Bun** — no build step, TypeScript executed directly. It maps incoming
`/dev/api/v1/<service>` paths to the local NestJS services and is the local-dev API gateway
analog of the deployed gateway (`NEXT_PUBLIC_API_BASE_URL`).

## Commands

```bash
bun install          # install deps
bun start            # run proxy (Hono + bun-native, no build step)
```

No build, lint, or test scripts exist. `tsconfig.json` is type-check only (`noEmit: true`) —
bun executes the TS directly.

## Architecture

`services.json` at repo root declares the service array (mountPath + target).
`src/main.ts` imports this file and registers one `proxy()` handler per entry via Hono.
`hono/logger` middleware logs all requests. `hono/proxy` handles header forwarding
and encoding cleanup.

To add a service: append one entry to `services.json`. No other file needs to change.

## Config

`services.json` — service definitions. Edit to add/remove/reconfigure services.

`.env` (gitignored, see `.env.example`):

- `PORT` — proxy listen port (default 8080)

Bun auto-loads `.env` — `dotenv` is not used.

## Context

This repo lives inside the `git.finpay.id` workspace alongside the backend services it proxies
(`be-auth-service`, `be-utils-service`, `be-commercial-management`,
`be-project-and-order-management-service` = PNO). See the workspace `AGENTS.md` for the broader
platform layout.
