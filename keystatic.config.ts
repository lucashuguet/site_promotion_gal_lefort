import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'lucashuguet',
      name: 'site_promotion_gal_lefort'
    }
  },
  collections: {
    posts: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titre' } }),
        date: fields.date({ label: 'Date' }),
        author: fields.text({ label: 'Auteur' }),
        content: fields.markdoc({ label: 'Contenu' }),
      },
    }),
    promotion: collection({
      label: 'Promotion',
      slugField: 'title',
      path: 'src/content/promotion/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titre' } }),
        content: fields.markdoc({ label: 'Contenu' }),
      },
    }),
    traditions: collection({
      label: 'Traditions',
      slugField: 'title',
      path: 'src/content/traditions/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titre' } }),
        content: fields.markdoc({ label: 'Contenu' }),
      },
    }),
  },
});
