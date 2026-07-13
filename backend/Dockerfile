#base image need for Node.js
FROM node:20-alpine 

# working directory
WORKDIR /usr/src/app

# copy only package.json and package-lock.json first
COPY package*.json ./

#install dependecies
RUN npm install

# copy the rest of backedn code into container
COPY . .

# expose the port the backend runs on 
EXPOSE 3000

#command to start the backend
CMD ["npm", "start"]