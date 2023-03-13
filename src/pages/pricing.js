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
import CustomButton from 'components/CustomButton';

// project imports
import Layout from 'layout';
import Page from 'components/Page';
import ScrollTop from 'components/ScrollTop';
import NextLink from 'next/link';

// assets
import { UpOutlined } from '@ant-design/icons';

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

  const rows = [
    createData('Free Support', true, true),
    createData('Main Image Upload', true, true),
    createData('Host Dashboard', true, true),
    createData('Property Basics', true, true),
    createData('Calendar Synchronization', true, true),
    createData("Link to Property's Social Sites", false, true),
    createData('Link to All Property Booking Sites', false, true),
    createData('Preferred Listing Placement', false, true),
    createData('Property Description', false, true),
    createData('Unlimited Inquiries/ Leads through Contact Button', false, true),
    createData('Unlimited Images', false, true),
    createData('Link to Video or Virtual Tour', false, true),
    createData('Advanced Amenities and Categories', false, true),
    createData('Advanced Search Functionality', false, true)
  ];

  return (
    <Page title="Rent MyVR Home">
      <Grid container spacing={2} mt={6} justifyContent="center" alignItems="center" bgcolor="#f4f8ff">
        <Stack spacing={0} justifyContent="center" alignItems="center" style={{ width: '100%' }}>
          <Grid item style={{ width: '100%' }}>
            <img style={{ width: '100%' }} src="/assets/images/pricing.png" alt="" />
          </Grid>
          <Grid item sm={10} md={10} xs={10} mt={5} ml={2}>
            <Typography mb={5} variant="h4" style={{ textAlign: 'center' }}>
              Whether you are looking to drive more traffic to your management company or your property listing, check out our flex pricing
              module below.
            </Typography>
            <Typography mb={1} sx={{ fontSize: { md: '1.2rem', sm: '1.2rem', xs: '1rem' }, textAlign: 'center' }}>
              Sign up to create an account for free. List an unlimited number of standard property listings for free
            </Typography>
            <Typography mb={1} sx={{ fontSize: { md: '1.2rem', sm: '1.2rem', xs: '1rem' }, textAlign: 'center' }}>
              {' '}
              No hidden fees, booking commissions, or fees to the host or the guest.
            </Typography>
            <Typography mb={1} sx={{ fontSize: { md: '1.2rem', sm: '1.2rem', xs: '1rem' }, textAlign: 'center' }}>
              Boost your listing by upgrading to a premium property listing, and choose the pricing module that best suits you.
            </Typography>
            <Typography mb={4} sx={{ fontSize: { md: '1.2rem', sm: '1.2rem', xs: '1rem' }, textAlign: 'center' }}>
              Whether you are looking to drive more traffic to your management company or your property listing, check out our flex pricing
              module below.
            </Typography>
            <ul style={{ fontSize: '1.1rem', paddingLeft: '3rem' }}>
              <li>
                <Box>
                  List your company/{' '}
                  <Box fontWeight="800" display="inline">
                    One time fee - $159 per year
                  </Box>
                </Box>
              </li>
              <li>
                <Box>
                  List a property/{' '}
                  <Box fontWeight="800" display="inline">
                    $129 per year flat fee OR $29 monthly option
                  </Box>
                </Box>
              </li>
              <li>
                <Box>
                  Our team can input your listing for you for a one time setup charge/{' '}
                  <Box fontWeight="800" display="inline">
                    $39 per property
                  </Box>
                </Box>
              </li>
            </ul>
          </Grid>
          <Grid item style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} my={3}>
            <Typography mb={2} variant="h4">
              Create an Account and Start Listing!
            </Typography>
            <NextLink href="/register" passHref>
              <Link className="header-link" color="black" underline="none">
                <CustomButton text="Get Started" />
              </Link>
            </NextLink>
          </Grid>
          <Grid item sm={12} md={8} mb={2} xs={12} ml={3} mr={1}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: '#dcd8d8' }}>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="right" style={{ textTransform: 'none', fontSize: '0.9rem' }}>
                      Standard Listing
                    </TableCell>
                    <TableCell align="right" style={{ textTransform: 'none', fontSize: '0.9rem' }}>
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
                      <TableCell align="center">
                        {(row.standard && (
                          <img style={{ width: '20px', height: '20px' }} src="/assets/images/icons/check.png" alt="" />
                        )) || <img style={{ width: '15px', height: '15px' }} src="/assets/images/icons/close.png" alt="" />}
                      </TableCell>
                      <TableCell align="center">
                        {(row.premium && <img style={{ width: '20px', height: '20px' }} src="/assets/images/icons/check.png" alt="" />) || (
                          <img style={{ width: '15px', height: '15px' }} src="/assets/images/icons/close.png" alt="" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item sm={9} md={8} xs={10} mb={2} ml={2}>
            <Typography mb={1} variant="h5">
              Looking to list in bulk?
            </Typography>
            <ul>
              <li>$99 per property per year when listing 20 or more properties</li>
              <li>$79 per property per year when listing 50 or more properties</li>
            </ul>
          </Grid>
          <Grid item sm={12} md={8} mb={3}>
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
