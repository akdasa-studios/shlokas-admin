# ---------------------------------------------------------------------------- #
#                                  Build stage                                 #
# ---------------------------------------------------------------------------- #

FROM node:19.8.1-alpine3.17 AS build
ARG GITHUB_TOKEN
WORKDIR /app

# install and cache app dependencies
COPY package.json package-lock.json .npmrc ./
RUN GITHUB_TOKEN=${GITHUB_TOKEN} npm ci

# build app
COPY . .
RUN npm run build


# ---------------------------------------------------------------------------- #
#                                  Final stage                                 #
# ---------------------------------------------------------------------------- #

FROM nginx:1.23.3-alpine
COPY --from=0 ./app/dist /etc/nginx/html/
COPY ./host/shlokas-admin.conf /etc/nginx/conf.d/default.conf