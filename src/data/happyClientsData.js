/*
  Clients shown in the home "Happy Clients" section.
  PLACEHOLDERS: replace the 12 entries below with your real clients (or load them from the CMS "clients"
  collection, filtered by showOnHome and ordered by sortOrder). The field names match that collection.

    name       : company name. Shown as text until the logo file exists, and used as the logo's alt text
    logo       : image path, e.g. '/assets/clients/acme.png'  (files go in public/assets/clients/). null = name as text
                 It is shown on a WHITE tile, so do not use white or very light logos.
    quote      : short customer comment, optional. When a client has one, it appears under the logo wall
                 while that client's logo is highlighted. '' = no quote
    personName / personRole : who said it, optional
*/
export const CLIENTS_PATH = '/clients';

const client = (n) => ({
  name: `Client Name ${n}`,
  logo: null,
  quote: '',
  personName: '',
  personRole: '',
});

export const CLIENTS_HOME = Array.from({ length: 12 }, (_, i) => client(i + 1));
