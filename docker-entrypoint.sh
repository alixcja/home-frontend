#!/bin/sh
set -e  # stop on any error

# Loop through JS files, if they exist
for file in /app/dist/assets/*.js; do
  [ -f "$file" ] || continue  # skip if no files
  # Loop over env vars starting with VITE_
  for var in $(env | grep ^VITE_ | cut -d= -f1); do
    value=$(printenv "$var")
    [ -n "$value" ] || continue
    # Replace placeholder with actual value
    sed -i "s|$var|$value|g" "$file"
  done
done

# Start HTTP server
exec http-server dist -p 8080 -a 0.0.0.0
