import ReactGA from 'react-ga4';

const GA_ID = import.meta.env.VITE_GA_ID;

export const initGA = () => {
  if (GA_ID) {
    ReactGA.initialize(GA_ID);
    console.log('Google Analytics initialized with ID:', GA_ID);
  } else {
    console.warn('Google Analytics ID not found in environment variables.');
  }
};

export const logPageView = () => {
  if (GA_ID) {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
  }
};

export const logEvent = (category: string, action: string, label?: string) => {
  if (GA_ID) {
    ReactGA.event({
      category,
      action,
      label,
    });
  }
};
