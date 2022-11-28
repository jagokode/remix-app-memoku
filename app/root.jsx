const {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useCatch,
} = require('@remix-run/react');

import MainNav from './components/MainNav';
import styles from './styles/main.css';

export const meta = () => ({
  charset: 'utf-8',
  title: 'Remix App - Memoku',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNav />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// Route Error handling
export function CatchBoundary() {
  const resp = useCatch();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>{resp.statusText}</title>
      </head>
      <body>
        <header>
          <MainNav />
        </header>
        <main className="error">
          <h1>{resp.statusText}</h1>
          <p>{resp.data?.message || 'Ada kesalahan!'}</p>
          <p>
            Back to <Link to="/">Home</Link>
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// Error handling
export function ErrorBoundary({ error }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>Ada kesalahan!</title>
      </head>
      <body>
        <header>
          <MainNav />
        </header>
        <main className="error">
          <h1>Ada kesalahan!</h1>
          <p>{error.message}</p>
          <p>
            Back to <Link to="/">Home</Link>
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
