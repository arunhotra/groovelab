FROM node:20 AS builder

WORKDIR /app

# Copy only package files first
COPY package*.json ./

# Install deps (including router)
RUN npm install react-router-dom

# Install everything else
RUN npm install

# Copy rest of the code
COPY . .

# Build the app
RUN npm run build

# Runtime image
FROM node:20-slim AS runner
WORKDIR /app

# Copy only the dist folder from builder
COPY --from=builder /app/dist ./dist

# Use a lightweight web server to serve the files
RUN npm install -g serve

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
