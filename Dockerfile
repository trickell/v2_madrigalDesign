# Step 1: Build
FROM node:20-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve
FROM nginx:stable-alpine

# 1. Remove the default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# 2. Copy YOUR nginx.conf into the container
# This ensures the settings you shared are actually used
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 3. Copy the built React files
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Install curl in the alpine image so we can perform the check
RUN apk add --no-cache curl

# Healthcheck: Try to hit the localhost on 8080 every 30s
# --fail makes curl return a non-zero exit code if the HTTP status is 4xx or 5xx
HEALTHCHECK --interval=30s --timeout=120s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8080/ || exit 1

EXPOSE 8080

# 4. Use 'exec' form for CMD to ensure signals are passed correctly
CMD ["nginx", "-g", "daemon off;"]