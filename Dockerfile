FROM accupara/business-cards:latest

WORKDIR ~

COPY . ~/BotsApp

WORKDIR ~/BotsApp

CMD [ "npm", "start"]