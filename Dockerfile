FROM node:22.15.0-alpine3.21 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22.15.0-alpine3.21
WORKDIR /app
RUN npm install -g serve@14
COPY --from=builder /app/dist ./dist
EXPOSE 8080
CMD ["serve", "dist", "-s", "-l", "8080"]
