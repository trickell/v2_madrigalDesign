# Step 1: Build
FROM node:20-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve
FROM nginx:stable-alpine

# Remove ALL default Nginx configs that might use port 80
RUN rm /etc/nginx/conf.d/*
RUN rm -rf /etc/nginx/sites-enabled
RUN rm -rf /etc/nginx/sites-available

# Copy your specific nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build files
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Optional but helpful: ensure Nginx can run without root permissions
RUN touch /var/run/nginx.pid && \
  chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

USER nginx

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]