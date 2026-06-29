import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://rituelagadir.ma';
const SITE_NAME = 'Rituel Agadir';
const OG_IMAGE = 'https://res.cloudinary.com/dqhuqkeq2/image/upload/v1777018368/PAGE_DE_GARDE_zeqcbp.jpg';

const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Rituel Restaurant & Lounge',
  description:
    'Restaurant gastronomique et lounge chic au cœur d\'Agadir. Cuisine italienne & internationale, cocktails et ambiance raffinée.',
  url: SITE_URL,
  telephone: '+212672374080',
  image: OG_IMAGE,
  logo: `${SITE_URL}/logoR.png`,
  priceRange: '$$',
  servesCuisine: ['Italienne', 'Internationale', 'Méditerranéenne'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Agadir',
    addressCountry: 'MA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 30.4225401,
    longitude: -9.6004168,
  },
  hasMap:
    'https://www.google.com/maps/place/Rituel/@30.4225445,-9.600412,1115m/data=!3m1!1e3!4m6!3m5!1s0xdb3b6f274e377fd:0x849e8616b315b541',
  sameAs: [
    'https://www.instagram.com/rituelagadir/',
    'https://web.facebook.com/rituelagadir/',
    'https://www.tripadvisor.fr/Restaurant_Review-g293731-d8870764-Reviews-Rituels-Agadir_Souss_Massa.html',
  ],
};

export default function SEO() {
  const title = `${SITE_NAME} — Restaurant & Lounge Premium à Agadir`;
  const description =
    'Rituel Agadir — Restaurant gastronomique et lounge chic au cœur d\'Agadir. Cuisine italienne & internationale, cocktails, ambiance raffinée. Réservez maintenant au +212 6 72 37 40 80.';

  return (
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${SITE_URL}/`} />

      {/* Open Graph */}
      <meta property="og:type" content="restaurant" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={`${SITE_URL}/`} />
      <meta property="og:title" content={`${SITE_NAME} — Restaurant & Lounge Premium`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:alt" content={`${SITE_NAME} — Restaurant & Lounge Premium`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="fr_MA" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${SITE_NAME} — Restaurant & Lounge Premium`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:image:alt" content={`${SITE_NAME} — Restaurant & Lounge Premium`} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(restaurantSchema)}
      </script>
    </Helmet>
  );
}
