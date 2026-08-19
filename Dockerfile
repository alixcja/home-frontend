# Stage 1: Build-Prozess (Node.js)
FROM node:lts-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm@latest-10

COPY package*.json ./
RUN pnpm install

COPY . .
RUN pnpm run build:no-tsc

FROM nginx:alpine

COPY --from=builder /app/dist /app/dist

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

# Nginx im Vordergrund starten
CMD ["nginx", "-g", "daemon off;"]