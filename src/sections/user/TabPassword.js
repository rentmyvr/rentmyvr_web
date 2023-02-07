import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import { openSnackbar } from 'store/reducers/snackbar';
import { isNumber, isLowercaseChar, isUppercaseChar, isSpecialChar, minLength } from 'utils/password-validation';
import { ACCOUNT_EP, fetcher, errorProcessor, successProcessor } from 'config';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// assets
import { CheckOutlined, EyeOutlined, EyeInvisibleOutlined, LineOutlined } from '@ant-design/icons';

// ==============================|| TAB - PASSWORD CHANGE ||============================== //

const TabPassword = ({ uid, session }) => {
  const dispatch = useDispatch();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <MainCard title="Change Password">
      <Formik
        initialValues={{ old_password: '', new_password1: '', new_password2: '', submit: null }}
        validationSchema={Yup.object().shape({
          old_password: Yup.string().required('Old Password is required'),
          new_password1: Yup.string()
            .required('New Password is required')
            .matches(
              /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
              'Password must contain at least 8 characters, one uppercase, one number and one special case character'
            ),
          new_password2: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('new_password1'), null], "Passwords don't match.")
        })}
        onSubmit={async (values, { resetForm, setErrors, setSubmitting }) => {
          // eslint-disable-next-line
          fetcher(ACCOUNT_EP.USER_PASSWORD_CHANGE.format(uid), 'post', session, null, values, (res) => {
              successProcessor('Password has been changed successfully.', dispatch, openSnackbar);
              console.log(res.data);
              resetForm();
              setSubmitting(false);
            },
            (err) => {
              console.log(err);
              setSubmitting(false);
              errorProcessor(err, setErrors, dispatch, openSnackbar);
            }
          );
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item container spacing={3} xs={12} sm={6}>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="old-password">Old Password</InputLabel>
                    <OutlinedInput
                      placeholder="Enter Old Password"
                      id="old-password"
                      type={showOldPassword ? 'text' : 'password'}
                      value={values.old_password}
                      name="old_password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowOldPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                            color="secondary"
                          >
                            {showOldPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      }
                      inputProps={{}}
                    />
                    <FormHelperText error id="old-password-helper">
                      {touched.old_password && errors.old_password}
                    </FormHelperText>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="new-password1">New Password</InputLabel>
                    <OutlinedInput
                      placeholder="Enter New Password"
                      id="new-password1"
                      type={showNewPassword ? 'text' : 'password'}
                      value={values.new_password1}
                      name="new_password1"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                            color="secondary"
                          >
                            {showNewPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      }
                      inputProps={{}}
                    />
                    <FormHelperText error id="password-password-helper">
                      {touched.new_password1 && errors.new_password1}
                    </FormHelperText>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="password-confirm">Confirm Password</InputLabel>
                    <OutlinedInput
                      placeholder="Enter Confirm Password"
                      id="password-confirm"
                      type={showConfirmPassword ? 'text' : 'new_password2'}
                      value={values.new_password2}
                      name="new_password2"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                            color="secondary"
                          >
                            {showConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      }
                      inputProps={{}}
                    />
                    {touched.confirm && errors.confirm && (
                      <FormHelperText error id="password-confirm-helper">
                        {errors.confirm}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ p: { xs: 0, sm: 2, md: 4, lg: 5 } }}>
                  <Typography variant="h5">New password must contain:</Typography>
                  <List sx={{ p: 0, mt: 1 }}>
                    <ListItem divider>
                      <ListItemIcon sx={{ color: minLength(values.new_password1) ? 'success.main' : 'inherit' }}>
                        {minLength(values.new_password1) ? <CheckOutlined /> : <LineOutlined />}
                      </ListItemIcon>
                      <ListItemText primary="At least 8 characters" />
                    </ListItem>
                    <ListItem divider>
                      <ListItemIcon sx={{ color: isLowercaseChar(values.new_password1) ? 'success.main' : 'inherit' }}>
                        {isLowercaseChar(values.new_password1) ? <CheckOutlined /> : <LineOutlined />}
                      </ListItemIcon>
                      <ListItemText primary="At least 1 lower letter (a-z)" />
                    </ListItem>
                    <ListItem divider>
                      <ListItemIcon sx={{ color: isUppercaseChar(values.new_password1) ? 'success.main' : 'inherit' }}>
                        {isUppercaseChar(values.new_password1) ? <CheckOutlined /> : <LineOutlined />}
                      </ListItemIcon>
                      <ListItemText primary="At least 1 uppercase letter (A-Z)" />
                    </ListItem>
                    <ListItem divider>
                      <ListItemIcon sx={{ color: isNumber(values.new_password1) ? 'success.main' : 'inherit' }}>
                        {isNumber(values.new_password1) ? <CheckOutlined /> : <LineOutlined />}
                      </ListItemIcon>
                      <ListItemText primary="At least 1 number (0-9)" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ color: isSpecialChar(values.new_password1) ? 'success.main' : 'inherit' }}>
                        {isSpecialChar(values.new_password1) ? <CheckOutlined /> : <LineOutlined />}
                      </ListItemIcon>
                      <ListItemText primary="At least 1 special characters" />
                    </ListItem>
                  </List>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                  <Button variant="outlined" color="secondary">
                    Cancel
                  </Button>
                  {/* <Button disabled={isSubmitting || Object.keys(errors).length !== 0} type="submit" variant="contained"> */}
                  <Button disabled={isSubmitting} type="submit" variant="contained">
                    Save
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </MainCard>
  );
};

TabPassword.propTypes = {
  session: PropTypes.any,
  uid: PropTypes.string
};

export default TabPassword;
