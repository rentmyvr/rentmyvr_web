import PropTypes from 'prop-types';

// next
import NextLink from 'next/link';

// material-ui
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Container,
  Grid,
  InputLabel,
  Link,
  // Paper,
  Stack,
  TextField,
  Typography
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
import ContactForm from 'sections/contact-us/ContactForm';
// import ContactHeader from 'sections/contact-us/ContactHeader';

// assets
import { AppleFilled, BankFilled, HomeFilled, ShoppingFilled, TagFilled } from '@ant-design/icons';
// import Image from 'next/image';

// ==============================|| CONTACT US - MAIN ||============================== //
let items = [
  {
    name: 'Random Name #1',
    description: 'Probably the most random thing you have ever seen!',
    img: '/assets/images/slide1.jpg'
  },
  {
    name: 'Random Name #2',
    description: 'Hello World 2!',
    img: '/assets/images/slide2.jpg'
  },
  {
    name: 'Random Name #3',
    description: 'Hello World 3!',
    img: '/assets/images/slide2.jpg'
  },
  {
    name: 'Random Name #4',
    description: 'Hello World 4!',
    img: '/assets/images/slide2.jpg'
  }
];

const CarouselItem = ({ item }) => {
  return (
    <Grid
      container
      spacing={12}
      justifyContent="center"
      alignItems="center"
      sx={{ height: '600px', backgroundImage: `url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      mt={0}
    >
      <Grid item xs={12} sm={10}>
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <Button>Check it out!</Button>
      </Grid>
    </Grid>
  );
};

CarouselItem.propTypes = {
  item: PropTypes.object
};

const themeOverrides = createTheme({
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

const ContactUS = () => {
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
    <Page title="Contact Us">
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
        <Grid container spacing={2} pl={4} pr={2} py={4} direction="row" sx={{ backgroundColor: '#1890ff' }}>
          <Grid item sm={12} md={2}>
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
          <Grid item sm={12} md={2}>
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
          <Grid item sm={12} md={2}>
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
          <Grid item sm={12} md={2}>
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
          <Grid item sm={12} md={2}>
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
          <Grid item sm={12} md={2}>
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
                  OUR&nbsp;
                </Typography>
                <Typography display="inline" variant="h2">
                  SERVICES
                </Typography>
              </Grid>
              <ThemeProvider theme={themeOverrides}>
                <Grid></Grid>
              </ThemeProvider>
            </Stack>
          </Grid>
          <Grid item sm={12} md={10}>
            <Stack direction="column" spacing={1.25} pl={4} pr={2}>
              <Typography>
                This looks like a bug to me (or at least missing a feature that is reasonable for developers to expect to be there).The
                issue is that Select doesn&rsquo;t define any styles of its own at the root level, so it doesn&rsquo;t leverage the code
                (which would be a call to MUI&rsquo;s styled such as here for the select class) that would take care of looking at the theme
                and applying the corresponding style overrides. I recommend logging an issue.
              </Typography>
            </Stack>
          </Grid>
          <Grid item sm={12} md={10}>
            <Stack direction="row" spacing={1.25} pl={4} pr={2} pt={4}>
              <Grid item sm={12} md={4}>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                  <Avatar sx={{ width: 60, height: 60, bgcolor: '#1890ff' }}>
                    <HomeFilled sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h3">Test Message 1</Typography>
                  <Typography>
                    This looks like a bug to me (or at least missing a feature that is reasonable for developers to expect to be there).The
                    issue is that Select doesn&rsquo;t define any styles of its own at the root level, so it doesn&rsquo;t leverage the code
                    (which would be a call to MUI&rsquo;s styled such as here for the select class) that would take care of looking at the
                    theme and applying the corresponding style overrides. I recommend logging an issue.
                  </Typography>
                </Stack>
              </Grid>
              <Grid item sm={12} md={4}>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                  <Avatar sx={{ width: 60, height: 60, bgcolor: '#1890ff' }}>
                    <BankFilled sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h3">Test Message 1</Typography>
                  <Typography>
                    This looks like a bug to me (or at least missing a feature that is reasonable for developers to expect to be there).The
                    issue is that Select doesn&rsquo;t define any styles of its own at the root level, so it doesn&rsquo;t leverage the code
                    (which would be a call to MUI&rsquo;s styled such as here for the select class) that would take care of looking at the
                    theme and applying the corresponding style overrides. I recommend logging an issue.
                  </Typography>
                </Stack>
              </Grid>
              <Grid item sm={12} md={4}>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                  <Avatar sx={{ width: 60, height: 60, bgcolor: '#1890ff' }}>
                    <AppleFilled sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h3">Test Message 1</Typography>
                  <Typography>
                    This looks like a bug to me (or at least missing a feature that is reasonable for developers to expect to be there).The
                    issue is that Select doesn&rsquo;t define any styles of its own at the root level, so it doesn&rsquo;t leverage the code
                    (which would be a call to MUI&rsquo;s styled such as here for the select class) that would take care of looking at the
                    theme and applying the corresponding style overrides. I recommend logging an issue.
                  </Typography>
                </Stack>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={5} justifyContent="center" alignItems="center">
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
              <ThemeProvider theme={themeOverrides}>
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
        <Grid item sm={12} md={10}>
          <Stack direction="row" spacing={2} pt={4}>
            <Grid item sm={12} md={4}>
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
            <Grid item sm={12} md={4}>
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
            <Grid item sm={12} md={4}>
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
          </Stack>
        </Grid>
      </Grid>

      <Grid container spacing={2} my={6} justifyContent="center" alignItems="center">
        <ThemeProvider theme={countUpTheme}>
          <Grid item xs={12} sx={{ backgroundColor: 'transparent' }}>
            <Box className="imageOverlay">
              <Stack direction="row" spacing={0} justifyContent="center" alignItems="center">
                <Grid item sm={12} md={4}>
                  <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                    <ShoppingFilled className="icon" />
                    <Typography className="count">
                      <CountUp start={0} end={250} duration={20} />
                    </Typography>
                    <Typography className="sub">Project</Typography>
                  </Stack>
                </Grid>
                <Grid item sm={12} md={4}>
                  <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                    <ShoppingFilled className="icon" />
                    <Typography className="count">
                      <CountUp start={0} end={250} duration={20} />
                    </Typography>
                    <Typography className="sub">Project</Typography>
                  </Stack>
                </Grid>
                <Grid item sm={12} md={4}>
                  <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                    <ShoppingFilled className="icon" />
                    <Typography className="count">
                      <CountUp start={0} end={250} duration={20} />
                    </Typography>
                    <Typography className="sub">Project</Typography>
                  </Stack>
                </Grid>
                <Grid item sm={12} md={4}>
                  <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                    <ShoppingFilled className="icon" />
                    <Typography className="count">
                      <CountUp start={0} end={250} duration={20} />
                    </Typography>
                    <Typography className="sub">Project</Typography>
                  </Stack>
                </Grid>
              </Stack>
            </Box>
          </Grid>
        </ThemeProvider>
      </Grid>

      <Grid container spacing={2} mt={25} justifyContent="center" alignItems="center">
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
            <ThemeProvider theme={themeOverrides}>
              <Grid></Grid>
            </ThemeProvider>
            <Typography>
              This looks like a bug to me (or at least missing a feature that is reasonable for developers to expect to be there). The issue
              is that Select doesn&rsquo;t define any styles of its own at the root level, so it doesn&rsquo;t leverage the code (which
              would be a call to MUI&rsquo;s styled such as here for the select class) that would take care of looking at the theme and
              applying the corresponding style overrides. I recommend logging an issue.
            </Typography>
          </Stack>
        </Grid>

        <Grid item sm={12} md={10}>
          <Stack direction="row" spacing={2} pt={4}>
            <Grid item sm={12} md={6}>
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
            <Grid item sm={12} md={6}>
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
          </Stack>
          <Stack direction="row" spacing={2} pt={4}>
            <Grid item sm={12} md={4}>
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
            <Grid item sm={12} md={4}>
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
            <Grid item sm={12} md={4}>
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
          </Stack>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={16} justifyContent="center" alignItems="center">
        <Grid item sm={12} md={10}></Grid>
        <Grid item xs={12} sm={10} lg={9}>
          <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
            <ContactForm />
          </Container>
        </Grid>
      </Grid>
    </Page>
  );
};

ContactUS.getLayout = function getLayout(page) {
  return <Layout variant="simple">{page}</Layout>;
};

export default ContactUS;
