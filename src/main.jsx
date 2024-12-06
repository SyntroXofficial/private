import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { useWebVitals } from './hooks/useWebVitals';

const Root = () => {
  useWebVitals();
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);