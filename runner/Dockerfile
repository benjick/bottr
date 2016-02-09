FROM mhart/alpine-node:latest

WORKDIR /src
COPY . .

RUN npm install node-fetch lodash helg

ENTRYPOINT ["node", "index.js"]
CMD ["NO_DATA"]
