FROM mhart/alpine-node:latest

WORKDIR /src
COPY . .

RUN npm install $(cat packages.txt)

ENTRYPOINT ["node", "index.js"]
CMD ["NO_DATA"]
