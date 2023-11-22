FROM node:latest

COPY . /app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src/ .

RUN npm uninstall bcrypt

RUN npm install bcrypt

EXPOSE 3000

CMD ["npm", "run", "dev"]