FROM node:12.16.3

RUN mkdir -p /raccoon-city-graphql
WORKDIR /raccoon-city-graphql
COPY . /raccoon-city-graphql
RUN yarn
RUN yarn build
EXPOSE 8080
CMD [ "yarn", "start" ]

