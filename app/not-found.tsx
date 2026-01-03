import Link from 'next/link';
import css from './Home.module.css';

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page Not Found</h1>
      <p className={css.description}>Sorry, the page you&#39;re looking for doesn&#39;t exist.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;



