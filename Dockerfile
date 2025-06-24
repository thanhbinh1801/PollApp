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

# Expose port for Docker
EXPOSE 8000

#Start command
CMD ["npm", "start"]