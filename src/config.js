import Axios from 'axios';

export const drawerWidth = 260;

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';

export const DEFAULT_PATH = '/dashboard/';

// ==============================|| THEME CONFIG  ||============================== //

// ==============================|| FRONT URLs  ||============================== //
export const ACCOUNT_URL = {
  LOGIN: '/login/',
  LOGOUT: '/accounts/logout/',
  REGISTER: '/register/',
  FORGOT_PASSWORD_FORM: '/forgot-password/',
  PASSWORD_RESET_FORM: '/reset-password/',
  PROFILE_UPDATE: '/accounts/user/personal/',
  PROFILE_PAYMENT: '/accounts/user/payment/',
  PROFILE_PASSWORD: '/accounts/user/password/',
  PROFILE_SETTINGS: '/accounts/user/settings/'
};

export const CORE_URL = {
  HOME: '/home/',
  INDEX: '/',
  DASHBOARD: '/dashboard/',
  ABOUT: '/about/',
  CONTACT: '/contact/',
  CONNECT_GMAIL: `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/google/authorisaction/`,

  COMPANY_CREATE: '/company/add/',
  // COMPANY_UPDATE: '/company/add/',
  COMPANY_LIST: '/company/list/',
  COMPANY_DETAIL: '/company/{id}/',

  PROPERTY_CREATE: '/rental/property/add/',
  PROPERTY_LIST: '/rental/property/list/',
  PROPERTY_LIST_MINE: '/rental/property/list-mine/',

  PROFILE_CREATE: '/accounts/user/new/',
  PROFILE_UPDATE: '/accounts/user/{id}/',
  PROFILE_LIST: '/accounts/user/list/',
  PROFILE_DETAIL: '/accounts/user/{id}/?tab={tab}'
};

// ==============================|| BACK URLs (EP) ||============================== //
export const ACCOUNT_EP = {
  ME: '/accounts/me/',
  LOGIN: '/accounts/login/',
  LOGOUT: '/accounts/logout/',
  REGISTER: '/accounts/user/',
  // REGISTER: '/accounts/registration/',
  PASSWORD_RESET: '/accounts/password/reset/',
  PASSWORD_CHANGE: '/accounts/password/change/',
  USER_PASSWORD_CHANGE: '/accounts/user/{id}/password/change/'
};

export const CORE_EP = {
  PING: '/core/protected/ping/',

  CITY_LIST: '/core/city/',
  CITY_DETAIL: '/core/city/{id}/',

  EMAIL_COLLECT: '/core/interested/email/',

  PROFILE_ME: '/core/profile/me/',
  PROFILE_CREATE: '/core/profile/',
  PROFILE_UPDATE: '/core/profile/{id}/',
  PROFILE_LIST: '/core/profile/',
  PROFILE_NAMES: '/core/profile/names/',
  PROFILE_DETAIL: '/core/profile/{id}/',
  PROFILE_DELETE: '/core/profile/{id}/',
  PROFILE_ACHIEVE: '/core/profile/{id}/achieve/'
};

export const DIRECTORY_EP = {
  PROPERTY_CREATE: '/directory/property/',
  PROPERTY_UPDATE: '/directory/property/{id}/',
  PROPERTY_LIST: '/directory/property/',
  PROPERTY_DETAIL: '/directory/property/{id}/',
  PROPERTY_DELETE: '/directory/property/{id}/',
  PROPERTY_ACHIEVE: '/directory/property/{id}/achieve/',
  PROPERTY_FORM_ITEMS: '/directory/property/form/items/',
  PROPERTY_FIXED_ITEMS: '/directory/property/fixed/items/'
};

export const NOTIFICATION_EP = {
  NOTIFICATION_ALL: '/inbox/notifications/all/',
  NOTIFICATION_MINE: '/inbox/notifications/mine/',
  NOTIFICATION_MINE_COUNT: '/inbox/notifications/mine/count/',
  NOTIFICATION_READ: '/inbox/notifications/read/',
  NOTIFICATION_READ_COUNT: '/inbox/notifications/read/count/',
  NOTIFICATION_UNREAD: '/inbox/notifications/unread/',
  NOTIFICATION_UNREAD_COUNT: '/inbox/notifications/unread/count/',
  NOTIFICATION_MARK_AS_READ: '/inbox/notifications/{id}/mark/as/read/',
  NOTIFICATION_MARK_ALL_AS_READ: '/inbox/notifications/mark/all/as/read/'
};

// ==============================|| THEME CONFIG  ||============================== //

