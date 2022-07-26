FROM node:18-alpine
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
# Bundle app source
RUN npm install
# For production
# RUN npm ci --only=production
COPY . .
# expose port
EXPOSE 3001
CMD [ "node", "index.js" ]