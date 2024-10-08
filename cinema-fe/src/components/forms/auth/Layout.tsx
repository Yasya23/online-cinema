import styles from './forms.module.scss';
import classNames from 'classnames';
import Link from 'next/link';

import { routes } from '@/constants/routes';

interface Props {
  page?: string;
  children: React.ReactNode;
}

const Layout = ({ page = 'login', children }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.switchPage}>
        {page === 'login' ? (
          <>
            <div className={classNames(styles.button, styles.disabled)}>
              Login Page
            </div>
            <Link href={routes.register} className={styles.button}>
              To Register Page
            </Link>
          </>
        ) : (
          <>
            <Link href={routes.login} className={styles.button}>
              To Login Page
            </Link>
            <div className={classNames(styles.button, styles.disabled)}>
              Register Page
            </div>
          </>
        )}
      </div>
      {children}
    </div>
  );
};

export default Layout;
