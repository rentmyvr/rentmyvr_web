import PropTypes from 'prop-types';
import { useState } from 'react';
// import { useEffect, useState } from 'react';

// material-ui

import {
  Chip,
  Dialog,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

// project import
import useUser from 'hooks/useUser';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import LinearWithLabel from 'components/@extended/Progress/LinearWithLabel';
import ProfileAdd from 'sections/user/ProfileAdd';

// assets
import { AimOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

// ==============================|| ACCOUNT PROFILE - BASIC ||============================== //

const ProfileDetail = ({ is_part, profile }) => {
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const matchDownXS = useMediaQuery((theme) => theme.breakpoints.down('xs'));
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const matchDownLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const matchDownXL = useMediaQuery((theme) => theme.breakpoints.down('xl'));
  console.log(`${window.innerWidth} {xs: ${matchDownXS}, sm: ${matchDownSM}, md: ${matchDownMD}, lg: ${matchDownLG}, xl: ${matchDownXL}}`);

  // const [data, setData] = useState({});
  const user = useUser();
  const [openProfile, setOpenProfile] = useState(false);

  const handleAdd = (openProfile = false) => {
    openProfile = Boolean(openProfile);
    setOpenProfile(openProfile);
    // if (profile && !openProfile) setProfile(null);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5} md={4} lg={3} display={is_part ? '' : 'None'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="flex-end">
                    <Chip label="Pro" size="small" color="primary" />
                  </Stack>
                  <Stack spacing={2.5} alignItems="center">
                    <Avatar alt="Avatar 1" size="xl" src="/assets/images/users/default.png" />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">Anshan H.</Typography>
                      <Typography color="secondary">Project Manager</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="space-around" alignItems="center">
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">86</Typography>
                      <Typography color="secondary">Post</Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">40</Typography>
                      <Typography color="secondary">Project</Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">4.5K</Typography>
                      <Typography color="secondary">Members</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <List component="nav" aria-label="main mailbox folders" sx={{ py: 0, '& .MuiListItem-root': { p: 0, py: 1 } }}>
                    <ListItem>
                      <ListItemIcon>
                        <MailOutlined />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">anshan.dh81@gmail.com</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneOutlined />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">(+1-876) 8654 239 581</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AimOutlined />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">New York</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <EnvironmentOutlined />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Link align="right" href="https://google.com" target="_blank">
                          https://anshan.dh.url
                        </Link>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="Skills">
              <Grid container spacing={1.25}>
                <Grid item xs={6}>
                  <Typography color="secondary">Junior</Typography>
                </Grid>
                <Grid item xs={6}>
                  <LinearWithLabel value={30} />
                </Grid>
                <Grid item xs={6}>
                  <Typography color="secondary">UX Reseacher</Typography>
                </Grid>
                <Grid item xs={6}>
                  <LinearWithLabel value={80} />
                </Grid>
                <Grid item xs={6}>
                  <Typography color="secondary">Wordpress</Typography>
                </Grid>
                <Grid item xs={6}>
                  <LinearWithLabel value={90} />
                </Grid>
                <Grid item xs={6}>
                  <Typography color="secondary">HTML</Typography>
                </Grid>
                <Grid item xs={6}>
                  <LinearWithLabel value={30} />
                </Grid>
                <Grid item xs={6}>
                  <Typography color="secondary">Graphic Design</Typography>
                </Grid>
                <Grid item xs={6}>
                  <LinearWithLabel value={95} />
                </Grid>
                <Grid item xs={6}>
                  <Typography color="secondary">Code Style</Typography>
                </Grid>
                <Grid item xs={6}>
                  <LinearWithLabel value={75} />
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={is_part ? 7 : 12} md={is_part ? 8 : 12} lg={is_part ? 9 : 12}>
        <Grid container spacing={3}>
          <Grid item xs={12} display="none">
            <MainCard title={`About ${user?.id === profile?.user?.id ? 'Me' : profile?.user?.name}`}>
              <Typography color="secondary">
                Hello, I’m Anshan Handgun Creative Graphic Designer & User Experience Designer based in Website, I create digital Products a
                more Beautiful and usable place. Morbid accusant ipsum. Nam nec tellus at.
              </Typography>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="Personal Details">
              <List sx={{ py: 0 }}>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Full Name</Typography>
                        <Typography>{profile?.user?.name}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">User Type</Typography>
                        <Typography>{profile?.user?.position.toTitleCase()}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Phone</Typography>
                        <Typography>
                          (+1) <NumberFormat value={profile?.user?.phone} displayType="text" type="text" format="#### ### ###" />
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Country</Typography>
                        <Typography>{profile?.address?.country || '-'}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Email</Typography>
                        <Typography>{profile?.user?.email}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Zip Code</Typography>
                        <Typography>{profile?.address?.zip_code || '-'}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Address</Typography>
                    <Typography>
                      {`${profile?.address?.street || ''} ${profile?.address?.city || ''}, ${profile?.address?.state || ''} ${
                        profile?.address?.zip_code || ''
                      } ${profile?.address?.country || ''}`}
                    </Typography>
                  </Stack>
                </ListItem>
              </List>
            </MainCard>
          </Grid>

          <Grid item xs={12}>
            <MainCard title="Any Other Details or I Remove">
              <List sx={{ py: 0 }}>
                <ListItem divider>
                  <Grid container spacing={matchDownMD ? 0.5 : 3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Title</Typography>
                        <Typography>Detail</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Title</Typography>
                        <Typography>-</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>

      {/* Add Profile Dialog */}
      <Dialog
        fullScreen={matchDownSM}
        maxWidth="md"
        fullWidth
        onClose={handleAdd}
        open={openProfile}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        {openProfile && <ProfileAdd profile={profile} onCancel={handleAdd} />}
      </Dialog>
    </Grid>
  );
};

ProfileDetail.propTypes = {
  is_part: PropTypes.bool,
  profile: PropTypes.object
};

export default ProfileDetail;
