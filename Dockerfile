#Base-Image
FROM node:22-slim

#Working-directory
WORKDIR /app

#Copy package files 
COPY package*.json ./

#Install dependencies
RUN npm install

# Copy source
COPY . .

#Start command
CMD ["npm", "start"]