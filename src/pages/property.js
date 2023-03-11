// material-ui
import { Box, Fab, Fade, Grid, Stack, Typography, useScrollTrigger, Button, Link } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/Page';
import ScrollTop from 'components/ScrollTop';
import NextLink from 'next/link';

// assets
import { UpOutlined } from '@ant-design/icons';

const Property = () => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 800 });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#__next');
    if (anchor) {
      anchor.scrollIntoView({ inline: 'center', behavior: 'smooth' });
    }
  };

  return (
    <Page title="Rent MyVR Home">
      <Grid container spacing={2} mt={6} justifyContent="center" alignItems="center" bgcolor="#f4f8ff">
        <Stack spacing={0} justifyContent="center" alignItems="center">
          <Grid item xs={12} style={{ width: '100%' }}>
            <img style={{ width: '100%' }} src="/assets/images/property.png" alt="" />
          </Grid>
          <Grid item sm={9} md={8} xs={10} mb={5}>
            <Typography variant="h2" mb={2} mt={2} textAlign={'center'}>
              Why List With Us?
            </Typography>
            <Typography mb={2} mt={2} sx={{ fontSize: { md: '1rem', sm: '0.875rem', xs: '0.875rem' } }}>
              Rent My VR is the fastest growing online directory for short term / vacation rentals. We realize many 3rd party booking sites
              offer a variety of features, fee schedules, etc, and as a guest begins to book their stay, they may want to compare and book
              with the site they are most comfortable using. In addition, many owners want to provide a way for a guest to book directly
              with the host or through their own property booking site. We have provided a way to do so.
            </Typography>
            <Typography mb={2} mt={2}>
              We have two types of property listings - Standard and Premium.
            </Typography>
            <Typography mb={2} mt={2}>
              A host can list their property, at no charge, as a Standard Property Directory Listing on Rent My VR. This allows the property
              to show up and link to an external booking site for guests to view and discover your property listing.
            </Typography>
            <Typography mb={2} mt={2}>
              For one annual flat fee, hosts can upgrade to a Premium Property Directory Listing on Rent My VR. This allows for your
              property to be showcased in a more extensive way. We allow additional photos, video links, searchable amenities, and the
              ability to receive direct property inquiries through this type of listing. If you are a Premium Listing customer, you are also
              eligible for our Gold membership, allowing additional Featured Advertising to increase traffic to your property, through our
              site ad space and social media.
            </Typography>
            <Typography variant="h3" mb={2} mt={5} textAlign={'center'}>
              Creating your Standard or Premium Property Directory Listing is easy! Get started by signing up today.
            </Typography>
            <Grid item sm={12} md={4} textAlign="center" style={{ margin: 'auto' }}>
              <NextLink href="/register" passHref>
                <Link className="header-link" color="black" underline="none">
                  <Button size="large" variant="contained" color="primary">
                    Sign up to Get Started
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

Property.getLayout = function getLayout(page) {
  return <Layout variant="simple">{page}</Layout>;
};

export default Property;
