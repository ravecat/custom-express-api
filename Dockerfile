FROM node:10.13-alpine
WORKDIR /app
COPY . /app
RUN yarn
EXPOSE 3001
CMD ["yarn", "start"]
