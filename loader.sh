#!/bin/bash

cd /root/graphql_monitor

# TODO: use pm2
node index &

while true
do
    sleep 100
done
