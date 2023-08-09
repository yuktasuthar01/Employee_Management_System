FROM node:14

WORKDIR /app

RUN npm install dotenv

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5000
CMD ["npm", "start"]