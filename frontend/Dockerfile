#Stage 1: Build the react app
FROM node:20-alpine AS Build

WORKDIR /app

#install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .

# pass the API url during build time
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# stage 2: serve with Nginx
FROM nginx:alpine

#copy the built assets from the previous build stage to Nginx's defult public folder
COPY --from=build /app/dist /usr/share/nginx/html

#expose port 80 for Nginx
EXPOSE 80

#start Nginx
CMD ["nginx", "-g", "daemon off;"]