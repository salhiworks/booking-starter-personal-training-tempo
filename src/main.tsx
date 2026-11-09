import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Schibsted Grotesk (variable 400–900, with true italics for the leaning headline words).
import '@fontsource-variable/schibsted-grotesk/index.css';
import '@fontsource-variable/schibsted-grotesk/wght-italic.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/site.css';
import './styles/booking.css';
import { App } from './App';
import { engine } from './lib/engine';
import type { DemoEngine } from './demo/engine';

if (__BOOKING_DEMO__) void import('./demo/engine/DemoBar').then((m) => m.mountDemoBar(engine as DemoEngine, 'site'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
