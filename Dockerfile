FROM node:10


ENV HOME /root
WORKDIR /root

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]





