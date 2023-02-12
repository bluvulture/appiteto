FROM node:16-alpine3.15
COPY . .
RUN npm install
CMD ["sh", "-c", "npm run test:$APP:$ENV"]

