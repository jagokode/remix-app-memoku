import { json, redirect, Response } from '@remix-run/node';
import NewMemo, { links as stylesNewMemo } from '~/components/NewMemo';
import MemoList, { links as sytlesMemoList } from '~/components/MemoList';
import { getStoredMemos, storedMemos } from '~/data/memos';
import { useLoaderData, Link, useCatch } from '@remix-run/react';

export default function Memo() {
  const memos = useLoaderData();

  return (
    <main>
      <NewMemo />
      <MemoList memos={memos} />
    </main>
  );
}

// backend for get memos data
export async function loader() {
  const memos = await getStoredMemos();

  // check error
  if (!memos || memos.length === 0) {
    // throw new Response()
    throw json(
      { message: 'Tidak ada Memo' },
      { status: 404, statusText: 'Not Found' }
    );
  }
  // return new Response(JSON.stringify(memos), { headers: {'Content-Type': 'application/json'}})
  // return json(memos)

  // return raw data
  return memos;
}

// backend for save memo form
export async function action(data) {
  const formData = await data.request.formData();
  // const memoData = {
  //   title: formData.get('title'),
  //   content: formData.get('content')
  // }
  const memoData = Object.fromEntries(formData);

  // validation input
  if (memoData.title.trim().length < 4) {
    return { message: 'Judul minimal harus 4 karakter' };
  }

  const existingMemos = await getStoredMemos();
  memoData.id = new Date().toISOString();
  const updatedMemos = existingMemos.concat(memoData);
  await storedMemos(updatedMemos);
  // await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  return redirect('/memo');
}

// css
export function links() {
  return [...stylesNewMemo(), ...sytlesMemoList()];
}

// meta data
export function meta() {
  return {
    title: 'Memoku',
    description: 'Atur memo anda dengan mudah',
  };
}

// Error handling in route
export function CatchBoundary() {
  const resp = useCatch();
  const message = resp.data?.message || 'Data not found';

  return (
    <main>
      <NewMemo />
      <p className="info-message">{message}</p>
    </main>
  );
}

// Error handling in frontend
export function ErrorBoundary({ error }) {
  return (
    <main className="error">
      <h1>Ada kesalahan pada memo anda!</h1>
      {/* <p>{error.message}</p> */}
      <p>
        Back to <Link to="/">Home</Link>
      </p>
    </main>
  );
}
