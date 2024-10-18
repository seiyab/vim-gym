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
COPY --from=deps /app/node_modules /app/node_modules
RUN pnpm run build

# --------------- app ---------------
FROM httpd:2-bookworm
COPY ./httpd/httpd.conf /my-httpd.conf
RUN cat /my-httpd.conf >> /usr/local/apache2/conf/httpd.conf
COPY --from=build /app/dist /usr/local/apache2/htdocs
COPY --from=deps \
    /app/node_modules/vim-wasm/vim.wasm \
    /app/node_modules/vim-wasm/vim.data \
    /usr/local/apache2/htdocs/assets/