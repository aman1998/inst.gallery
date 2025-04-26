# Use Node.js 20 as the base image
FROM node:20 AS base

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from the current directory (including hidden files) to the container
COPY . .

# Run build (if you have a build step)
RUN npm run build

# Use a smaller alpine-based image for the release stage
FROM node:20-alpine3.19 AS release

# Set the working directory in the container
WORKDIR /app

# Copy the necessary directories from the base image
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public

# Copy everything else from the base image (all files including hidden files)
COPY --from=base /app/. ./

# Expose the application port
EXPOSE 3000

# Set environment variables
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Command to run the app
CMD ["npm", "run", "start"]