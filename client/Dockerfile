# Use the official Node.js image as the base image
FROM node:14 as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the app source code to the container's working directory
COPY . .

# Build the React app for production
RUN npm run build

# Use 'serve' to serve the built React app
RUN npm install -g serve

# Expose the port that 'serve' will use (it defaults to 5000)
EXPOSE 3000

# Start the server using 'npm start'
CMD ["npm", "start"]