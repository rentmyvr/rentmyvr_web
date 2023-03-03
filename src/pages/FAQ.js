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

let faqsForGuests = [
  {
    question: 'What is Rent My VR?',
    answer:
      'Rent My VR is an company operating out of Arizona, founded by long time veterans of the real estate and vacation rental industry. Since formation, we have helped connect our users/guests to houses, condos, cottages, cabins and vacation rental properties in the US. Rent My VR’s Property Directory listings are provided by either export partnerships, listed by the host, or referred to us. At this time, we do not facilitate any bookings on our website. We instead refer the guest directly to the host or to the platform of their choice to book their stay and complete the transaction. Our aim is to provide a one stop shop place to compare rates, direct booking options, and reviews for each property. '
  },
  {
    question: 'What if I need to Change or Cancel My Reservation?',
    answer:
      'Please refer back to the website you used to make the booking. We provide the link to the websites available for each property, in one easy to search directory, however, we do not facilitate the booking, nor do we have access to any of the booking information.'
  },
  {
    question: 'Does Rent My VR charge fees to book a stay at a property?',
    answer:
      'Rent My VR does not charge a fee to the guest. Our aim is to make searching properties and choosing an OTA vs direct booking easier. We seek to allow the guest to make an educated decision by comparing rates and reviews on different platforms. We see the listing on our site as a marketing expense to the host, and want to create an easy search and book experience for the end user. '
  },
  {
    question: 'What is Rent My VR’s Cancellation policy?',
    answer:
      'Rent My VR is not involved in the booking of a reservation and does not institute a cancellation policy; please refer to the site you used to book your stay. For cancellation of a property or management company directory listing, you are able to login and deactivate a property at any time. We do not offer a refund for early deactivation of listings. '
  },
  {
    question: 'Do you do guest screening? ',
    answer:
      'We do not. We only seek to connect guests and travelers with the sites they prefer to use to book their stay. Hosts are responsible for doing their own guest checks and screening. '
  },
  {
    question: 'Is Listing Data on Your Site Up to Date and Reliable? ',
    answer:
      'Property listings on our site either consist of limited data on a standard listing or detailed data on a premium listing. These listings include photos and the amenities offered with the property. We receive this data from our partners, directly from the hosts, or from our referral sources. We aim to display accurate property information, however, Rent My VR is not liable for the accuracy of information posted in a listing. Please verify and contact the property owner or manager/ host directly through the site you intend to use for booking. In the event that you suspect a listing is not a legitimate property listing, please report it immediately. Rent My VR takes potential scams very seriously, and will review and deactivate properties until ownership and legitimacy is documented and confirmed. '
  }
];

