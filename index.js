const { autocomplete } = window['@algolia/autocomplete-js'];

let typesenseClient = new Typesense.Client({
  apiKey: 'xyz',
  nodes: [
    {
      url: 'http://localhost:8108',
    },
  ],
  connectionTimeoutSeconds: 2,
});

autocomplete({
  container: '#autocomplete',
  placeholder: 'Type in an address in Boston city. Eg: 1 North Square',
  async getSources({ query }) {
    const results = await typesenseClient
      .collections('addresses')
      .documents()
      .search({
        q: query,
        query_by: 'address,postcode',
        highlight_full_fields: 'address,postcode',
        highlight_start_tag: '<b>',
        highlight_end_tag: '</b>',
        per_page: 5,
      });

    return [
      {
        sourceId: 'predictions',
        getItems() {
          return results.hits;
        },
        getItemInputValue({
          item: {
            document: { address, postcode },
          },
        }) {
          return `${address} ${postcode}`;
        },
        templates: {
          item({ item, html }) {
            // html is from the `htm` package. Docs: https://github.com/developit/htm
            const address =
              item.highlights.find((h) => h.field === 'address')?.value ||
              item.document['address'];
            const postcode =
              item.highlights.find((h) => h.field === 'postcode')?.value ||
              item.document['postcode'];
            // Get the highlighted HTML fragment from Typesense results
            const html_fragment = html`${address + ' ' + postcode}`;

            // Send the html_fragment to `html` tagged template
            // Reference: https://github.com/developit/htm/issues/226#issuecomment-1205526098
            return html`<div
              dangerouslySetInnerHTML=${{ __html: html_fragment }}
            ></div>`;
          },
          noResults() {
            return 'No results found.';
          },
        },
      },
    ];
  },
});
