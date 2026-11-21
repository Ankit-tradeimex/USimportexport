import { AU, CN, DE, IN, KR, MX, US, VN } from 'country-flag-icons/react/3x2';

// country name -> flag component. Add more here when the real data has other countries (no flag is shown for the rest)
const FLAG_BY_NAME = {
  'UNITED STATES': US,
  CHINA: CN,
  INDIA: IN,
  GERMANY: DE,
  'SOUTH KOREA': KR,
  VIETNAM: VN,
  MEXICO: MX,
  AUSTRALIA: AU,
};

export const flagFor = (name) => FLAG_BY_NAME[String(name || '').toUpperCase()] || null;
