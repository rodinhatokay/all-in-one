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
# Copy the built app to Nginx's serving directory
COPY --from=build /app/dist /usr/share/nginx/html
# Copy the custom Nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