let faqsForHosts = [
  {
    question: 'Is Listing Data on Your Site Up to Date and Reliable? ',
    answer:
      'Property listings on our site either consist of limited data on a standard listing or detailed data on a premium listing. These listings include photos and the amenities offered with the property. We receive this data from our partners, directly from the hosts, or from our referral sources. We aim to display accurate property information, however, Rent My VR is not liable for the accuracy of information posted in a listing. Please verify and contact the property owner or manager/ host directly through the site you intend to use for booking. In the event that you suspect a listing is not a legitimate property listing, please report it immediately. Rent My VR takes potential scams very seriously, and will review and deactivate properties until ownership and legitimacy is documented and confirmed. '
  },
  {
    question: ' What is Rent My VR?',
    answer:
      'Rent My VR is an company operating out of Arizona, founded by long time veterans of the real estate and vacation rental industry. Since formation, we have helped connect our users/guests to houses, condos, cottages, cabins and vacation rental properties in the US. Rent My VR’s Property Directory listings are provided by either export partnerships, listed by the host, or referred to us. At this time, we do not facilitate any bookings on our website. We instead refer the guest directly to the host or to the platform of their choice to book their stay and complete the transaction. Our aim is to provide a one stop shop place to compare rates, direct booking options, and reviews for each property. '
  },

  {
    question: 'Who Can List Their Property?',
    answer:  'Owners, co-hosts, and management companies are all able to list on our site. We do NOT verify any licensing requirements or restrictions by state to constitute a “management company,” so when viewing a management directory listing, please consider any legal requirements that may be necessary when screening a company to potentially manage your property. '
  },

  {
    question:'Where Does My Property Need To Be Located?',
    answer:   'Rent My VR knew one thing when planning our launch and growth strategy - you can’t do everything well, but you can do some things exceptionally. In an effort to provide exceptional customer service and support, we had to come up with a growth strategy that is calculated, paced, and intentional. For this reason, we are currently only located in the United States. We know there is a large demand for an international market. Be on the lookout for expansion outside of the US with a target for full global coverage by 2026. '
  },
  {
    question:'Why doesn’t Rent My VR offer payment processing for bookings?',
    answer:  'We are a directory of listings, but we want the owner/manager to use the payment option of their choice. We know hosts already have this part of the process in place, and we seek to drive potential guests to view their property, but then allow the guest to book through their preferred platform. We are not involved with the payment or booking process. '
  },

  {
    question:'Do you do guest screening?',
    answer:  'We do not. We only seek to connect guests and travelers with the sites they prefer to use to book their stay. Hosts are responsible for doing their own guest checks and screening.'
  },

  {
    question:'How are you building traffic and SEO for Rent My VR? ',
    answer:  'Where should we start? We have taken a multifaceted approach to SEO, as we know this site is only worth the response and traffic it gets from the end user. Our approach includes traditional SEO, Ads, social media promotion, organic traffic through additional partners and sites and backend SEO to the maximum reach.'
  },

  {
    question:'Will I see the email and phone number for my inquiries?',
    answer:  'You can see the emails or phone numbers as these are required input fields on an inquiry form. We keep your email confidential until you have replied to your guest from your email client. In this way, we are able to cut down on the potential spam from someone scraping our site. However, once you have determined a message has come from a legitimate guest, you are able to contact them through your preferred method.'
  },

  {
    question:'Is there a cost to be listed on Rent My VR?',
    answer:  'We offer a free account that includes the ability to upload free standard listings. Premium membership listings will have additional functionality and added visibility. These listings do have a cost, and you can choose a monthly or annual subscription. '
  },

  {
    question:'What is Rent My VR’s Cancellation policy?',
    answer:  'Rent My VR is not involved in the booking of a reservation and does not institute a cancellation policy; please refer to the site you used to book your stay. For cancellation of a property or management company directory listing, you are able to login and deactivate a property at any time. We do not offer a refund for early deactivation of listings.'
  },

  {
    question:'How many images can I upload to a listing? ',
    answer:  'Standard listings only allow for a single photo upload. These listings are free, and the guest is able to easily click to their preferred website link to view the additional listing photos. Premium listings offer up to 99 photos as an added benefit. '
  },

  {
    question:'Do I Really Need Photos?',
    answer: 'Yes! Listings are sorted by photos. In fact, we won’t approve your listing unless you have at least 1 photo! Standard listings appear below the section for premium listings, so we highly encourage upgrading your listing to allow for more photos. Properties with more photos will appear above properties with less photos. In addition, photos will help with the percentage of people who actually choose to book! The more photos, the better.'
  },

  {
    question:'How did my listing end up on your site?',
    answer:  'We have listed your property either at your request or through a partnership with an OTA or channel manager. You may have also been referred to us through our network for a comp listing. Opting out is easy. Should you decide you do not want the increased traffic and bookings from Rent My VR, you were provided login access upon your listing going live. You are able to login to deactivate or you can Contact Us, and we can deactivate for you. We hope this never happens, but we understand sometimes things come up, and properties are sold or converted to long term rentals. Our solutions team is standing by to assist you with these edits and changes.'
  },

  {
    question:'Is Listing Data on Your Site Up to Date and Reliable? ',
    answer:  'Property listings on our site either consist of limited data on a standard listing or detailed data on a premium listing. These listings include photos and the amenities offered with the property. We receive this data from our partners, directly from the hosts, or from our referral sources. We aim to display accurate property information, however, Rent My VR is not liable for the accuracy of information posted in a listing. Please verify and contact the property owner or manager/ host directly through the site you intend to use for booking. In the event that you suspect a listing is not a legitimate property listing, please report it immediately. Rent My VR takes potential scams very seriously, and will review and deactivate properties until ownership and legitimacy is documented and confirmed. '
  },

  {
    question:'What Size Do My Photos Need To Be?',
    answer:  'Minimum width: 720 px, Minimum height: 480 px'
  },

  {
    question:'Should I continue to list with VRBO, AirBNB, etc?',
    answer:  'We complement your marketing efforts on other sites. We hope to bring you enough value and transparency with analytics that you are soon able to make a determination of where your best spent dollars are going. With Rent My VR, you can compare and contrast as one more way to track which sites guests are likely to click on making it easy to identify if you are losing traffic due to an OTAs policies. In a perfect world, one solution would work for all of your booking needs, but we know there are several powerful platforms that we seek to partner with, rather than compete with.'
  },

  {
    question:'Why would I list my management company on Rent My VR? ',
    answer:  'Looking to book more bookings and drive more traffic to your properties? Looking to acquire more properties to manage? With Rent My VR, you can do both through our Management Directory Listings. We are quickly growing to become the largest online directory of management companies for short term/ vacation rental properties. Get started at the sign up tab, create a login, and immediately add and edit your company s listing. '
  },

  {
    question:'Do you have any special pricing or promotions?',
    answer: 'As a new company, we have been running founder’s promotions to ensure our site offers maximum inventory for potential guests. Our promotions are changing as quickly as our team is building and adding features, and we will often run beta test promotions for our users. Feel free to reach out to our support team here to inquire about any current promotions.'
  }
];

