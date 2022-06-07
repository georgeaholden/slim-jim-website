FROM node:16-slim

WORKDIR /frontend/public
COPY /frontend/public ./

WORKDIR /frontend/src
COPY /frontend/src ./

WORKDIR /frontend
COPY /frontend/.env ./
COPY /frontend/package*.json ./

RUN npm install --production
RUN npm run build

FROM node:16-slim

WORKDIR /backend/build
COPY --from=0 /frontend/build ./

WORKDIR /backend
COPY /backend /backend/
RUN npm install --production

CMD ["node", server.js]