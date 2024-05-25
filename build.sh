#!/bin/bash

set -ex
echo "Build starting..."

# Ensure environment variables are set
if [[ -z "$TYPESENSE_SEARCH_ONLY_API_KEY" || -z "$TYPESENSE_URL" ]]; then
  echo "Environment variables TYPESENSE_SEARCH_ONLY_API_KEY and TYPESENSE_URL must be set."
  exit 1
fi

# Define the js file to be modified
JS_FILE="index.js"

# Define the files to be copied, including the js file
FILES=("$JS_FILE" "index.css" "index.html")
DIST_DIR="dist"

# Create the dist directory if it doesn't exist
mkdir -p "$DIST_DIR"

# Copy files to the dist directory
for file in "${FILES[@]}"; do
  cp "$file" "$DIST_DIR"
done

echo "Files copied to $DIST_DIR"

# Replace apiKey and url in the copied index.js file
sed -i -e "s/apiKey: 'xyz'/apiKey: '$TYPESENSE_SEARCH_ONLY_API_KEY'/g" \
       -e "s|url: 'http://localhost:8108'|url: '$TYPESENSE_URL'|g" "$DIST_DIR/$JS_FILE"

echo "Replacements done in $DIST_DIR/$JS_FILE"
echo "Build done."