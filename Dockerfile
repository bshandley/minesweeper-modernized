# Multi-stage build for optimized production image
FROM node:18-alpine AS frontend-build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY .prettierrc ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY public/ ./public/
COPY src/ ./src/

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Create app directory
WORKDIR /app

# Copy server package files
COPY server/package*.json ./server/

# Install server dependencies
RUN cd server && npm ci --only=production

# Copy server code
COPY server/ ./server/

# Copy built frontend from previous stage
COPY --from=frontend-build /app/build ./build

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S minesweeper -u 1001

# Change ownership of app directory
RUN chown -R minesweeper:nodejs /app
USER minesweeper

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

# Start the application
CMD ["node", "server/app.js"]
