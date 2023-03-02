import PropTypes from 'prop-types';

// next
import Image from 'next/image';
import { useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';

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
const coming = '/assets/images/maintenance/coming-soon-1.png';

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
    <Page title="Rent MyVR: Coming Soon">
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '100vh', py: 2 }}>
            <Grid item xs={12}>
              <Image src={coming} alt="mantis" layout="fixed" width={matchDownSM ? 360 : 540} height={matchDownSM ? 310 : 420} />
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1} justifyContent="center" alignItems="center" sx={{ mt: 0 }}>
                <Typography variant="h1" align="center">
                  Rent MyVR is Coming Soon
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
                <Typography color="textSecondary" align="center">
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
