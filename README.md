# Address autocomplete demo - powered by Typesense

This demo uses Algolia's [autocomplete-js](https://github.com/algolia/autocomplete) library and [Typesense](https://typesense.org). The dataset is from [OpenAddresses](https://www.kaggle.com/datasets/openaddresses/openaddresses-us-northeast).

**NOTE:** `autocomplete.js` is a standalone UI library and is unrelated to the `Autocomplete` widget in the Instantsearch.js UI library. [Read more](https://github.com/typesense/typesense-instantsearch-adapter/issues/88#issuecomment-1021597634).

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
