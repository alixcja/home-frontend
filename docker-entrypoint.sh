#!/bin/sh

# Loop through all JS files in the dist assets folder
for file in /app/dist/assets/*.js; do
  # For each environment variable starting with VITE_
  for var in $(env | grep ^VITE_ | cut -d= -f1); do
    # Replace placeholder in the JS file with the actual value
    sed -i "s|$var|${!var}|g" "$file"
  done
done

# Start the HTTP server
exec http-server dist -p 8080 -a 0.0.0.0
