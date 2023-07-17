FROM node:alpine

WORKDIR /app

# copy package.json
COPY package.json .

# copy packagejson 
COPY tsconfig.json .

# install dependencies 
RUN npm install --only=prod

# copying source files 
COPY . .

# building app
RUN npm run build

# set env to production 
ENV NODE_ENV=production

CMD ["npm","run","prod"]