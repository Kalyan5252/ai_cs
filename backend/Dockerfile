# -----------------------------
# 1) Builder Stage (TypeScript)
# -----------------------------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDeps)
RUN npm install

# Copy the full source code
COPY . .

# Build TypeScript
RUN npm run build



# -----------------------------
# 2) Production Stage (smaller)
# -----------------------------
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm install --only=production

# Copy compiled code from builder
COPY --from=builder /app/dist ./dist

# Expose backend port
EXPOSE 5500

# Start your server
CMD ["node", "dist/server.js"]
