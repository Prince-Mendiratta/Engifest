FROM princemendiratta/engifest:latest

WORKDIR ~

COPY . ~/BotsApp

WORKDIR ~/BotsApp

RUN npm install

CMD [ "npm", "start"]