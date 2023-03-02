import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';

// next
// import Image from 'next/image';
import NextLink from 'next/link';
// import { signIn } from 'next-auth/react';

// material-ui
import {
  Box,
  // useMediaQuery,
  Button,
  // Divider,
  FormHelperText,
  FormControl,
  Grid,
  Link,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { openSnackbar } from 'store/reducers/snackbar';

// project import
// import FirebaseSocial from './FirebaseSocial';
import { CORE_EP, ACCOUNT_URL, fetcher, errorProcessor, successProcessor } from 'config';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// ============================|| AWS CONNITO - LOGIN ||============================ //

const AuthRegister = ({ csrfToken }) => {
  // const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const [level, setLevel] = React.useState();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  React.useEffect(() => {
    changePassword('');
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          first_name: Yup.string().max(255).required('First Name is required'),
          last_name: Yup.string().max(255).required('Last Name is required'),
          phone: Yup.string().max(25).required('Phone is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          console.log(values);
          values = { address: null, user: { ...values, password1: values.password, password2: values.password } };
          // eslint-disable-next-line
          fetcher(CORE_EP.PROFILE_CREATE, 'post', null, null, values, (res) => {
              console.log(' Success************templates');
              successProcessor('Worker profile created successfully.', dispatch, openSnackbar);
              setSubmitting(false);
              // eslint-disable-next-line
              window.location = `${ACCOUNT_URL.LOGIN}?error=Login to Proceed!!!&email=${values.user.email}`;
              // console.log(res.data);
              // setProfile(Object.assign(res.data, ...res.data.user));
              // setProfile(res.data);
            },
            (err) => {
              console.log(err);
              setSubmitting(false);
              errorProcessor(err, setErrors, dispatch, openSnackbar);
            }
          );
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, getFieldProps, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="first-name-register">First Name</InputLabel>
                  <TextField
                    fullWidth
                    id="first-name-register"
                    placeholder="Enter your First Name"
                    {...getFieldProps('first_name')}
                    error={Boolean(touched.first_name && errors.first_name)}
                    helperText={touched.first_name && errors.first_name}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="last-name-register">Last Name</InputLabel>
                  <TextField
                    fullWidth
                    id="last-name-register"
                    placeholder="Enter your Last Name"
                    {...getFieldProps('last_name')}
                    error={Boolean(touched.last_name && errors.last_name)}
                    helperText={touched.last_name && errors.last_name}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-register">Email Address</InputLabel>
                  <TextField
                    fullWidth
                    type="email"
                    id="email-register"
                    placeholder="Enter your Email Address"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="phone-register">Phone Number</InputLabel>
                  <TextField
                    fullWidth
                    id="phone-register"
                    placeholder="Enter your Phone Number"
                    {...getFieldProps('phone')}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {touched.password && errors.password}
                  </FormHelperText>
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <NextLink href="/" passHref>
                    <Link variant="subtitle2">Terms of Service</Link>
                  </NextLink>
                  &nbsp; and &nbsp;
                  <NextLink href="/" passHref>
                    <Link variant="subtitle2">Privacy Policy</Link>
                  </NextLink>
                </Typography>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Create Account
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

AuthRegister.propTypes = {
  providers: PropTypes.object,
  csrfToken: PropTypes.string
};

export default AuthRegister;
