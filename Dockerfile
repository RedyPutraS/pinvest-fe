FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Update npm to the latest version
RUN npm install -g npm@10.8.3

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Expose the port where the application will run
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
