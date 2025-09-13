# Build stage
FROM node:20 AS builder
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm install

# Copy rest of source and build
COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
