FROM node:lts-alpine AS react

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build


# Stage 2: Nginx to serve the build
FROM nginx:1.21.3-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=react /app/dist /usr/share/nginx/html

EXPOSE 80
# Start the Vite dev server and bind to all interfaces
# CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
