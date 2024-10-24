FROM node:latest AS builder
WORKDIR /app
# only re intall the dep if changes are made in pk.json
COPY package.json package-lock.json ./
RUN npm install
# copy other files
COPY . .
RUN npm run build

FROM nginx:1.25.2-alpine-slim
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 5000
CMD ["nginx", "-g", "daemon off;"]