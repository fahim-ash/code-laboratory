# Use Node.js official image as the base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to install dependencies first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend project
COPY . .

# Expose port
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
