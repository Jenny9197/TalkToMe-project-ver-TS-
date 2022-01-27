FROM node:latest
WORKDIR /app
COPY package*.json /app/
RUN npm install
RUN npm install -g typescript
COPY ./ /app/
RUN npm run build
CMD ["npm", "start"] 