FROM node:22-slim
WORKDIR /app
COPY server.js dealers.json ./
USER node
EXPOSE 8080
CMD ["node", "server.js"]
