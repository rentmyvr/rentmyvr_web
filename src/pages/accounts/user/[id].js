import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// next
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

// material-ui
import { Grid } from '@mui/material';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import { openSnackbar } from 'store/reducers/snackbar';
import ProfileCard from 'sections/user/ProfileCard';
import ProfileTabs from 'sections/user/ProfileTabs';
import ProfileDetail from 'sections/user/ProfileDetail';
// import TabPersonal from 'sections/user/TabPersonal';
import TabPayment from 'sections/user/TabPayment';
import TabPassword from 'sections/user/TabPassword';
import TabSettings from 'sections/user/TabSettings';
// import useUser from 'hooks/useUser';

import { CORE_EP, fetcher, errorProcessor } from 'config';
// ==============================|| PROFILE - USER ||============================== //

const UserProfile = () => {
  const { data: session } = useSession();
  const inputRef = useRef(null);
  const [profile, setProfile] = useState(null);
  const focusInput = () => {
    console.log('Edit Profile***');
    inputRef.current?.focus();
  };

  // console.log('User: ', user);
  // console.log('Session: ', session);

  const dispatch = useDispatch();
  const router = useRouter();
  const { id, tab = 'personal' } = router.query;
  const [currentTab, setCurrentTab] = useState(tab);
  // console.log('Tab: ', tab);
  useEffect(() => {
    // eslint-disable-next-line
    fetcher(CORE_EP.PROFILE_DETAIL.format(id), 'get', session, null, null, (res) => {
        console.log(res.data);
        setProfile(res.data);
      },
      (err) => {
        errorProcessor(err, () => {}, dispatch, openSnackbar);
      }
    );
    // eslint-disable-next-line
  }, []);

  return (
    <Page title="User Profile">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ProfileCard focusInput={focusInput} profile={profile} />
        </Grid>

        <Grid item xs={12} md={3}>
          <ProfileTabs focusInput={focusInput} profile={profile} tab={currentTab} setTab={setCurrentTab} />
        </Grid>

        <Grid item xs={12} md={9}>
          {currentTab === 'personal' && <ProfileDetail is_part={false} profile={profile} />}
          {currentTab === 'payment' && <TabPayment />}
          {currentTab === 'password' && <TabPassword uid={profile?.user?.id} session={session} />}
          {currentTab === 'settings' && <TabSettings />}
        </Grid>
      </Grid>
    </Page>
  );
};

UserProfile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default UserProfile;
