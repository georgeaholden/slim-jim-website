# FROM node:16-slim

# WORKDIR /frontend/public
# COPY /frontend/public ./

# WORKDIR /frontend/src
# COPY /frontend/src ./

# WORKDIR /frontend
# COPY /frontend/.env ./
# COPY /frontend/package*.json ./

# RUN npm install --production
# RUN npm run build

FROM node:16-slim

WORKDIR /backend/build

# Using docker stage from above:
# COPY --from=0 /frontend/build ./

# Using manually generated frontend build
COPY /frontend/build ./

WORKDIR /backend
COPY /backend /backend/
RUN npm install --production

CMD ["node", "server.js"]