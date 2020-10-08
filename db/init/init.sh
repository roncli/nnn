# /bin/sh

mongo --eval "const WEB_NNN_PASSWORD = '$(cat $WEB_NNN_PASSWORD_FILE)';" -u "$(cat $MONGO_INITDB_ROOT_USERNAME_FILE)" -p "$(cat $MONGO_INITDB_ROOT_PASSWORD_FILE)" 127.0.0.1:27017 /var/mongo/init.js
mongo 127.0.0.1:27017 /var/mongo/migrations/index.js
touch /data/db/initialized
