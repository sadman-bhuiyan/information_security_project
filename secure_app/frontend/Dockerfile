# Dockerfile

# Use node alpine as it's a small node image
FROM node:14-alpine


# Create the directory on the node image 
# where our Next.js app will live

# Set /app as the working directory
WORKDIR /user/src/app/frontend

# Copy package.json and package-lock.json
# to the /app working directory
COPY package*.json /user/src/app/frontend/

# Install dependencies in /app
RUN npm ci 

# Copy the rest of our Next.js folder into /app
COPY . /user/src/app/frontend

# Ensure port 3000 is accessible to our system
EXPOSE 3000

# Run yarn dev, as we would via the command line 
CMD ["yarn", "dev"]
