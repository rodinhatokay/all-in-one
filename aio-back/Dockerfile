FROM node:alpine

WORKDIR /app

# Copy package.json
COPY package.json .

# Copy tsconfig.json 
COPY tsconfig.json .

# Install dependencies 
RUN npm install --only=prod

# Copying source files 
COPY . .

# Building app
RUN npm run build

# Generate and run migrations
RUN npm run generate:migrations
RUN npm run run:migrations

# Set env to production 
ENV NODE_ENV=production

CMD ["npm","run","prod"]
