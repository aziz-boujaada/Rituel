import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import SplashGate from './components/SplashGate';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SplashGate>
      <App />
    </SplashGate>
  </StrictMode>,
);
