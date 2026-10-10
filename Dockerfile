FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY server.js ./
COPY index.html ./
COPY css ./css
COPY js ./js
COPY assets ./assets

EXPOSE 8080

CMD ["node", "server.js"]
