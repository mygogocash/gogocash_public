# Stage 1: The 'builder' stage
FROM node:20-alpine AS builder

WORKDIR /app

# 1. Install build dependencies (Python, make, g++ for node-gyp)
#    - Use a single RUN command to install and then remove the package list cache
RUN apk update && \
    apk add --no-cache python3 make g++ && \
    rm -rf /var/cache/apk/*

ENV SWC_PKG_TRIPLE=x86_64-unknown-linux-musl
# Copy package.json and package-lock.json and install dependencies
COPY package.json yarn.lock ./

# 2. Run yarn install (and clean cache)
# RUN yarn install --frozen-lockfile && yarn cache clean
RUN yarn install --frozen-lockfile 
# --build-from-source=@swc/core && yarn cache clean

# The rest of your Dockerfile...
COPY . .
RUN yarn build

# Stage 2: The 'runner' stage...
# ... (no changes needed here, as the final image will be small)

# baseステージをもとにrunnerステージを開始
FROM builder AS runner

WORKDIR /app

# public と .next/static は nextjs の standalone を使う場合に含まれないため、コピーする必要がある
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# `next start` の代わりに `node server.js` を使用
CMD ["node", "server.js"]