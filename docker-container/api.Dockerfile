FROM node:18.0.0

RUN mkdir /app
WORKDIR /app

COPY ./../package.json package.json

RUN npm i

COPY ./../. .

ENTRYPOINT ["npm", "run"]

CMD ["start"]