let items = [
  {
    name: 'Book Direct with Hosts or Compare Rates',
    description: 'Search listings that offer direct booking from the host and save',
    img: '/assets/images/1500x600/image-1.png',
    btnText: 'Search Here',
    textColor: '#fff'
  },
  {
    name: 'All Listing Links in One Place',
    description: 'Compare rates or compare ratings and reviews all in one place',
    img: '/assets/images/1500x600/image-2.png',
    btnText: 'Start Your Search',
    textColor: '#fff'
  },
  {
    name: 'Find a Company Who Manages Vacation Rentals',
    description: 'Looking to hire a management company? Have questions and need a professional before you book your stay?',
    img: '/assets/images/1500x600/image-3.png',
    btnText: 'Find a Company',
    textColor: '#fff'
  },
  {
    name: 'Rent My VR is Growing',
    description: 'Are you ready to list a property or your vacation rental management company with us?',
    img: '/assets/images/1500x600/image-4.png',
    btnText: 'Get Started',
    textColor: '#fff'
  },
  {
    name: 'Search All Sites With One Search',
    description: 'Book using your preferred platform once you find your dream vacation property',
    img: '/assets/images/1500x600/image-5.png',
    btnText: 'Search Now',
    textColor: '#000'
  },
  {
    name: 'Dreaming of Where To Go Next?',
    description: 'Search by category or amenity and discover themed or unique properties you never knew existed',
    img: '/assets/images/1500x600/image-6.png',
    btnText: 'Find a Property',
    textColor: '#eee'
  },
  {
    name: 'Rates that Leave You Feeling More Relaxed',
    description: 'Find the site offering the lowest rate on a property or check for direct booking options to save',
    img: '/assets/images/1500x600/image-7.png',
    btnText: 'Search Here',
    textColor: '#eee'
  },
  {
    name: 'Take the Hassle Out of the Hunt',
    description: 'Bringing all the online booking sites together to make your search a little better',
    img: '/assets/images/1500x600/image-8.png',
    btnText: 'Search Rentals',
    textColor: '#fff'
  },
  {
    name: 'Book Your Stay the Better Way',
    description: 'Finally, a site where you can view a property’s website, online profiles, social media, and reviews, all in one place',
    img: '/assets/images/1500x600/image-9.png',
    btnText: 'Search Now',
    textColor: '#fff'
  },
  {
    name: 'No Extra Fees',
    description: 'With Rent My VR, we believe in flat fee based listings and no fee for our guests.',
    img: '/assets/images/1500x600/image-10.png',
    btnText: 'List Now',
    textColor: '#fff'
  },
  {
    name: 'Search All Sites With One Search',
    description: 'Book using your preferred platform once you find your dream vacation property',
    img: '/assets/images/1500x600/image-11.png',
    btnText: 'Search Now',
    textColor: '#fff'
  },
  {
    name: 'Dreaming of Where To Go Next?',
    description: 'Search by category or ammenity and discover themed or unique properties you never knew existed',
    img: '/assets/images/1500x600/image-12.png',
    btnText: 'Find a Property',
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
            <img style={{ width: '100%' }} src="/assets/images/Frequently Asked Questions.png" alt="" />
          </Grid>
          <Grid item sm={12} md={8} mb={5}>
            <Typography variant="h2" mb={2} mt={2}>
              FAQs for Guests
            </Typography>
            {faqsForGuests.map((faq, i) => (
              <Accordion key={i}>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                  <Typography>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
            <Typography variant="h2" mb={2} mt={2}>
              FAQs for Hosts
            </Typography>
            {faqsForHosts.map((faq, i) => (
              <Accordion key={i}>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                  <Typography>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
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
