FROM node:5

RUN npm install strapi -g

RUN mkdir -p /app

WORKDIR /app
ADD package.json /app
RUN npm install -p

ADD . /app

EXPOSE 1337
VOLUME ["/data"]

ADD docker-entrypoint.sh /entrypoint.sh
RUN chmod 755 /entrypoint.sh
CMD ["/entrypoint.sh"]
