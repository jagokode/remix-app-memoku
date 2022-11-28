import { Form, useActionData, useTransition } from '@remix-run/react';
import styles from './NewMemo.css';

const NewMemo = () => {
  const navigate = useTransition();
  // get validation error data
  const data = useActionData();

  const isSubmitting = navigate.state === 'submitting';
  return (
    <Form method="post" id="note-form">
      {/* display validation error*/}
      {data?.message && <p>{data.message}</p>}
      <p>
        <label htmlFor="title">Judul</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Isi</label>
        <input type="text" id="content" name="content" rows="5" required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Tammbah...' : 'Tambah Memo'}
        </button>
      </div>
    </Form>
  );
};

export default NewMemo;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
