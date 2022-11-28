import { Link } from '@remix-run/react';
import stylesHome from '~/styles/home.css';

export default function Index() {
  return (
    <main id="content">
      <h1>Cara mudah membuat memo harian anda</h1>
      <p>Aplikasi memo kami adalah solusinya!</p>
      <p id="cta">
        <Link to="/memo">Coba sekarang!</Link>
      </p>
    </main>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: stylesHome }];
}
