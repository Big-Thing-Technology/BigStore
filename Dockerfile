FROM node:20

# Argument passed at build time that will be appended to .env.production (if the file doesn't exist it will just create it)
#ARG NEXT_PUBLIC_URL_API_URL=""
ARG DATABASE_URL
ARG INIT_ADMIN_USERNAME
ARG INIT_ADMIN_PASSWORD
ARG INIT_ADMIN_EMAIL
ARG SECRET_TOKEN_KEY
WORKDIR /usr/src/app

COPY package*.json ./
COPY .yarnrc ./
RUN yarn install

COPY . .

# Build the site in production mode. .env.production is used
RUN echo "DATABASE_URL=$DATABASE_URL \n\
          INIT_ADMIN_PASSWORD=$INIT_ADMIN_PASSWORD \n\
          INIT_ADMIN_USERNAME=$INIT_ADMIN_USERNAME \n\
          INIT_ADMIN_EMAIL=$INIT_ADMIN_EMAIL \n\
          SECRET_TOKEN_KEY=$SECRET_TOKEN_KEY \n" \
    >> .env

#build docker
RUN yarn prisma generate
RUN yarn build

# I run my app on port 80 but you get the idea
EXPOSE 3000
RUN ["chmod" ,"+x" ,"./start-service.sh"]
ENTRYPOINT ["./start-service.sh"]