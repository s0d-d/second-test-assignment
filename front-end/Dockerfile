# front-end/Dockerfile

# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Install yarn
RUN npm install -g yarn

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN yarn build

# Serve the React app
RUN yarn global add serve

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the app
CMD ["serve", "-s", "build"]
