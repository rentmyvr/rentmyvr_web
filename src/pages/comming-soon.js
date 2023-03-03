import PropTypes from 'prop-types';

// next
import NextLink from 'next/link';

// material-ui
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  // Container,
  Fab,
  Fade,
  Grid,
  InputLabel,
  Link,
  // Paper,
  Stack,
  TextField,
  Typography,
  useScrollTrigger,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';

import Carousel from 'react-material-ui-carousel';

// third-party
import * as Yup from 'yup';
import { useFormik } from 'formik';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import CountUp from 'react-countup';

// project imports
import Layout from 'layout';
import Page from 'components/Page';
import ScrollTop from 'components/ScrollTop';
import { Rent_1, Rent_2 } from 'components/RentMyVRIcons';
// import ContactHeader from 'sections/contact-us/ContactHeader';

// assets
import { HomeFilled, HomeOutlined, ShoppingFilled, CalendarOutlined, EnvironmentOutlined, TeamOutlined, TagFilled, UpSquareFilled } from '@ant-design/icons';
// import { AppleFilled, BankFilled, HomeFilled, ShoppingFilled, TagFilled, UpSquareFilled } from '@ant-design/icons';
// import Image from 'next/image';

// ==============================|| CONTACT US - MAIN ||============================== //

let contents = [
  {
    title: 'Ad Space - ',
    content:
      'We know there are so many partners in the industry that would love the opportunity to advertise on our site. We hear you, and this is coming soon.'
  },
  {
    title: 'Mobile App -',
    content:
      'It&rsquo;s 2023, and we know most people use their phone to do just about anything! We are excited to be launching our mobile app soon. One of the key pieces that you have also asked for is texting through the app; it&rsquo;s coming!'
  },
  {
    title: 'Chat -',
    content:
      'through the platform. We know you want to track your communications in one easy place. We intend to allow chat on the site for potential guests to communicate with you directly. Once we have this and the texting, you will be able to see all communication history via the contact button, texting through the app and chat all in one convenient Inbox. Managing leads and guest inquiries has never been easier.'
  },
  {
    title: 'What is Rent My VR&rsquo;s Cancellation policy?',
    content:
      'Rent My VR is not involved in the booking of a reservation and does not institute a cancellation policy; please refer to the site you used to book your stay. For cancellation of a property or management company directory listing, you are able to login and deactivate a property at any time. We do not offer a refund for early deactivation of listings. '
  },
  {
    title: 'Favorite a Listing -',
    content:
      'We know guests like to dream and plan early. We also know its nice to be able to compare listings and come back to them later. Want to favorite a listing and save it? With our new Fav feature, you will be able to do this and even rank and share your favorite listings with the other people in your party.'
  },
  {
    title: 'RentMyVR Calendar -',
    content:
      'Okay, so many of you have a software to facilitate your calendar. But, if you are just getting started or only have a single property, some of those systems are overkill. Rent My VR has a calendar feature in the works to help you keep your bookings organized.'
  },
  {
    title: 'Websites -',
    content:
      'Ever wanted to have your own independent booking site, but didn&rsquo;t want to take the time to build one? We are working on 14 very easy to use templated sites. We know not everyone has the desire to design a clean and user friendly site. We have that part covered. All you do is select the site design and upload your descriptions and photos. We make it easy for you to create professional independent booking sites.'
  },
  {
    title: 'Directory Performance -',
    content:
      'Compare which links get more clicks and how many impressions you are getting from listing on Rent My VR. We want transparency so that you always know that listing on Rent My VR is driving more guests and traffic your way. You are also able to watch when making changes to a listing to see if updating the listing results in more hits to your listing. We know analytics matter, and we want to give you the numbers you need to be successful.'
  },
  {
    title: 'Integrations - ',
    content:
      'We know you need simple. We know your time is money. We are working fast and furious to identify and chart out the providers you care the most about. It takes time to develop strong partners, but as we continue to grow, we have identified the need to play well with your software of choice. We don&rsquo;t have the option to choose who we can integrate with in all cases, but for any software offering an open API, we are working on an integration. We have also begun to form new and lasting relationships with some key software providers that don&rsquo;t already have an API, but are willing to partner with our development team. Stay tuned for some big announcements.'
  },
  {
    title: 'Superhost Badges - ',
    content:
      'We know you worked hard, and you should be able to display your badge with pride. In addition to some exclusive Rent My VR badges, you will also have the option to display additional earned 3rd party booking site badges.'
  },
  {
    title: 'Luxury Listing Features -',
    content:
      'We know luxury listings have their own unique features and deserve their own category. We are looking to improve and expand our premium listing page to include more of the details that would accompany a luxury listing. Check out these examples, and feel free to contact us if we missed any! (Childcare, Cook, Chef, Waitstaff, Butler, Driver, Bartender, Security guard, Nanny, Masseuse, Villa manager, Restaurant concierge, Spa services, Equipment rental, Housekeeping, Airport transfer, Car rental, Fresh groceries, Laundry services, Personal Shopper, and More)'
  },
  {
    title: 'International Expansion -',
    content:
      'Rent My VR knew one thing when planning our launch and growth strategy - you can&rsquo;t do everything well, but you can do some things exceptionally. In an effort to provide exceptional customer service and support, we had to come up with a growth strategy that is calculated, paced, and intentional. We know there is a large demand for an international market. Be on the lookout for expansion outside of the US with a target for full global coverage by 2026.'
  },
  {
    title: 'Have a feature request or idea?',
    content:
      'We want to hear more! We welcome all comments and suggestions. We want to make the site better, and it is our users who drive our development. If you have suggestions please do not hesitate to share. Submit your ideas, dreams, and Rent My VR wishlist to us by clicking here. (Contact us button that will send an email to us)'
  }
];

