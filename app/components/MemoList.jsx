import { Link } from '@remix-run/react';
import styles from './MemoList.css';

const options = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

export default function MemoList({ memos }) {
  return (
    <ul id="note-list">
      {memos.map((memo, index) => (
        <li className="note" key={memo.id}>
          <Link to={memo.id}>
            <article>
              <header>
                <ul className="note-meta">
                  <li>#{index + 1}</li>
                  <li>
                    <time dateTime={memo.id}>
                      {new Date(memo.id).toLocaleDateString(undefined, options)}
                    </time>
                  </li>
                </ul>
                <h2>{memo.title}</h2>
              </header>
              <p>{memo.content}</p>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
