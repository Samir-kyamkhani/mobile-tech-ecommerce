# ---------- Stage 1: Build ----------
FROM node:20-alpine AS build

WORKDIR /app

# install deps
COPY package.json package-lock.json ./
RUN npm install

# copy source
COPY . .

# build react app
RUN npm run build


# ---------- Stage 2: Serve ----------
FROM nginx:alpine

# remove default nginx html
RUN rm -rf /usr/share/nginx/html/*

# copy build output
COPY --from=build /app/dist /usr/share/nginx/html

# expose port
EXPOSE 80

# start nginx
CMD ["nginx", "-g", "daemon off;"]
