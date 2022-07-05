FROM node:10 

ENV DEBUG="chats:*,messages:*" 
ENV MONGODB_CONNSTRING="mongodb://10.92.2.136:27017" 
ENV MONGO_DBNAME="rabb"
ENV CHATS_MODEL="mongodb" 
ENV USER_SERVICE_URL="http://10.92.1.212:3333" 
ENV PORT="3000" 
ENV CHATS_SESSIONS_DIR="/sessions"

RUN mkdir -p /chatsapp /chatsapp/partials /chatsapp/public /chatsapp/routes /chatsapp/views
COPY models/*.mjs /chatsapp/models/
COPY partials/ /chatsapp/partials/
COPY public/ /chatsapp/public/
COPY routes/ /chatsapp/routes/
COPY views/ /chatsapp/views/
COPY app.mjs package.json dirname.js /chatsapp/

WORKDIR /chatsapp
RUN apt-get update -y \
    && apt-get -y install curl python build-essential git ca-certificates \
    && npm install --unsafe-perm

WORKDIR /chatsapp

VOLUME /sessions 
EXPOSE 3000 
CMD node --experimental-modules ./app

