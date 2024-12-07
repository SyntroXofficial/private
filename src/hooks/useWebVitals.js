import { useEffect } from 'react';

export const useWebVitals = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const reportWebVitals = (metric) => {
        console.log(metric);
      };

      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(reportWebVitals);
        getFID(reportWebVitals);
        getFCP(reportWebVitals);
        getLCP(reportWebVitals);
        getTTFB(reportWebVitals);
      });
    }
  }, []);
};