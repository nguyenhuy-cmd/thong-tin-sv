# Stage 1: Build source code TypeScript sang JavaScript
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
RUN npm prune --production

# Stage 2: Môi trường chạy Production gọn nhẹ
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Mở cổng kết nối của NestJS
EXPOSE 6969

CMD ["node", "dist/main.js"]