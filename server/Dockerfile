# Step 1: Choose a base image with Node.js pre-installed
FROM node:14

# Step 2: Create and set the working directory
WORKDIR /app

# Step 3: Copy the server code into the container
COPY package.json package-lock.json ./

# Step 4: Install the required dependencies
RUN npm install

# Step 5: Copy the rest of the server code
COPY . .

# Step 6: Expose the necessary port
EXPOSE 5000

# Start the server using 'npm start'
CMD ["npm", "start"]