# ─── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# ─── Stage 2: Production (Nginx) ──────────────────────────────────────────────
FROM nginx:alpine

# Copy built React files
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
