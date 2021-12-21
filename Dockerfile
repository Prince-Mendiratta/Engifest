FROM princemendiratta/engifest:latest

WORKDIR ~

COPY . ~/BotsApp

WORKDIR ~/BotsApp

RUN npm install

EXPOSE $PORT

CMD [ "npm", "start"]