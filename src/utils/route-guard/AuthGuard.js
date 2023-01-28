import PropTypes from 'prop-types';
import { useEffect } from 'react';

// next
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

// types
import Loader from 'components/Loader';

import { ACCOUNT_URL } from 'config';

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/auth/protected');
      const json = await res.json();
      if (!json.protected) {
        router.push(ACCOUNT_URL.LOGIN);
      }
    };
    fetchData();

    // eslint-disable-next-line
  }, [session]);

  if (status === 'loading' || !session?.user) return <Loader />;

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;
