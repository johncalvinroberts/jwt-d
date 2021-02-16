import hydrate from 'preact-iso/hydrate';
import { useState } from 'preact/hooks';
import { LocationProvider } from 'preact-iso/router';
import { ErrorBoundary } from 'preact-iso/lazy';

export function App() {
  const [token, setToken] = useState('');
  const [decoded, setDecoded] = useState('');

  const handleInput = (e) => {
    const { value } = e.target;
    setToken(value);
    let nextDecoded;

    if (value) {
      const [, encoded] = value.split('.');
      try {
        nextDecoded = window.atob(encoded);
      } catch (error) {
        nextDecoded = '';
      }
    } else {
      nextDecoded = '';
    }

    setDecoded(nextDecoded);
  };

  return (
    <LocationProvider>
      <div className="app">
        <ErrorBoundary>
          <main>
            <div className="left">
              <textarea onInput={handleInput} value={token} />
            </div>
            <div className="right">{decoded}</div>
          </main>
        </ErrorBoundary>
      </div>
    </LocationProvider>
  );
}

hydrate(<App />);

export async function prerender(data) {
  const { default: prerender } = await import('preact-iso/prerender');
  return await prerender(<App {...data} />);
}
