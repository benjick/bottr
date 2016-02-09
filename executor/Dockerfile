FROM mhart/alpine-node:latest

WORKDIR /src

COPY ./package.json ./package.json
RUN npm install

COPY . .

CMD ["npm", "start"]
