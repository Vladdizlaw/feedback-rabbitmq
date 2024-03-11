FROM node:18-alpine 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3700
CMD ["npm", "run", "start"]