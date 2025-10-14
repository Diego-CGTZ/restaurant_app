 FROM --platform=amd64 node:alpine

WORKDIR /App

COPY package.json /App/
COPY package-lock.json /App/

RUN npm install

COPY . /App

EXPOSE 3000

CMD ["node", "index.js"]