const CarouselItem = ({ item }) => {
  return (
    <Grid
      container
      spacing={12}
      justifyContent="center"
      alignItems="center"
      sx={{
        // marginTop: '30px',
        // height: '600px',
        // backgroundImage: `url(${item.img})`,
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        background: `url(${item.img}) no-repeat center center fixed`,
        '-webkitBackgroundSize': 'cover',
        '-mozBackgroundSize': 'cover',
        '-oBackgroundSize': 'cover',
        // backgroundSize: '100% 98%',
        backgroundSize: 'cover',
        height: '600px',
        // width: '100%',
        overflow: 'hidden'
      }}
      mt={0}
    >
      <Grid item xs={12} sm={10}>
        <h2 style={{ color: item.textColor }}>{item.name}</h2>
        <p style={{ color: item.textColor, fontWeight: 'normal' }}>{item.description}</p>
        <Button>{item.btnText}</Button>
      </Grid>
    </Grid>
  );
};

CarouselItem.propTypes = {
  item: PropTypes.object
};

const underlineTheme = createTheme({
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          fontSize: '5rem',
          background: '#1890ff none repeat scroll 0 0',
          color: '#fff',
          display: 'block',
          height: '3px',
          left: 0,
          margin: '20px auto',
          position: 'relative',
          right: 0,
          textAlign: 'center',
          top: 0,
          width: '80px',

          '&::before': {
            background: '#1890ff none repeat scroll 0 0',
            bottom: 0,
            content: '""',
            height: '1px',
            left: '80px',
            margin: '0 auto',
            position: 'absolute',
            textAlign: 'center',
            top: '1px',
            width: '100px'
          },

          '&::after': {
            background: '#1890ff none repeat scroll 0 0',
            bottom: 0,
            content: '""',
            height: '1px',
            margin: '0 auto',
            position: 'absolute',
            right: '80px',
            textAlign: 'center',
            top: '1px',
            width: '100px'
          }
        }
      }
    }
  }
});

const countUpTheme = createTheme({
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          backgroundImage: `url(/assets/images/1200x375.png)`,
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          padding: '50px 0px',
          position: 'relative',
          backgroundAttachment: 'fixed',
          '.imageOverlay': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            height: '100%',
            position: 'absolute',
            width: '100%',
            top: 0
          },
          '.icon': {
            color: '#1890ff',
            fontSize: '40px'
          },
          '.count': {
            color: '#fff',
            fontSize: '34px',
            marginTop: '10px',
            textTransform: 'uppercase',
            fontWeight: 'bold'
          },
          '.sub': {
            color: '#fff',
            marginTop: '0px',
            textTransform: 'uppercase'
          }
        }
      }
    }
  }
});

const cardTheme = createTheme({
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          overflow: 'hidden',
          position: 'relative',
          borderRadius: '2px',
          '&:hover .locationOverlay': {
            backgroundColor: 'rgba(24, 144, 255, 0.9)',
            transition: 'all 0.4s ease 0s'
          },
          '&:hover .overlayText': {
            top: '50%',
            transition: 'all 0.4s ease 0s'
          }
        }
      }
    }
  }
});

