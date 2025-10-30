FROM node:20.12.2 AS base
WORKDIR /app
RUN corepack enable && corepack prepare yarn@stable --activate

FROM base AS builder
COPY . .
RUN yarn dlx turbo prune --scope=web --docker

FROM base AS installer
WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN yarn install

COPY --from=builder /app/out/full/ .
RUN yarn turbo db:generate

# CSR 환경변수(NEXT_PUBLIC_*)는 빌드 단위에서 적용되어야 한다.
COPY --from=builder /app/apps/web/.env.production ./apps/web/.env
RUN yarn turbo build

FROM base AS runner
WORKDIR /app

COPY --from=installer /app/apps/web/public ./apps/web/public
COPY --from=installer /app/apps/web/.next/standalone ./
COPY --from=installer /app/apps/web/.next/static ./apps/web/.next/static

ENV HOST=0.0.0.0

CMD ["node", "apps/web/server.js"]