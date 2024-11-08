ARG PACKAGE_NAME="jsonthing-api"

FROM node:22-alpine AS base

# setup monorepo start
FROM base AS setup
ARG PACKAGE_NAME

RUN apk update
RUN apk add --no-cache gcompat
RUN npm add --global turbo

WORKDIR /repo
COPY . .

RUN turbo prune ${PACKAGE_NAME} --docker
# setup monorepo end

# build api start
FROM base AS builder

ARG PACKAGE_NAME

RUN apk update
RUN apk add --no-cache gcompat
RUN npm add -g pnpm

WORKDIR /build


COPY --from=setup /repo/out/json .

RUN pnpm i --frozen-lockfile

COPY --from=setup /repo/out/full .

RUN echo "ls /build"

RUN pnpm turbo build --filter ${PACKAGE_NAME} --ui=stream
RUN rm -rf  /build/**/node_modules

RUN pnpm i --prod --ignore-scripts

# build api end

FROM base AS runner

ARG PACKAGE_NAME

WORKDIR /app

# copy the built files start
COPY --from=builder \
    /build/apps/${PACKAGE_NAME}/dist /app/apps/${PACKAGE_NAME}/dist

# COPY --from=builder \
#     /build/apps/${PACKAGE_NAME}/node_modules /app/apps/${PACKAGE_NAME}/node_modules

COPY --from=builder \
    /build/node_modules /app/node_modules
# copy the built files end

# create symlinnlk to main.js
RUN ln -s /app/apps/${PACKAGE_NAME}/dist/src/main.js /app/main.js

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

RUN chown -R nestjs:nodejs /app

USER nestjs

ENV PORT=5000

EXPOSE ${PORT}

CMD ["node", "/app/main.js"]
