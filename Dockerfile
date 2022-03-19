## this is the stage one , also know as the build step

FROM node:12.17.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

## this is stage two , where the app actually runs

FROM node:12.17.0-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY --from=0 /usr/src/app/dist ./dist
COPY --from=0 /usr/src/app/public ./public
COPY --from=0 /usr/src/app/views ./views

EXPOSE 80
CMD npm start

## use one stage

# FROM node:12.17.0-alpine
# WORKDIR /app
# COPY package*.json ./
# COPY tsconfig.json ./
# COPY src /app/src
# COPY public /app/public
# COPY views /app/views
# RUN npm install
# RUN npm run build
# EXPOSE 80
# CMD npm start