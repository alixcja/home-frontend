#!/bin/sh
set -e

# Der Pfad muss dort sein, wo dein Webserver die Dateien ausliefert!
# Wenn du 'http-server dist' nutzt, ist es: dist/config.js
# Wenn du Nginx nutzt, ist es meist: /usr/share/nginx/html/config.js
CONFIG_FILE="/app/dist/config.js"

echo "Writing runtime configuration to $CONFIG_FILE..."

echo "window.APP_CONFIG = {" > $CONFIG_FILE
echo "  VITE_BACKEND_URL: '$VITE_BACKEND_URL'," >> $CONFIG_FILE
echo "  VITE_KEYCLOAK_URL: '$VITE_KEYCLOAK_URL'," >> $CONFIG_FILE
echo "  VITE_KEYCLOAK_CLIENT_ID: '$VITE_KEYCLOAK_CLIENT_ID'," >> $CONFIG_FILE
echo "  VITE_KEYCLOAK_REALM: '$VITE_KEYCLOAK_REALM'" >> $CONFIG_FILE
echo "};" >> $CONFIG_FILE

echo "Configuration created:"
cat $CONFIG_FILE

# Start HTTP server (exec sorgt dafür, dass Signale wie SIGTERM korrekt ankommen)
exec http-server dist -p 8080 -a 0.0.0.0