#!/bin/sh

# Validation.
if [ ! $APPINSIGHTS_INSTRUMENTATIONKEY ];
then
    echo "Warning: Application Insights is not setup.  Application will log to console."
fi

# Run app.
APPINSIGHTS_INSTRUMENTATIONKEY=$(cat $APPINSIGHTS_INSTRUMENTATIONKEY) DISCORD_TOKEN=$(cat $DISCORD_TOKEN_FILE) REDIS_PASSWORD=$(cat $REDIS_PASSWORD_FILE) WEB_NNN_PASSWORD=$(cat $WEB_NNN_PASSWORD_FILE) node index
