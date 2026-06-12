# bun-http-proxy

Minimal HTTP reverse proxy for local development of the FinPay CRM v2 microservices.
Built with **Hono** + **Bun** — no build step, TypeScript executed directly.

## Usage

```bash
bun install
bun start
```

## Configuration

Copy `services.example.json` to `services.json` and edit targets for your local services.

Copy `.env.example` to `.env` to change the port:

```env
PORT=9000
```

## Adding a service

Edit `services.json` — add one object to the array. See `services.example.json` for the full format.

Restart the proxy. No code changes needed.