const config = {
  fontFamily: `'Public Sans', sans-serif`,
  i18n: 'en',
  miniDrawer: false,
  container: true,
  mode: 'light',
  presetColor: 'default',
  themeDirection: 'ltr'
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
export const api = Axios.create({
  baseURL: API_BASE,
  timeout: 1100000,
  headers: { 'Content-Type': 'application/json' }
});

export const fetcher = async (url, method = 'get', session, params = null, data = null, success = null, failure = null, upload = false) => {
  // console.log(' ========= fetcher() ========= ');
  if (!url.startsWith('http')) {
    url = url.startsWith('/') ? `${API_BASE}${url}` : `${API_BASE}/${url}`;
  }
  console.log(`Http '${method}' Request: `, url);

  if (url.includes('/undefined') || typeof session === 'undefined') {
    return Promise.resolve(null);
  }

  // console.log('Token:    ', session && session.access);
  if (session) api.defaults.headers.common['Authorization'] = `Token ${session?.tocken?.access}`;
  // console.log('Hearders:   ', api.defaults.headers);
  if (upload) {
    api.defaults.headers['Content-Type'] = 'multipart/form-data';
    api.defaults.headers.common['Content-Type'] = 'multipart/form-data';
  }

  // console.log('********** Header +++++++');
  // console.log(api.defaults.headers);

  if (success === null) {
    success = () => {
      console.log('Success ****** ');
    };
  }

  if (failure === null) {
    failure = (err) => {
      console.log('Error ****** 123 ');
      console.log(err);

      if (typeof err.response === 'undefined') {
        alert('Error Occurred!!!');
        return;
      }

      const error = err.response.data;
      if (err.code === 'ECONNREFUSED') {
        alert('Request failed because of broken communication link');
      } else if (error) {
        console.log('Error 3');
        console.log(err.code);
        console.log(err.response);
        console.log(err.response.data);
        if (typeof error.detail !== 'undefined') {
          console.log('Error 4 ');
          alert(error.detail);
        } else if (typeof error.non_field_errors !== 'undefined' && error.non_field_errors.constructor.name === 'Array') {
          console.log('Error 5 ');
          alert(error.non_field_errors[0]);
        } else if (error.constructor.name === 'Object') {
          console.log('Error 6 ');
          const key = Object.keys(error)[0];
          const obj = error[key];
          if (key === 'title') {
            alert(obj[0]);
            return;
          }

          if (obj.constructor.name === 'Array' && typeof obj.length !== 'undefined') {
            alert(obj[0]);
          } else {
            alert('Error Occurred!!!');
          }
        }
      }
    };
  }

  if (method === 'get') {
    return api.get(url, { params }).then(success).catch(failure);
  } else if (method === 'post') {
    return api.post(url, data).then(success).catch(failure);
  } else if (method === 'put') {
    return api.put(url, data).then(success).catch(failure);
  } else if (method === 'patch') {
    return api.patch(url, data).then(success).catch(failure);
  } else if (method === 'delete') {
    return api.delete(url).then(success).catch(failure);
  }
};

export const warningProcessor = (msg, dispatch, openSnackbar) => {
  dispatch(openSnackbar({ open: true, message: msg, variant: 'alert', alert: { color: 'warning' }, close: true }));
};

export const successProcessor = (msg, dispatch, openSnackbar) => {
  dispatch(
    openSnackbar({
      open: true,
      message: msg,
      variant: 'alert',
      alert: { color: 'success' },
      close: true,
      anchorOrigin: { vertical: 'top', horizontal: 'center' }
    })
  );
};

export const extractMsg = (err, msg, data) => {
  if (err.code === 'ECONNREFUSED') {
    // console.log('============ ECONNREFUSED ============');
    msg = 'Unable to connect because of broken communication link';
  } else if (err.code === 'ERR_NETWORK') {
    // console.log('============ ERR_NETWORK ============');
    msg = err.message;
  } else if (err.code === 'ERR_BAD_REQUEST') {
    msg = err.message;
    if (err.response.request.status === 401) {
      msg = 'Authentication Required!!!';
    } else if (Object.keys(data).includes('message')) {
      msg = data.message;
    } else if (Object.keys(data).includes('detail')) {
      msg = data.detail;
    } else if (Object.keys(data).includes('non_field_errors')) {
      msg = data.non_field_errors;
    }
  } else if (err.code === 'ERR_BAD_RESPONSE') {
    // console.log('============ ERR_BAD_RESPONSE ============');
    msg = err.response.request.status === 500 ? 'Sorry!!! Something went terribly wrong' : err.response.request.statusText;
  } else if (Object.keys(data).includes('detail')) {
    // console.log('============ detail ============');
    msg = data['detail'] || 'Error Occurred';
  } else if (Object.keys(data).includes('message')) {
    // console.log('============ message ============');
    msg = data['message'] || 'Error Occurred';
  } else if (Object.keys(data).includes('non_field_errors')) {
    // console.log('============ non_field_errors ============');
    msg = data['non_field_errors'][0] || 'Error Occurred';
  }
  return msg;
};

export const errorProcessor = (err, setErrors, dispatch, openSnackbar) => {
  if (typeof err === 'string') {
    dispatch(openSnackbar({ open: true, message: err, variant: 'alert', alert: { color: 'error' }, close: false }));
    return;
  }

  setErrors = typeof setErrors === 'function' ? setErrors : () => {};
  const data = err.response?.data ? err.response.data : [];
  let msg = 'Something went wrong';

  msg = extractMsg(err, msg, data);

  if (['Array', 'Object'].includes(data.constructor.name)) {
    setErrors(data);
  }

  if (msg.constructor.name === 'Array') {
    msg.forEach((m) => {
      dispatch(
        openSnackbar({
          open: true,
          message: m,
          variant: 'alert',
          alert: { color: 'error' },
          close: true,
          anchorOrigin: { vertical: 'top', horizontal: 'center' }
        })
      );
    });
  } else if (msg.constructor.name === 'String') {
    dispatch(
      openSnackbar({
        open: true,
        message: msg,
        variant: 'alert',
        alert: { color: 'error' },
        close: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' }
      })
    );
  }
};

export default config;
