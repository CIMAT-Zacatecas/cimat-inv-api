FROM node:22.14.0-alpine3.21 AS dev-deps
USER node
WORKDIR /app
COPY --chown=node:node package.json package-lock.json ./
RUN npm pkg delete scripts.prepare
RUN npm install


FROM node:22.14.0-alpine3.21 AS dev
USER node
WORKDIR /app
COPY --chown=node:node --from=dev-deps /app/node_modules ./node_modules
COPY --chown=node:node . .
CMD npm run migration:run && npm run start:dev