# Build the app
FROM node:alpine as build
WORKDIR /app
# Install expo-cli globally
RUN npm install -g expo-cli
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npx expo export -p web

# Serve the app using Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
