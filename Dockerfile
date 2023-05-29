# Use the official Node.js 14-alpine base image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

COPY . .

# Install app dependencies
RUN npm ci --only=production

# Build the app
RUN npm install

# Build the app
RUN npm run build

# Set the working directory to the 'dist' folder
WORKDIR /app/dist

# Expose the port your app is listening on
EXPOSE 3030

# Define ENV
ENV MYSQL_HOST=192.168.18.236
ENV MYSQL_PORT=3306
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=
ENV MYSQL_DBNAME=test_skyshi

# Start the app
CMD ["node", "main.js"]