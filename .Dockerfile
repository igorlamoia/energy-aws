# Use the latest Node.js LTS image
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Install nano using apk
RUN apk add --no-cache nano

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install


# Copy the rest of the app
COPY . .

RUN npm run prisma:g

# Build the app
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Run the app
CMD ["npm", "run", "start:prod"]
