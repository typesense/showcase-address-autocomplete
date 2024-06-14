# Address autocomplete demo - powered by Typesense

This demo shows you how to build an Address autocomplete experience, similar to what you see commonly on address form fields, using Typesense, which is an open source alternative to Algolia.

This is a good alternative to Algolia Places (which was sunset) and also an alternative to Google Maps API (which tends be very expensive).

The dataset is from [OpenAddresses](https://www.kaggle.com/datasets/openaddresses/openaddresses-us-northeast).

## Get started

To run this project locally:

Start the typesense server

```shell
docker compose up
```

Index data into typesense

```shell
export TYPESENSE_API_KEY='xyz'
export TYPESENSE_URL='http://localhost:8108'

curl "${TYPESENSE_URL}/debug" \
       -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}"


curl "${TYPESENSE_URL}/collections" \
       -X POST \
       -H "Content-Type: application/json" \
       -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
       -d '{
         "name": "addresses_boston",
         "fields": [
           {"name": "postcode", "type": "string" },
           {"name": "address", "type": "string" }
         ]
       }'

curl "${TYPESENSE_URL}/collections/addresses_boston/documents/import?action=create" \
        -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
        -X POST \
        -T ./data/boston-addresses.jsonl
```

Open the `index.html` file in the root of this repo in a web browser.
