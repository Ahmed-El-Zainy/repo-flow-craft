# Development stage
FROM node:18-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "run", "dev"]

# Production stage
FROM node:18-alpine AS prod
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "preview"]