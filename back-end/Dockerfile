# back-end/Dockerfile

# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code (if applicable)
RUN yarn build

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the app
CMD ["yarn", "start"]
