// next
import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import CredentialsProvider from 'next-auth/providers/credentials';
import CognitoProvider from 'next-auth/providers/cognito';
import GoogleProvider from 'next-auth/providers/google';

// third-party
import axios from 'axios';

// project imports
import { errorMessage, ACCOUNT_EP, ACCOUNT_URL } from 'config';

export let users = [
  {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: ''
    // employment_type: '',
    // position: '',
    // status: ''
  }
];

// const someCookie = req.cookies['some-custom-cookie'];
const someCookie = 'Bla bla!! bla!!!';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET_KEY,
  site: process.env.NEXTAUTH_URL,

  providers: [
    Auth0Provider({
      name: 'Auth0',
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: `https://${process.env.AUTH0_DOMAIN}`
    }),
    CognitoProvider({
      name: 'Cognito',
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      issuer: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_POOL_ID}`
    }),
    GoogleProvider({
      name: 'Google',
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    }),

    // functionality provided for credentials based authentication is intentionally limited to discourage use of passwords due to the
    // inherent security risks associated with them and the additional complexity associated with supporting usernames and passwords.
    // We recommend to ignore credential based auth unless its super necessary
    // Ref: https://next-auth.js.org/providers/credentials
    // https://github.com/nextauthjs/next-auth/issues/3562
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: 'credentials',
      name: 'Credentials',
      // softdongle.info:3000
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Enter your email' },
        password: { label: 'Password', type: 'password', placeholder: 'Enter your password' }
      },

      // async authorize(credentials, req) {
      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // The returned object will be persisted to the JSON Web Token and the user will be signed in,
        // unless a custom signIn() callback is configured that subsequently rejects it.

        // console.log('\n\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> authorize()\n');

        // console.log(req);
        // const someCookie = req.cookies['some-custom-cookie'];

        let url = `${process.env.NEXT_PUBLIC_API_BASE}${ACCOUNT_EP.LOGIN}`;
        // console.log('------------------');
        // console.log(url);
        // console.log(credentials);
        // console.log(api);

        // return await api.post(url, credentials)
        return await axios
          .post(url, credentials)
          .then((res) => {
            console.log('---Success---');
            console.log(res.data);
            // console.log(res.data.user);
            if (res.data.user) {
              return Promise.resolve(res.data);
            }
            return Promise.reject(new Error('Invalid `email` or `password`'));
          })
          .catch((err) => {
            console.log('----Error----');
            console.log('err.response: ', err.response);
            console.log('err.code: ', err.code);
            console.log('err.response.data: ', err.response.data);

            // console.log("Error: ", err.response.data)
            // console.log("-----------------------      00000000    -----------------------")
            // console.log("Error: ", err.response.text)
            if (err.code === 'ECONNREFUSED') {
              return Promise.reject(new Error('Unable to authenticate because of broken communication link'));
            } else if (err.response.data) {
              console.log('\nError Data: ', err.response.data);

              if ('message' in err.response.data) {
                let message = err.response.data.message;
                if ('link' in err.response.data) {
                  message = `${message} <br /> <a href='${err.response.data.link}'>${err.response.data.title}</a>`;
                  err.response.data.message = message;
                }
                return Promise.reject(new Error(JSON.stringify(err.response.data)));
              }
              return Promise.reject(new Error(errorMessage(err.response.data)));
            }
            return Promise.reject(new Error('Authentication failed!'));
          });
      }
    }),

    // functionality provided for credentials based authentication is intentionally limited to discourage use of passwords due to the
    // inherent security risks associated with them and the additional complexity associated with supporting usernames and passwords.
    // We recommend to ignore credential based auth unless its super necessary
    // Ref: https://next-auth.js.org/providers/credentials
    // https://github.com/nextauthjs/next-auth/issues/3562
    CredentialsProvider({
      id: 'register',
      name: 'Register',
      credentials: {
        first_name: { label: 'First Name', type: 'text', placeholder: 'Enter your First Name' },
        last_name: { label: 'Last Name', type: 'text', placeholder: 'Enter your Last Name' },
        email: { label: 'Email', type: 'email', placeholder: 'Enter your email' },
        phone: { label: 'Phone', type: 'text', placeholder: 'Enter your phone' },
        password: { label: 'Password', type: 'password', placeholder: 'Enter your password' }
      },

      async authorize(credentials) {
        console.log('------------ : Register : ------------');
        console.log(credentials);

        try {
          const user = await axios.post(`${process.env.NEXTAUTH_URL}/api/accounts/registration`, {
            name: credentials?.name,
            password: credentials?.password,
            email: credentials?.email
          });

          if (user) {
            users.push(user.data);
            return user.data;
          }
        } catch (e) {
          const errorMessage = e?.response.data.message;
          throw new Error(errorMessage);
        }
      }
    })
  ],

  callbacks: {
    /**
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @param  {object}  profile   Provider profile (only available on sign in)
     * @param  {boolean} isNewUser True if new user (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    // jwt: async ({ token, user, account, profile, isNewUser }) => {
    jwt: async ({ token, user, account }) => {
      // This JSON Web Token callback is called whenever a JSON Web Token is created (i.e. at sign in)
      // or updated (i.e whenever a session is accessed in the client).
      // e.g. /api/auth/signin, getSession(), useSession(), /api/auth/session
      // As with database session expiry times, token expiry time is extended whenever a session is active.
      // The arguments user, account, profile and isNewUser are only passed the first time this callback
      // is called on a new session, after the user signs in.
      // The contents of user, account, profile and isNewUser will vary depending on the provider and on
      // if you are using a database or not. If you want to pass data such as User ID, OAuth Access Token,
      // etc. to the browser, you can persist it in the token and use the session() callback to return it.
      // console.log("\n\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> callbacks.jwt() ")
      // console.log(props)

      const isSignIn = user ? true : false;
      // console.log('--------------- callbacks (jwt) -------------- ', isSignIn);

      if (isSignIn) {
        // console.log('-------Token-------');
        // console.log(token);
        // console.log('-------User-------');
        // console.log(user);
        // console.log('-------Account-------');
        // console.log(account);
        // console.log('-------Profile-------');
        // console.log(profile);
        // console.log('-------isNewUser-------');
        // console.log(isNewUser);

        // Add auth_time to token on sign in
        token.auth_time = Math.floor(Date.now() / 1000);
        // token.first_name = user.user?.first_name;
        // token.last_name = user.user?.last_name;
        // token.email = user.user?.email;
        // token.phone = user.user?.phone;
        // token.id = user.user.id;

        token.access = user?.key;
        token.provider = account?.provider;
        token.created = new Date().toISOString();
        token.user = user.user;
      }

      // console.log('****** Token *******');
      // console.log(token);

      return Promise.resolve(token);
    },

    session: async ({ session, token }) => {
      // The session callback is called whenever a session is checked.
      // By default, only a subset of the token is returned for increased security.
      // If you want to make something available you added to the token
      // (like access_token and user.id from above) via the jwt() callback,
      // you have to explicitly forward it here to make it available to the client.
      // console.log('--------------- callbacks (session) --------------');
      // console.log(session);
      // console.log(token);

      if (token) {
        session.user = token.user;
        session.id = token.id;
        session.provider = token.provider;
        session.tocken = token;
      }
      // Return a cookie value as part of the session
      // This is read when `req.query.nextauth.includes('session) && req.method === 'GET`
      session.someCookie = someCookie;
      return session;
    },

    // signIn: async ({ user, account, profile, email, credentials }) => {
    signIn: async () => {
      // Use the signIn() callback to control if a user is allowed to sign in.
      // When using the Credentials Provider the user object is the response returned from the
      // Providers.Credentials.authorize() callback and the profile object is the raw body of the HTTP POST submission.

      // console.log('--------------- callbacks (signIn) --------------');

      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return Promise.resolve(true);
      } else {
        // Return false to display a default error message
        return Promise.resolve(false);
        // Or you can return a URL to redirect to:
        // return '/unauthorized'

        // You can also Reject this callback with an Error or with a URL:
        // return Promise.reject(new Error('error message')) // Redirect to error page
        // return Promise.reject('/path/to/redirect')        // Redirect to a URL
      }
    },

    redirect: async ({ url, baseUrl }) => {
      // console.log('--------------- callbacks (redirect) --------------');
      // console.log(url, '    ', baseUrl);
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },

  session: {
    strategy: 'jwt',
    maxAge: Number(process.env.JWT_TIMEOUT)
  },

  jwt: {
    secret: process.env.JWT_SECRET
  },

  // The pages it uses for different scenerio like SignIn, SignOut, newUser, etc
  pages: {
    signIn: ACCOUNT_URL.LOGIN,
    signOut: ACCOUNT_URL.LOGOUT,
    newUser: ACCOUNT_URL.REGISTER,
    error: ACCOUNT_URL.LOGIN
  },

  // Events are asynchrono us functions that do not return a response, they are useful for audit logging.
  // You can specify a handler for any of these events below - e.g. for debugging or to create an audit log.
  // The content of the message object varies depending on the flow (e.g. OAuth or Email authentication flow,
  // JWT or database sessions, etc), but typically contains a user object and/or contents of the JSON Web
  // Token and other information relevant to the event.
  events: {
    // signIn: async ({ user, account, profile, isNewUser }) => {
    signIn: async () => {
      /* on successful sign in */
      // console.log('\n****************  events.signIn()');
      // console.log(localStorage)
      // console.log('-------User-------')
      // console.log(user)
      // console.log('-------Account-------')
      // console.log(account)
      // console.log('-------Profile-------')
      // console.log(profile)
      // console.log('-------isNewUser-------')
      // console.log(isNewUser)
    },
    signOut: async (message) => {
      /* on signout */
      // console.log('\n****************  events.signOut()');
      // console.log(message?.token?.access);
      console.log(message);
    }
    // createUser: async (message) => {
    // createUser: async () => {
    //   /* user created */
    //   // console.log('\n****************  events.createUser()');
    //   // console.log(message);
    // },
    // // updateUser: async (message) => {
    // updateUser: async () => {
    //   /* user updated */
    //   // console.log('\n****************  events.updateUser()');
    //   // console.log(message);
    // },
    // // linkAccount: async (message) => {
    // linkAccount: async () => {
    //   /* account linked to a user */
    //   // console.log('\n****************  events.linkAccount()');
    //   // console.log(message);
    // },
    // // session: async (message) => {
    // session: async () => {
    //   /* session is active */
    //   // console.log('\n***************  events.session()');
    //   // console.log(message);
    // },
    // // error: async (message) => {
    // error: async () => {
    //   /* error in authentication flow */
    //   // console.log('\n****************  events.error()');
    //   // console.log(message);
    // }
  },

  useSecureCookies: process.env.PROTOCOL == 'https' // true for HTTPS sites / false for HTTP sites
});
