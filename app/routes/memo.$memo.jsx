import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getStoredMemos } from '~/data/memos';
import styles from '~/styles/memo-details.css';

export default function MemoDetail() {
  const memo = useLoaderData();
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/memo">Back to Memos</Link>
        </nav>
        <h1>{memo.title}</h1>
      </header>
      <p id="note-details-content">{memo.content}</p>
    </main>
  );
}

// load data backend
export async function loader(data) {
  const memos = await getStoredMemos();
  const id = data.params.memo;
  const memo = memos.find((m) => m.id === id);

  if (!memo) {
    throw json({ message: 'Tidak menemukan memo ' + id }, { status: 404 });
  }

  return memo;
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

// meta data
export function meta({ data }) {
  return {
    title: 'Memoku - ' + data.title,
    description: 'Atur memo anda dengan mudah',
  };
}
