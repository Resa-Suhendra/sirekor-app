# Use Bun as the base image
FROM oven/bun:1 as base

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma client
RUN bun prisma generate

# Build the application
RUN bun run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["bun", "start"]
