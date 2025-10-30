FROM node:20.12.2 AS builder
WORKDIR /app
RUN corepack enable && corepack prepare yarn@stable --activate

COPY . .
RUN yarn dlx turbo prune --scope=api --docker

FROM node:20.12.2-alpine AS installer
WORKDIR /app
RUN corepack enable && corepack prepare yarn@stable --activate

COPY --from=builder /app/out/json/ .
RUN yarn install

COPY --from=builder /app/out/full/ .
RUN yarn turbo db:generate

RUN yarn turbo build

RUN mkdir -p /app/apps/api/uploads
CMD ["node", "apps/api/dist/main"]