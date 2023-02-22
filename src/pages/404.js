import PropTypes from 'prop-types';

// next
// import Image from 'next/image';
import { useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Card, CardContent, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';

// third party
import * as Yup from 'yup';
import { useTimer } from 'react-timer-hook';
import { useFormik, Form, FormikProvider } from 'formik';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import MainCard from 'components/MainCard';
import { openSnackbar } from 'store/reducers/snackbar';
import { CORE_EP, fetcher, successProcessor, errorProcessor } from 'config';

// assets
// const coming = '/assets/images/maintenance/coming-soon-1.png';
const bg_image_md = '/assets/images/coming-soon-bg.png';
const bg_image_sm = '/assets/images/coming-soon-bg-sm.png';
// const bg_image = '/assets/images/rent-my-vr.png';

// ==============================|| COMING SOON - TIMER ||============================== //

const TimerBox = ({ count, label }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <MainCard content={false} sx={{ width: { xs: 60, sm: 80 } }}>
      <Stack justifyContent="center" alignItems="center">
        <Box sx={{ py: 1.75 }}>
          <Typography variant={matchDownSM ? 'h4' : 'h2'}>{count}</Typography>
        </Box>
        <Box sx={{ p: 0.5, bgcolor: 'secondary.lighter', width: '100%' }}>
          <Typography align="center" variant="subtitle2">
            {label}
          </Typography>
        </Box>
      </Stack>
    </MainCard>
  );
};

TimerBox.propTypes = {
  count: PropTypes.number,
  label: PropTypes.string
};

// ==============================|| COMING SOON - MAIN ||============================== //

function ComingSoon() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const time = new Date(Date.parse('03/01/2023'));
  time.setSeconds(time.getSeconds());

  const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp: time });

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object().shape({
      email: Yup.string().max(128).email('This is not a valid email').required('Tell us the email to contact you with')
    }),
    onSubmit: (values, { setErrors, setSubmitting, resetForm }) => {
      console.log('========== : : ===========');
      console.log(values);

      // eslint-disable-next-line
      fetcher(CORE_EP.EMAIL_COLLECT, 'post', null, null, values, (res) => {
          successProcessor(
            'Thanks for your interest... You will be among the first to be notified as soon as we are live!!!',
            dispatch,
            openSnackbar
          );
          setSubmitting(false);
          resetForm();
        },
        (err) => {
          errorProcessor(err, setErrors, dispatch, openSnackbar);
          setSubmitting(false);
        }
      );
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Page
      title="Rent My VR: Coming Soon"
      sx={{
        backgroundImage: `url(${matchDownSM ? bg_image_sm : bg_image_md})`,
        // backgroundPositionX: '11%',
        backgroundPositionY: matchDownSM ? '0px' : '-100px',
        backgroundSize: 'cover'
      }}
    >
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '100vh', py: 2 }}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} md={2}></Grid>
                <Grid item xs={12} md={8} pt={matchDownSM ? 5 : 20} mt={10} pb={3}>
                  <Card sx={{ backgroundColor: 'transparent' }}>
                    <CardContent>
                      <Typography variant="h5" align="center">
                        Tired of searching multiple sites to find all of the available lodging options for your next vacation? Rent My VR
                        has the solution! With Rent My VR, you can view a property’s website, online profiles, social media, and reviews,
                        all in one place. Contact the host and inquire about direct booking options. Search for companies that specialize in
                        managing Short Term/ Vacation Rentals. Rent My VR is the first all inclusive online directory to showcase vacation
                        rentals for hosts and guests. Rent My VR - Bringing vacation rental sites together to make your search a little
                        better.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} md={2}></Grid>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1} justifyContent="center" alignItems="center" sx={{ mt: 0 }}>
                <Typography variant={matchDownSM ? 'h2' : 'h1'} align="center">
                  Rent My VR is Coming
                </Typography>
                {/* <Typography color="textSecondary" align="center">
                  Something new is on its way
                </Typography> */}
              </Stack>
            </Grid>
            <Grid item xs={12} sx={{ width: { xs: '90%', md: '40%' } }}>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 1, sm: 2 }}>
                <TimerBox count={days} label="day" />
                <Typography variant="h1"> : </Typography>
                <TimerBox count={hours} label="hour" />
                <Typography variant="h1"> : </Typography>
                <TimerBox count={minutes} label="min" />
                <Typography variant="h1"> : </Typography>
                <TimerBox count={seconds} label="sec" />
              </Stack>
            </Grid>
            <Grid item xs={12} sx={{ width: { width: 380, md: '40%', lg: '30%' } }}>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Typography color="subtitle1" align="center">
                  Get Notified when we Launch
                </Typography>
                <Stack direction="row" spacing={1}>
                  <TextField
                    fullWidth
                    id="email-address"
                    placeholder="Email Address"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ width: '50%' }}>
                    Notify Me
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Page>
  );
}

ComingSoon.getLayout = function getLayout(page) {
  return <Layout variant="blank">{page}</Layout>;
};

export default ComingSoon;
