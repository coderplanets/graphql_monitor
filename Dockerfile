FROM node:8.11

RUN mkdir /root/graphql_monitor

ADD index.js /root/graphql_monitor
ADD package.json /root/graphql_monitor
RUN cd /root/graphql_monitor && npm install --registry=https://registry.npm.taobao.org

ADD loader.sh /usr/local/bin/loader.sh
RUN chmod +x /usr/local/bin/loader.sh
CMD ["/usr/local/bin/loader.sh"]