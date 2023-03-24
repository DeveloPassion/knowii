/**
 * Utils
 */
export const IS_BROWSER = typeof window !== 'undefined';
export const IS_SERVER = typeof window === 'undefined';
export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_TEST = process.env.NODE_ENV === 'test';

export const BASE_APP_FOLDER = 'apps/knowii';

/**
 * i18n
 */
export const I18N_TRANSLATIONS_ACCOUNT = 'account';
export const I18N_TRANSLATIONS_APP = 'app';
export const I18N_TRANSLATIONS_AUTH = 'auth';
export const I18N_TRANSLATIONS_BLOG = 'blog';
export const I18N_TRANSLATIONS_COMMON = 'common';
export const I18N_TRANSLATIONS_HOME = 'home';

/**
 * Meta
 */
export const BUILD_TIME = new Date().toISOString();
export const BUILD_TIMESTAMP = Date.now();

/**
 * Author microdata
 * Reference: https://schema.org/Person
 */
export const SITE_AUTHOR = {
  '@context': 'https://schema.org/',
  '@type': 'Person',
  name: 'Sébastien Dubois',
  familyName: 'Dubois',
  givenName: 'Sébastien',
  image: 'https://www.dsebastien.net/content/images/2022/12/Seb-2022.jpg',
  url: 'https://dsebastien.net',
  sameAs: [
    'https://twitter.com/dSebastien',
    'https://youtube.com/@dSebastien',
    'https://www.linkedin.com/in/sebastiend/',
    'https://github.com/dsebastien',
    'https://dsebastien.medium.com/',
    'https://dev.to/dsebastien',
    'https://www.twitch.tv/dsebastien',
    'https://stackoverflow.com/users/226630/dsebastien',
    'https://www.facebook.com/trankill',
    'https://dsebastien.hashnode.dev/',
    'https://www.reddit.com/user/lechtitseb/',
  ],
  jobTitle: 'Founder',
  worksFor: {
    '@type': 'Organization',
    name: 'DeveloPassion',
    url: 'https://developassion.be',
  },
};
