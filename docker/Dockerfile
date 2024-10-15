FROM node:22-bookworm AS base

# --------------- deps ---------------
FROM base AS deps

RUN corepack enable pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# --------------- build ---------------
FROM base AS build

RUN corepack enable pnpm
WORKDIR /app
COPY . .
COPY --from deps /app/node_modules /app/node_modules
RUN pnpm run build

# --------------- app ---------------
FROM httpd:2-bookworm
COPY --from build /app/dist /dist
CMD ["tail", "-f", "/dev/null"]