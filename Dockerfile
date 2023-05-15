FROM --platform=linux/amd64 node:14-slim
WORKDIR /usr/src

COPY backend/ ./backend
COPY frontend/build/ ./backend/frontend
COPY package*.json ./
COPY .env ./
RUN npm install


ENV NODE_ENV = production

EXPOSE 80
EXPOSE 443
EXPOSE 5000

CMD ["npm", "run", "prod"]
