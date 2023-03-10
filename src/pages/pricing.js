// material-ui
import {
  Box,
  Fab,
  Fade,
  Grid,
  Stack,
  Typography,
  useScrollTrigger,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Link
} from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/Page';
import ScrollTop from 'components/ScrollTop';
import NextLink from 'next/link';

// assets
import { UpOutlined } from '@ant-design/icons';
import { useState } from 'react';

const Pricing = () => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 800 });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#__next');
    if (anchor) {
      anchor.scrollIntoView({ inline: 'center', behavior: 'smooth' });
    }
  };

  function createData(name, standard, premium) {
    return { name, standard, premium };
  }

  const [standardFree, setStandardFree] = useState(true);
  const [standardMainImage, setStandardMainImage] = useState(true);
  const [standardHostDashboard, setStandardHostDashboard] = useState(true);
  const [standardPropertyBasics, setStandardPropertyBasics] = useState(true);
  const [standardCalendarSynch, setStandardCalendarSynch] = useState(true);
  const [standardLinkSocial, setStandardLinkSocial] = useState(true);
  const [standardLinkBooking, setStandardLinkBooking] = useState(true);
  const [standardPreferred, setStandardPreferred] = useState(false);
  const [standardPropertyDesc, setStandardPropertyDesc] = useState(false);
  const [standardUltimateInquiry, setStandardUltimateInquiry] = useState(false);
  const [standardUltimateImage, setStandardUltimateImage] = useState(false);
  const [standardLinkVideo, setStandardLinkVideo] = useState(false);
  const [standardAdvancedAmenties, setStandardAdvancedAmenties] = useState(false);
  const [standardAdvancedSearch, setStandardAdvancedSearch] = useState(false);

  const [premiumFree, setPremiumFree] = useState(true);
  const [premiumMainImage, setPremiumMainImage] = useState(true);
  const [premiumHostDashboard, setPremiumHostDashboard] = useState(true);
  const [premiumPropertyBasics, setPremiumPropertyBasics] = useState(true);
  const [premiumCalendarSynch, setPremiumCalendarSynch] = useState(true);
  const [premiumLinkSocial, setPremiumLinkSocial] = useState(true);
  const [premiumLinkBooking, setPremiumLinkBooking] = useState(true);
  const [premiumPreferred, setPremiumPreferred] = useState(true);
  const [premiumPropertyDesc, setPremiumPropertyDesc] = useState(true);
  const [premiumUltimateInquiry, setPremiumUltimateInquiry] = useState(true);
  const [premiumUltimateImage, setPremiumUltimateImage] = useState(true);
  const [premiumLinkVideo, setPremiumLinkVideo] = useState(true);
  const [premiumAdvancedAmenties, setPremiumAdvancedAmenties] = useState(true);
  const [premiumAdvancedSearch, setPremiumAdvancedSearch] = useState(true);

  const standardChange = (name) => {
    switch (name) {
      case 'Free Support':
        return setStandardFree(!standardFree);
      case 'Main Image Upload':
        return setStandardMainImage(!standardMainImage);
      case 'Host Dashboard':
        return setStandardHostDashboard(!standardHostDashboard);
      case 'Property Basics':
        return setStandardPropertyBasics(!standardPropertyBasics);
      case 'Calendar Synchronization':
        return setStandardCalendarSynch(!standardCalendarSynch);
      case "Link to Property's Social Sites":
        return setStandardLinkSocial(!standardLinkSocial);
      case 'Link to All Property Booking Sites':
        return setStandardLinkBooking(!standardLinkBooking);
      case 'Preferred Listing Placement':
        return setStandardPreferred(!standardPreferred);
      case 'Property Description':
        return setStandardPropertyDesc(!standardPropertyDesc);
      case 'Ultimated Inquiries/ Leads through Contact Button':
        return setStandardUltimateInquiry(!standardUltimateInquiry);
      case 'Ultimated Images':
        return setStandardUltimateImage(!standardUltimateImage);
      case 'Link to Video or Virtual Tour':
        return setStandardLinkVideo(!standardLinkVideo);
      case 'Advanced Amenities and Categories':
        return setStandardAdvancedAmenties(!standardAdvancedAmenties);
      case 'Advanced Search Functionality':
        return setStandardAdvancedSearch(!standardAdvancedSearch);
      default:
        return null;
    }
  };
  const premiumChange = (name) => {
    switch (name) {
      case 'Free Support':
        return setPremiumFree(!premiumFree);
      case 'Main Image Upload':
        return setPremiumMainImage(!premiumMainImage);
      case 'Host Dashboard':
        return setPremiumHostDashboard(!premiumHostDashboard);
      case 'Property Basics':
        return setPremiumPropertyBasics(!premiumPropertyBasics);
      case 'Calendar Synchronization':
        return setPremiumCalendarSynch(!premiumCalendarSynch);
      case "Link to Property's Social Sites":
        return setPremiumLinkSocial(!premiumLinkSocial);
      case 'Link to All Property Booking Sites':
        return setPremiumLinkBooking(!premiumLinkBooking);
      case 'Preferred Listing Placement':
        return setPremiumPreferred(!premiumPreferred);
      case 'Property Description':
        return setPremiumPropertyDesc(!premiumPropertyDesc);
      case 'Ultimated Inquiries/ Leads through Contact Button':
        return setPremiumUltimateInquiry(!premiumUltimateInquiry);
      case 'Ultimated Images':
        return setPremiumUltimateImage(!premiumUltimateImage);
      case 'Link to Video or Virtual Tour':
        return setPremiumLinkVideo(!premiumLinkVideo);
      case 'Advanced Amenities and Categories':
        return setPremiumAdvancedAmenties(!premiumAdvancedAmenties);
      case 'Advanced Search Functionality':
        return setPremiumAdvancedSearch(!premiumAdvancedSearch);
      default:
        return null;
    }
  };
  const rows = [
    createData('Free Support', standardFree, premiumFree),
    createData('Main Image Upload', standardMainImage, premiumMainImage),
    createData('Host Dashboard', standardHostDashboard, premiumHostDashboard),
    createData('Property Basics', standardPropertyBasics, premiumPropertyBasics),
    createData('Calendar Synchronization', standardCalendarSynch, premiumCalendarSynch),
    createData("Link to Property's Social Sites", standardLinkSocial, premiumLinkSocial),
    createData('Link to All Property Booking Sites', standardLinkBooking, premiumLinkBooking),
    createData('Preferred Listing Placement', standardPreferred, premiumPreferred),
    createData('Property Description', standardPropertyDesc, premiumPropertyDesc),
    createData('Ultimated Inquiries/ Leads through Contact Button', standardUltimateInquiry, premiumUltimateInquiry),
    createData('Ultimated Images', standardUltimateImage, premiumUltimateImage),
    createData('Link to Video or Virtual Tour', standardLinkVideo, premiumLinkVideo),
    createData('Advanced Amenities and Categories', standardAdvancedAmenties, premiumAdvancedAmenties),
    createData('Advanced Search Functionality', standardAdvancedSearch, premiumAdvancedSearch)
  ];

  return (
    <Page title="Rent MyVR Home">
      <Grid container spacing={2} mt={6} justifyContent="center" alignItems="center" bgcolor="#f4f8ff">
        <Stack spacing={0} justifyContent="center" alignItems="center" style={{ width: '100%' }}>
          <Grid item style={{ width: '100%' }}>
            <img style={{ width: '100%' }} src="/assets/images/pricing.png" alt="" />
          </Grid>
          <Grid item sm={10} md={8} xs={10} my={5}>
            <Typography my={1}>
              Sign up to create an account for free. List an unlimited number of standard property listings for free -
            </Typography>
            <Typography>- No hidden fees, booking commissions, or fees to the host or the guest.</Typography>
            <Typography mb={1}>
              Boost your listing by upgrading to a premium property listing, and choose the pricing module that best suits you.
            </Typography>
            <Typography mb={1}>
              Whether you are looking to drive more traffic to your management company or your property listing, check out our flex pricing
              module below.
            </Typography>
            <Box mb={1}>
              List your company/{' '}
              <Box fontWeight="800" display="inline">
                One time fee - $159 per year
              </Box>
            </Box>
            <Box mb={1}>
              List a property/{' '}
              <Box fontWeight="800" display="inline">
                $129 per year flat fee OR $29 monthly option
              </Box>
            </Box>
            <Box mb={1}>
              Our team can input your listing for you for a one time setup charge/{' '}
              <Box fontWeight="800" display="inline">
                $39 per property
              </Box>
            </Box>
          </Grid>
          <Grid item sm={12} md={8} mb={2}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="right" style={{ textTransform: 'none' }}>
                      Standard Listing
                    </TableCell>
                    <TableCell align="right" style={{ textTransform: 'none' }}>
                      Premium Listing
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">
                        <input
                          type="checkbox"
                          style={{ width: '16px', height: '16px' }}
                          checked={row.standard}
                          onChange={() => {
                            standardChange(row.name);
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <input
                          type="checkbox"
                          style={{ width: '16px', height: '16px' }}
                          checked={row.premium}
                          onChange={() => {
                            premiumChange(row.name);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item sm={12} md={8} mb={2}>
            <Typography mb={1} variant="h5">
              Looking to list in bulk?
            </Typography>
            <ul>
              <li>$99 per property per year when listing 20 or more properties</li>
              <li>$79 per property per year when listing 50 or more properties</li>
            </ul>
          </Grid>
          <Grid item sm={12} md={8} mb={2}>
            <Grid item style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography mb={2} variant="h4">
                Have a question about Pricing?
              </Typography>
              <NextLink href="/contact" passHref>
                <Link className="header-link" color="black" underline="none">
                  <Button size="large" variant="contained" color="primary">
                    Contact Us
                  </Button>
                </Link>
              </NextLink>
            </Grid>
            <Grid item style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} my={5}>
              <Typography mb={2} variant="h4">
                Create an Account and Start Listing!
              </Typography>
              <NextLink href="/register" passHref>
                <Link className="header-link" color="black" underline="none">
                  <Button size="large" variant="contained" color="primary">
                    Get Started
                  </Button>
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Stack>
      </Grid>

      <ScrollTop>
        <Fade in={trigger} color="primary">
          <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
            <Fab size="medium" aria-label="scroll back to top">
              <UpOutlined sx={{ fontSize: 40 }} />
            </Fab>
          </Box>
        </Fade>
      </ScrollTop>
    </Page>
  );
};

Pricing.getLayout = function getLayout(page) {
  return <Layout variant="simple">{page}</Layout>;
};

export default Pricing;
