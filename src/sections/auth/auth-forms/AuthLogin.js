import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

// next
// import Image from 'next/image';
import NextLink from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import { useDispatch } from 'react-redux';

// material-ui

import {
  Alert,
  // Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  // Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  InputAdornment,
  OutlinedInput,
  Stack,
  Slide,
  Typography
  // useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
// import { useIntl } from 'react-intl';

// project import
// import FirebaseSocial from './FirebaseSocial';
import { DEFAULT_PATH, ACCOUNT_URL } from 'config';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// project import
import { openSnackbar } from 'store/reducers/snackbar';
import { fetcher, errorProcessor, successProcessor, warningProcessor } from 'config';
// const Auth0 = '/assets/images/icons/auth0.svg';
// const Cognito = '/assets/images/icons/aws-cognito.svg';
// const Google = '/assets/images/icons/google.svg';

// ============================|| AWS CONNITO - LOGIN ||============================ //

const AuthLogin = ({ csrfToken }) => {
  // const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  // const intl = useIntl();
  const [checked, setChecked] = React.useState(false);
  const [capsWarning, setCapsWarning] = React.useState(false);

  const router = useRouter();
  const { error, email } = router.query;
  const [msg, setMsg] = useState(error);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState('');
  const [resendURL, setResendURL] = useState(null);
  const [activationURL, setActivationURL] = useState(null);

  const dispatch = useDispatch();
  const { data: session } = useSession();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onKeyDown = (keyEvent) => {
    if (keyEvent.getModifierState('CapsLock')) {
      setCapsWarning(true);
    } else {
      setCapsWarning(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          email: email || '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(' ------- >> ', DEFAULT_PATH);
          signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: DEFAULT_PATH
          }).then((res) => {
            console.log('------ ', res);
            let error = null;
            if (res.error) {
              try {
                error = JSON.parse(res.error);
              } catch (e) {
                setMsg(res.error);
                setSubmitting(false);
                return;
              }
              console.log(132);
              let typee = null;
              if (error.type) {
                typee = typeof error.type === 'string' ? error.type : error.type[0];
              }
              if (typee === 'Activation Required') {
                setMsg(error.message === 'string' ? error.message : error.message[0]);
                setOpen(true);
                setResendURL(error.resend_url === 'string' ? error.resend_url : error.resend_url[0]);
                setActivationURL(error.activation_url === 'string' ? error.activation_url : error.activation_url[0]);
                setSubmitting(false);
                return;
              }
            }
          });
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <>
            <form noValidate onSubmit={handleSubmit}>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <Grid container spacing={3}>
                {msg && (
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <Alert severity="warning">{msg}</Alert>
                    </Stack>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email-login">Email Address</InputLabel>
                    <OutlinedInput
                      id="email-login"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                    />
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {touched.email && errors.email}
                    </FormHelperText>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="password-login">Password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      color={capsWarning ? 'warning' : 'primary'}
                      error={Boolean(touched.password && errors.password)}
                      id="-password-login"
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      name="password"
                      onBlur={(event) => {
                        setCapsWarning(false);
                        handleBlur(event);
                      }}
                      onKeyDown={onKeyDown}
                      onChange={handleChange}
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
                    {capsWarning && (
                      <Typography variant="caption" sx={{ color: 'warning.main' }} id="warning-helper-text-password-login">
                        Caps lock on!
                      </Typography>
                    )}
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {touched.password && errors.password}
                    </FormHelperText>
                  </Stack>
                </Grid>

                <Grid item xs={12} sx={{ mt: -1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={(event) => setChecked(event.target.checked)}
                          name="checked"
                          color="primary"
                          size="small"
                        />
                      }
                      label={<Typography variant="h6">Keep me sign in</Typography>}
                    />
                    <NextLink href={session ? '/auth/forgot-password' : '/forgot-password'} passHref>
                      <Link variant="h6" color="text.primary">
                        Forgot Password?
                      </Link>
                    </NextLink>
                  </Stack>
                </Grid>
                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <AnimateButton>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Login
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </form>

            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              // maxWidth={'md'}
              onClose={() => setOpen(false)}
            >
              <DialogTitle>Please enter the Activation Code sent to your Email</DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      {/* <InputLabel htmlFor="code-login">Enter your email</InputLabel> */}
                      <OutlinedInput
                        id="code-login"
                        type="text"
                        label="Enter your email"
                        value={code}
                        onChange={(val) => {
                          console.log(' ----- ', val.target.value);
                          setCode(val.target.value);
                        }}
                        placeholder="Enter activation code"
                        fullWidth
                        // error={Boolean(codeError)}
                      />
                      {/* {codeError && <FormHelperText id="standard-code-login">{codeError}</FormHelperText>} */}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <AnimateButton>
                      <Button
                        fullWidth
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          if (code.length !== 4 || isNaN(code)) {
                            warningProcessor('Activation code must be 4 digits', dispatch, openSnackbar);
                            return;
                          }
                          // eslint-disable-next-line
                          fetcher(activationURL, 'post', null, null, {token: code}, (res) => {
                              const actMsg = intl.formatMessage({ id: 'account-feedback-activation' });
                              window.location = `${ACCOUNT_URL.LOGIN}?error=${actMsg}&email=${values.email}`;
                              // successProcessor('Account successfully activated, Login to contiune!', dispatch, openSnackbar);
                              // setOpen(false);
                            },
                            (err) => {
                              errorProcessor(err, () => {}, dispatch, openSnackbar);
                            }
                          );
                        }}
                      >
                        Activate
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Button
                      onClick={() => {
                        // eslint-disable-next-line
                        fetcher(resendURL, 'get', null, null, null, res => {
                            successProcessor('Activation Code re-sent successfully!', dispatch, openSnackbar);
                          },
                          (err) => {
                            errorProcessor(err, () => {}, dispatch, openSnackbar);
                          }
                        );
                      }}
                    >
                      Resend
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                  </Grid>
                </Grid>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Formik>
    </>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

AuthLogin.propTypes = {
  providers: PropTypes.object,
  csrfToken: PropTypes.string
};

export default AuthLogin;
