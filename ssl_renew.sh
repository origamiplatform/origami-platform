#!/bin/bash

/usr/local/bin/docker-compose -f /root/origami-platform/docker-compose.yml run certbot renew --dry-run \
&& /usr/local/bin/docker-compose -f /root/origami-platform/docker-compose.yml kill -s SIGHUP webserver