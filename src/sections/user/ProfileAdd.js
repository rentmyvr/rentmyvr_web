import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// next
// import NextLink from 'next/link';
import { useSession } from 'next-auth/react';

// material-ui
// import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
// import _ from 'lodash';
import * as Yup from 'yup';
// import { useIntl } from 'react-intl';
import { useFormik, Form, FormikProvider } from 'formik';

// project imports
import AnimateButton from 'components/@extended/AnimateButton';
import IconButton from 'components/@extended/IconButton';
import { CORE_EP, fetcher, successProcessor, errorProcessor } from 'config';
import { openSnackbar } from 'store/reducers/snackbar';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
// import { CameraOutlined, DeleteFilled } from '@ant-design/icons';

// constant

// ==============================|| CUSTOMER ADD / EDIT / DELETE ||============================== //

const ProfileAdd = ({ profile, onCancel, data = [], setData }) => {
  // const theme = useTheme();
  // const intl = useIntl();
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const {data: {tocken: sxssion} } = useSession();
  const isCreating = !category;

  const formik = useFormik({
    initialValues: category || { label: '' },
    validationSchema: Yup.object().shape({
      label: Yup.string()
        .max(128)
        .required(intl.formatMessage({ id: 'category-validation-label-required' }))
    }),
    onSubmit: (values, { setErrors, setSubmitting }) => {
      const url = isCreating ? CORE_EP.CATEGORY_CREATE : CORE_EP.CATEGORY_UPDATE.format(category.id);
      // eslint-disable-next-line
      fetcher(url, isCreating ? 'post' : 'put', sxssion, null, values, (res) => {
          const msg = intl.formatMessage({
            id:
              sxssion.user.position !== 'Admin'
                ? 'category-feedback-suggestion'
                : isCreating
                ? 'category-feedback-created'
                : 'category-feedback-updated'
          });
          successProcessor(msg, dispatch, openSnackbar);
          setSubmitting(false);
          onCancel();
          if (isCreating) {
            setData([...data, res.data]);
          } else {
            setData(data.map((x) => (x.id === res.data.id ? res.data : x)));
          }
        },
        (err) => {
          errorProcessor(err, setErrors, dispatch, openSnackbar);
          setSubmitting(false);
        }
      );
    }
  });

  const { errors, touched, handleSubmit, values, isSubmitting, getFieldProps } = formik;
  // const none_admin_note = sxssion.user.position === 'Admin' ? '' : intl.formatMessage({ id: 'category-suggestion-message-none-admin' });

  return (
    <FormikProvider value={formik}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogTitle>{profile ? 'Edit User Profile' : 'Add User Profile'}</DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
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

              {/* <Grid item xs={12} sx={{ mt: -1 }}>
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
              </Grid> */}
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
          </DialogContent>

          <Divider />
          <DialogActions sx={{ p: 2.5 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item></Grid>
              <Grid item>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button color="error" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" disabled={isSubmitting || values.label === category?.label}>
                    {profile ? 'Edit Profile' : 'Add Profile'}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </DialogActions>
        </Form>
      </LocalizationProvider>
    </FormikProvider>
  );
};

ProfileAdd.propTypes = {
  profile: PropTypes.any,
  onCancel: PropTypes.func,
  setData: PropTypes.func,
  data: PropTypes.any
};

export default ProfileAdd;