const locationOverlayTheme = createTheme({
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          transition: 'all 0.4s ease 0s',
          '.overlayText': {
            color: '#fff',
            position: 'relative',
            top: '80%',
            transform: 'translateY(-50%)',
            textAlign: 'center',
            transition: 'all 0.4s ease 0s',
            '.headerLink': {
              fontSize: '22px',
              fontWeight: 'bold'
            }
          }
        }
      }
    }
  }
});

const Index = () => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 800 });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#__next');
    // const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
    console.log(anchor);
    if (anchor) {
      anchor.scrollIntoView({ inline: 'center', behavior: 'smooth' });
      // anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const formik = useFormik({
    initialValues: {},
    validationSchema: Yup.object().shape({
      name: Yup.string().max(128).required('Please provide a name or label for the Property/Rental')
    }),
    onSubmit: (values, { setErrors, setSubmitting }) => {
      // console.log('========== : : ===========');
      console.log(values);
      console.log(formToRaw(values));

      const url = isCreating ? CORE_EP.PROJECT_CREATE : CORE_EP.PROJECT_UPDATE.format(project.id);

      // eslint-disable-next-line
      fetcher(url, isCreating ? 'post' : 'put', sxssion, null, formToRaw(values), (res) => {
          const msg = intl.formatMessage({ id: isCreating ? 'projects-feedback-created' : 'projects-feedback-updated' });
          successProcessor(msg, dispatch, openSnackbar);
          setSubmitting(false);
          onCancel();
          if (isCreating) {
            if (typeof setData === 'function') {
              setData([...data, res.data]);
            }
          } else if (typeof setData === 'function') {
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

  const { errors, touched, getFieldProps } = formik;
  // const { errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;

  return (
    <Page title="Rent MyVR Home">
      <Grid container spacing={2} mt={6} justifyContent="center" alignItems="center">
        <Stack spacing={0} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <img style={{ width: '100%' }} src="/assets/images/Coming Soon Image.png" alt="" />
          </Grid>
          <Grid item sm={12} md={8} mb={5}>
            <Typography variant="h2" mb={2} mt={2} textAlign={'center'}>
              We&rsquo;re still building!!
            </Typography>
            <Typography mb={2} mt={2}>
              We have been happy to launch our initial phase of Rent My VR, however, we know there is still so much work to be done to bring
              you the most benefits from our online directory. Take a look at what we have on our COMING SOON road map!
            </Typography>
            {contents.map((content, i) => (
              <Grid item key={i} sm={12} md={12} mb={2}>
                <Typography display="inline" variant="h5">
                  {content.title} &nbsp;
                </Typography>
                <Typography display="inline">{content.content}</Typography>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Grid>

      {/* <Grid container spacing={2} mt={60} justifyContent="center" alignItems="center"> */}
      {/* <Grid container spacing={2} pt={{ xs: 115, sm: 60, md: 31, lg: 31 }} pl={4} pr={2} justifyContent="center" alignItems="center">
        <Grid item sm={12} md={10}>
          <Stack spacing={0} justifyContent="center" alignItems="center">
            <Grid item sm={12} md={10}>
              <Typography display="inline" variant="h2" color="#1890ff">
                FEATURED&nbsp;
              </Typography>
              <Typography display="inline" variant="h2">
                LOCATIONS
              </Typography>
            </Grid>
            <ThemeProvider theme={underlineTheme}>
              <Grid></Grid>
            </ThemeProvider>
            <Typography>
              This looks like a bug to me (or at least missing a feature that is reasonable for developers to expect to be there).The issue
              is that Select doesn&rsquo;t define any styles of its own at the root level, so it doesn&rsquo;t leverage the code (which
              would be a call to MUI&rsquo;s styled such as here for the select class) that would take care of looking at the theme and
              applying the corresponding style overrides. I recommend logging an issue.
            </Typography>
          </Stack>
        </Grid>
      </Grid> */}

      {/* <Grid container spacing={2} my={5} pl={4} pr={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={12} md={10}>
          <Grid container spacing={2} pt={4}>
            <Grid item xs={12} sm={6} md={6}>
              <Card elevation={12} square>
                <ThemeProvider theme={cardTheme}>
                  <CardContent className="single" sx={{ p: '0!important' }}>
                    <CardMedia sx={{ height: 340, width: '100%', m: 0 }} image="/assets/images/1200x375.png" title="Some title" />
                    <ThemeProvider theme={locationOverlayTheme}>
                      <Grid className="locationOverlay">
                        <Box className="overlayText">
                          <NextLink href={'/'} passHref>
                            <Link className="headerLink" color="white" underline="none">
                              New York
                            </Link>
                          </NextLink>
                          <Typography>The World Largest City</Typography>
                        </Box>
                      </Grid>
                    </ThemeProvider>
                  </CardContent>
                </ThemeProvider>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Card elevation={12} square>
                <ThemeProvider theme={cardTheme}>
                  <CardContent className="single" sx={{ p: '0!important' }}>
                    <CardMedia sx={{ height: 340, width: '100%', m: 0 }} image="/assets/images/1200x375.png" title="Some title" />
                    <ThemeProvider theme={locationOverlayTheme}>
                      <Grid className="locationOverlay">
                        <Box className="overlayText">
                          <NextLink href={'/'} passHref>
                            <Link className="headerLink" color="white" underline="none">
                              New York
                            </Link>
                          </NextLink>
                          <Typography>The World Largest City</Typography>
                        </Box>
                      </Grid>
                    </ThemeProvider>
                  </CardContent>
                </ThemeProvider>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={2} pt={4}>
            <Grid item xs={12} sm={12} md={4}>
              <Card elevation={12} square>
                <ThemeProvider theme={cardTheme}>
                  <CardContent className="single" sx={{ p: '0!important' }}>
                    <CardMedia sx={{ height: 340, width: '100%', m: 0 }} image="/assets/images/1200x375.png" title="Some title" />
                    <ThemeProvider theme={locationOverlayTheme}>
                      <Grid className="locationOverlay">
                        <Box className="overlayText">
                          <NextLink href={'/'} passHref>
                            <Link className="headerLink" color="white" underline="none">
                              New York
                            </Link>
                          </NextLink>
                          <Typography>The World Largest City</Typography>
                        </Box>
                      </Grid>
                    </ThemeProvider>
                  </CardContent>
                </ThemeProvider>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Card elevation={12} square>
                <ThemeProvider theme={cardTheme}>
                  <CardContent className="single" sx={{ p: '0!important' }}>
                    <CardMedia sx={{ height: 340, width: '100%', m: 0 }} image="/assets/images/1200x375.png" title="Some title" />
                    <ThemeProvider theme={locationOverlayTheme}>
                      <Grid className="locationOverlay">
                        <Box className="overlayText">
                          <NextLink href={'/'} passHref>
                            <Link className="headerLink" color="white" underline="none">
                              New York
                            </Link>
                          </NextLink>
                          <Typography>The World Largest City</Typography>
                        </Box>
                      </Grid>
                    </ThemeProvider>
                  </CardContent>
                </ThemeProvider>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Card elevation={12} square>
                <ThemeProvider theme={cardTheme}>
                  <CardContent className="single" sx={{ p: '0!important' }}>
                    <CardMedia sx={{ height: 340, width: '100%', m: 0 }} image="/assets/images/1200x375.png" title="Some title" />
                    <ThemeProvider theme={locationOverlayTheme}>
                      <Grid className="locationOverlay">
                        <Box className="overlayText">
                          <NextLink href={'/'} passHref>
                            <Link className="headerLink" color="white" underline="none">
                              New York
                            </Link>
                          </NextLink>
                          <Typography>The World Largest City</Typography>
                        </Box>
                      </Grid>
                    </ThemeProvider>
                  </CardContent>
                </ThemeProvider>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}

      {/* <Grid container spacing={2} mt={16} justifyContent="center" alignItems="center">
        <Grid item sm={12} md={10}></Grid>
        <Grid item xs={12} sm={10} lg={9}>
          <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
            <ContactForm />
          </Container>
        </Grid>
      </Grid> */}

      <ScrollTop>
        <Fade in={trigger} color="primary">
          <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
            <Fab size="medium" aria-label="scroll back to top">
              <UpSquareFilled sx={{ fontSize: 40 }} />
            </Fab>
          </Box>
        </Fade>
      </ScrollTop>
    </Page>
  );
};

Index.getLayout = function getLayout(page) {
  return <Layout variant="simple">{page}</Layout>;
};

export default Index;
