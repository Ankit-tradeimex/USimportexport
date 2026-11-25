/*
  Publications that featured USImportdata ("As Featured").

    slug        : detail page is /as-featured/<slug>   (only "qz" is confirmed, check the others)
    name        : shown on cards, and as the logo text until the logo file exists
    logo        : image path, e.g. '/assets/featured/qz.png'  (files go in public/assets/featured/). null = name as text
    title       : heading of the detail page (falls back to name)
    summary     : text on the list card
    description : intro text on the detail page (falls back to summary)
    url         : link to the original article  ('' = no "Read the original article" button, no address in the frame)
    image       : screenshot of the page where it was published, e.g. '/assets/featured/qz-article.png'
                  (tall full-page screenshots are fine, the frame scrolls). null = "Screenshot coming soon"
    metaTitle   : <title> of the detail page (falls back to "<name> Coverage")

  Empty text ('') is simply not shown. Fill it in when you have the content.
*/
const f = (slug, name, extra = {}) => ({
  slug,
  name,
  logo: null,
  title: name,
  summary: '',
  description: '',
  url: '',
  image: null,
  metaTitle: '',
  ...extra,
});

export const FEATURED = [
  f('the-new-york-times', 'The New York Times'),
  f('the-hill', 'The Hill'),
  f('thestreet', 'TheStreet'),
  f('tasting-table', 'Tasting Table'),
  f('rbc', 'RBC'),
  f('houston-chronicle', 'Houston Chronicle'),
  f('fox-business', 'Fox Business'),
  f('the-tennessean', 'The Tennessean'),
  f('qz', 'Quartz', {
    title: 'Quartz (qz.com)',
    summary:
      'Quartz highlighted insights into wine imports from the USImportdata blog report, referencing the top seven most imported U.S. wines, showcasing how product-level HS code analysis supports consumer and tariff reporting.',
    description:
      'Quartz highlighted insights into wine imports from the USImportdata blog report, referencing the top seven most imported U.S. wines, showcasing how product-level HS code analysis supports consumer and tariff reporting.',
    metaTitle: 'Quartz Highlights USImportData',
  }),
  f('forbes', 'Forbes', {
    summary:
      'US Trade intelligence from USImportData was cited in a Forbes analysis discussing the US–Japan trade relationship and its economic implications. The article referenced the U.S. trade deficit of $69.4 billion, highlighting the importance of verified trade statistics in evaluating global trade imbalances and tariff impacts.',
  }),
  f('investopedia', 'Investopedia', {
    summary:
      'Investopedia referenced trade shipment insights of USImportdata, while reporting on steel and aluminum tariffs, citing figures accounting for nearly 40% of all of the metal coming into the U.S. The data-backed analysis emphasized the role of reliable import statistics in understanding sector-specific tariff exposure.',
  }),
];

export const FEATURED_LIST_PATH = '/as-featured';
export const featuredPath = (slug) => `${FEATURED_LIST_PATH}/${slug}`;
