FROM ubuntu:18.04

RUN apt-get update 

ENV HOME /root
WORKDIR /root

COPY . . 

RUN apt-get update --fix-missing
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN mv ./node_modules ./node_modules.tmp \
  && mv ./node_modules.tmp ./node_modules \
  && npm install 
RUN echo '{ "allow_root": true  }' > /root/.bowerrc



# RUN npm install

EXPOSE 8000

CMD ["node", "server.js"]