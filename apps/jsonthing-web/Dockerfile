ARG PACKAGE_NAME="jsonthing-web"

FROM node:22-alpine AS base

# setup monorepo start
FROM base AS setup
ARG PACKAGE_NAME

RUN apk update
RUN apk add --no-cache gcompat
RUN npm add -g turbo

WORKDIR /repo
COPY . .

RUN turbo prune ${PACKAGE_NAME} --docker
# setup monorepo end

# build webapp start
FROM base AS builder

ARG PACKAGE_NAME

RUN apk update
RUN apk add git
RUN apk add --no-cache gcompat
RUN npm add -g pnpm

WORKDIR /build

COPY --from=setup /repo/out/json .
RUN cat  /build/pnpm-lock.yaml
RUN pnpm i --frozen-lockfile

COPY --from=setup /repo/out/full .

RUN pnpm turbo build --filter ${PACKAGE_NAME} --ui=stream
# build webapp end

FROM base AS runner

RUN apk --no-cache add curl

ARG PACKAGE_NAME

WORKDIR /app

# copy the built files start
COPY --from=builder \
    /build/apps/${PACKAGE_NAME}/.next/standalone .

COPY --from=builder \
    /build/apps/${PACKAGE_NAME}/.next/static ./apps/${PACKAGE_NAME}/.next/static

COPY --from=builder \
    /build/apps/${PACKAGE_NAME}/public ./apps/public
# copy the built files end

# create symlinnlk to server.js
RUN ln -s /app/apps/${PACKAGE_NAME}/server.js /app/server.js

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN chown -R nextjs:nodejs /app

USER nextjs

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE ${PORT}

CMD ["node", "/app/server.js"]
