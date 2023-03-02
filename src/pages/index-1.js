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
  useScrollTrigger
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
import { AppleFilled, ShoppingFilled, TagFilled, UpSquareFilled } from '@ant-design/icons';
// import { AppleFilled, BankFilled, HomeFilled, ShoppingFilled, TagFilled, UpSquareFilled } from '@ant-design/icons';
// import Image from 'next/image';

// ==============================|| CONTACT US - MAIN ||============================== //

let items = [
  {
    name: 'Book Direct with Hosts or Compare Rates',
    description: 'Book Direct with Hosts or Compare Rates',
    img: '/assets/images/1500x600/design-83.png',
    btnText: 'Search Here',
    textColor: '#fff'
  },
  {
    name: 'All Listing Links in One Place',
    description: 'Compare rates or compare ratings and reviews all in one place',
    img: '/assets/images/1500x600/design-84.png',
    btnText: 'Start Your Search',
    textColor: '#fff'
  },
  {
    name: 'Find a Company Who Manages Vacation Rentals',
    description: 'Looking to hire a management company? Have questions and need a professional before you book your stay?',
    img: '/assets/images/1500x600/design-85.png',
    btnText: 'Find a Company',
    textColor: '#fff'
  },
  {
    name: 'Rent My VR is Growing',
    description: 'Are you ready to list a property or your vacation rental management company with us?',
    img: '/assets/images/1500x600/design-86.png',
    btnText: 'Get Started',
    textColor: '#fff'
  },
  {
    name: 'Search All Sites With One Search',
    description: 'Book using your preferred platform once you find your dream vacation property',
    img: '/assets/images/1500x600/design-87.png',
    btnText: 'Search Now',
    textColor: '#000'
  },
  {
    name: 'Dreaming of Where To Go Next?',
    description: 'Search by category or amenity and discover themed or unique properties you never knew existed',
    img: '/assets/images/1500x600/design-88.png',
    btnText: 'Find a Property',
    textColor: '#eee'
  },
  {
    name: 'Rates that Leave You Feeling More Relaxed',
    description: 'Find the site offering the lowest rate on a property or check for direct booking options to save',
    img: '/assets/images/1500x600/design-89.png',
    btnText: 'Search Here',
    textColor: '#eee'
  },
  {
    name: 'Take the Hassle Out of the Hunt',
    description: 'Bringing all the online booking sites together to make your search a little better',
    img: '/assets/images/1500x600/design-82.png',
    btnText: 'Search Rentals',
    textColor: '#fff'
  },
  {
    name: 'Book Your Stay the Better Way',
    description: 'Finally, a site where you can view a property’s website, online profiles, social media, and reviews, all in one place',
    img: '/assets/images/1500x600/design-81.png',
    btnText: 'Search Now',
    textColor: '#fff'
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
          backgroundImage: `url(/assets/images/1200x375.jpg)`,
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
        <Grid item xs={12}>
          <Carousel
            next={() => {}}
            prev={() => {}}
            autoPlay={true}
            stopAutoPlayOnHover={true}
            interval={4000}
            animation="slide"
            swipe={true}
            indicators={false}
            navButtonsAlwaysVisible={true}
            navButtonsProps={{ style: { backgroundColor: '#1890ff' } }}
            indicatorIconButtonProps={{ style: { padding: '2px', color: '#eee' } }}
            activeIndicatorIconButtonProps={{ style: { color: '##1890ff' } }}
            // indicatorContainerProps={{ style: { marginTop: '-50px' } }}
            buttonVisible={{ opacity: '1' }}
            buttonHidden={{ opacity: '0' }}
          >
            {items.map((item, i) => (
              <CarouselItem key={i} item={item} />
            ))}
          </Carousel>
          {/* <ContactHeader /> */}
        </Grid>
        <Grid container spacing={2} pl={4} pr={2} pt={0} pb={1} direction="row" sx={{ backgroundColor: '#1890ff' }}>
          <Grid item xs={12} sm={6} md={2}>
            <Stack direction="column" spacing={1.25}>
              <InputLabel htmlFor="property-yelp" sx={{ color: '#fff' }}>
                Arrival Date
              </InputLabel>
              <TextField
                fullWidth
                id="property-yelp"
                placeholder="Yelp Link"
                {...getFieldProps('yelp')}
                error={Boolean(touched.yelp && errors.yelp)}
                helperText={touched.yelp && errors.yelp}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Stack direction="column" spacing={1.25}>
              <InputLabel htmlFor="property-yelp" sx={{ color: '#fff' }}>
                Outgoing Date
              </InputLabel>
              <TextField
                fullWidth
                id="property-yelp"
                placeholder="Yelp Link"
                {...getFieldProps('yelp')}
                error={Boolean(touched.yelp && errors.yelp)}
                helperText={touched.yelp && errors.yelp}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Stack direction="column" spacing={1.25}>
              <InputLabel htmlFor="property-yelp" sx={{ color: '#fff' }}>
                Rooms Date
              </InputLabel>
              <TextField
                fullWidth
                id="property-yelp"
                placeholder="Yelp Link"
                {...getFieldProps('yelp')}
                error={Boolean(touched.yelp && errors.yelp)}
                helperText={touched.yelp && errors.yelp}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Stack direction="column" spacing={1.25}>
              <InputLabel htmlFor="property-yelp" sx={{ color: '#fff' }}>
                Arrival Date
              </InputLabel>
              <TextField
                fullWidth
                id="property-yelp"
                placeholder="Yelp Link"
                {...getFieldProps('yelp')}
                error={Boolean(touched.yelp && errors.yelp)}
                helperText={touched.yelp && errors.yelp}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Stack direction="column" spacing={1.25}>
              <InputLabel htmlFor="property-yelp" sx={{ color: '#fff' }}>
                Arrival Date
              </InputLabel>
              <TextField
                fullWidth
                id="property-yelp"
                placeholder="Yelp Link"
                {...getFieldProps('yelp')}
                error={Boolean(touched.yelp && errors.yelp)}
                helperText={touched.yelp && errors.yelp}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Stack direction="column" spacing={1.25}>
              <InputLabel htmlFor="property-yelp" sx={{ color: '#fff' }}>
                Arrival Date
              </InputLabel>
              <TextField
                fullWidth
                id="property-yelp"
                placeholder="Yelp Link"
                {...getFieldProps('yelp')}
                error={Boolean(touched.yelp && errors.yelp)}
                helperText={touched.yelp && errors.yelp}
              />
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={5} justifyContent="center" alignItems="center">
          <Grid item sm={12} md={10}>
            <Stack spacing={0} justifyContent="center" alignItems="center">
              <Grid item sm={12} md={10}>
                <Typography display="inline" variant="h2" color="#1890ff">
                  THE&nbsp;
                </Typography>
                <Typography display="inline" variant="h2">
                  RENT MY VR WAY
                </Typography>
              </Grid>
              <ThemeProvider theme={underlineTheme}>
                <Grid></Grid>
              </ThemeProvider>
            </Stack>
          </Grid>
          <Grid item sm={12} md={10}>
            <Stack direction="column" alignItems="center" spacing={1.25} pl={4} pr={2}>
              <Typography>
                Finally, an online directory that offers you what you have been asking for. With RentMyVR, you can do SO MUCH MORE!
              </Typography>
            </Stack>
          </Grid>
          <Grid item sm={12} md={10}>
            <Grid container spacing={1.25} pl={4} pr={2} pt={4}>
              <Grid item sm={12} md={4}>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                  <Avatar sx={{ width: 60, height: 60, bgcolor: '#1890ff' }}>
                    {/* <HomeFilled sx={{ fontSize: 40 }} /> */}
                    <Rent_1 color="primary" />
                  </Avatar>
                  <Typography variant="h3">Search Rental</Typography>
                  <Typography>
                    Guests can save money when the host offers discounts for direct booking. Search vacation rentals and compare pricing on
                    the hosts&apos; different booking platforms. Narrow your search by filtering the sites you prefer to book through and
                    easily check out a property&apos;s photos and reviews on all sites conveniently located on the property profile.
                  </Typography>
                </Stack>
              </Grid>
              <Grid item sm={12} md={4}>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                  <Avatar sx={{ width: 60, height: 60, bgcolor: '#1890ff' }}>
                    {/* <BankFilled sx={{ fontSize: 40 }} /> */}
                    <Rent_2 color="warning" />
                  </Avatar>
                  <Typography variant="h3">Search Management Companies</Typography>
                  <Typography>
                    Looking for a professional who specializes in short term rentals in the area you are traveling to? Search our online
                    directory of Short Term and Vacation Rental Management Companies
                  </Typography>
                </Stack>
              </Grid>
              <Grid item sm={12} md={4}>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                  <Avatar sx={{ width: 60, height: 60, bgcolor: '#1890ff' }}>
                    <AppleFilled sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h3">Why List With Us</Typography>
                  <Typography>
                    Looking to Increase exposure, online traffic, and bookings to your vacation rental? Interested in driving traffic to
                    your personal booking site, rather than using a 3rd party booking site?
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={5} pl={4} pr={2} justifyContent="center" alignItems="center">
          <Grid item sm={12} md={10}>
            <Stack spacing={0} justifyContent="center" alignItems="center">
              <Grid item sm={12} md={10}>
                <Typography display="inline" variant="h2" color="#1890ff">
                  BEST&nbsp;
                </Typography>
                <Typography display="inline" variant="h2">
                  SELLING
                </Typography>
              </Grid>
              <ThemeProvider theme={underlineTheme}>
                <Grid></Grid>
              </ThemeProvider>
              <Typography>
                This looks like a bug to me (or at least missing a feature that is reasonable for developers to expect to be there).The
                issue is that Select doesn&rsquo;t define any styles of its own at the root level, so it doesn&rsquo;t leverage the code
                (which would be a call to MUI&rsquo;s styled such as here for the select class) that would take care of looking at the theme
                and applying the corresponding style overrides. I recommend logging an issue.
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={10}>
          <Grid container spacing={2} pl={4} pr={2} pt={4}>
            <Grid item xs={12} sm={12} md={4}>
              <Card elevation={12} square>
                <CardMedia sx={{ height: 240, m: 1.5, mb: 0 }} image="/assets/images/600x450.jpg" title="green iguana" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lovely Home
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 300 }}>
                    <TagFilled /> The location
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 300 }}>
                    The location
                  </Typography>
                </CardContent>
                <CardActions>
                  {/* <Button size="small">Share</Button> */}
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Card elevation={12} square>
                <CardMedia sx={{ height: 240, m: 1.5, mb: 0 }} image="/assets/images/600x450.jpg" title="green iguana" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lovely Home
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 300 }}>
                    <TagFilled /> The location
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 300 }}>
                    The location
                  </Typography>
                </CardContent>
                <CardActions>
                  {/* <Button size="small">Share</Button> */}
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Card elevation={12} square>
                <CardMedia sx={{ height: 240, m: 1.5, mb: 0 }} image="/assets/images/600x450.jpg" title="green iguana" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lovely Home
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 300 }}>
                    <TagFilled /> The location
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 300 }}>
                    The location
                  </Typography>
                </CardContent>
                <CardActions>
                  {/* <Button size="small">Share</Button> */}
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2} my={6} justifyContent="center" alignItems="center">
        <ThemeProvider theme={countUpTheme}>
          <Grid item xs={12} sx={{ backgroundColor: 'transparent' }}>
            <Box className="imageOverlay">
              <Grid container spacing={0} justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={6} md={3}>
                  <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                    <ShoppingFilled className="icon" />
                    <Typography className="count">
                      <CountUp start={0} end={250} duration={20} />
                    </Typography>
                    <Typography className="sub">Project</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                    <ShoppingFilled className="icon" />
                    <Typography className="count">
                      <CountUp start={0} end={250} duration={20} />
                    </Typography>
                    <Typography className="sub">Project</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                    <ShoppingFilled className="icon" />
                    <Typography className="count">
                      <CountUp start={0} end={250} duration={20} />
                    </Typography>
                    <Typography className="sub">Project</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                    <ShoppingFilled className="icon" />
                    <Typography className="count">
                      <CountUp start={0} end={250} duration={20} />
                    </Typography>
                    <Typography className="sub">Project</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </ThemeProvider>
      </Grid>

      {/* <Grid container spacing={2} mt={60} justifyContent="center" alignItems="center"> */}
      <Grid container spacing={2} pt={{ xs: 115, sm: 60, md: 31, lg: 31 }} pl={4} pr={2} justifyContent="center" alignItems="center">
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
      </Grid>

      <Grid container spacing={2} my={5} pl={4} pr={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={12} md={10}>
          <Grid container spacing={2} pt={4}>
            <Grid item xs={12} sm={6} md={6}>
              <Card elevation={12} square>
                <ThemeProvider theme={cardTheme}>
                  <CardContent className="single" sx={{ p: '0!important' }}>
                    <CardMedia sx={{ height: 340, width: '100%', m: 0 }} image="/assets/images/1200x375.jpg" title="Some title" />
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
                    <CardMedia sx={{ height: 340, width: '100%', m: 0 }} image="/assets/images/1200x375.jpg" title="Some title" />
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
                    <CardMedia sx={{ height: 340, width: '100%', m: 0 }} image="/assets/images/1200x375.jpg" title="Some title" />
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
                    <CardMedia sx={{ height: 340, width: '100%', m: 0 }} image="/assets/images/1200x375.jpg" title="Some title" />
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
                    <CardMedia sx={{ height: 340, width: '100%', m: 0 }} image="/assets/images/1200x375.jpg" title="Some title" />
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
      </Grid>

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
