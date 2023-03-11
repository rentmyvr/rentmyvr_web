// material-ui
import { Box, Fab, Fade, Grid, Stack, Typography, useScrollTrigger, Button, Link } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/Page';
import ScrollTop from 'components/ScrollTop';
import NextLink from 'next/link';

// assets
import { UpOutlined } from '@ant-design/icons';

const Company = () => {
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
            <img style={{ width: '100%' }} src="/assets/images/company.png" alt="" />
          </Grid>
          <Grid item sm={10} md={8} xs={9} mb={5}>
            <Typography variant="h2" mb={2} mt={2} textAlign={'center'}>
              Why List With Us?
            </Typography>
            <Typography mb={2} mt={2} sx={{ fontSize: { md: '1rem', sm: '1rem', xs: '0.875rem' } }}>
              One of the challenges with starting a vacation rental management company is finding ways to connect with prospective owners to
              grow your portfolio. Finding an accessible online directory of short term rental management companies is a challenge for
              owners. While its a referral based business, often times, owners want to interview a couple management companies to compare
              service offerings and pricing. We make it easy! We aim to provide the largest online directory of vacation rental management
              companies.
            </Typography>
            <Typography mb={2} mt={2} sx={{ fontSize: { md: '1rem', sm: '1rem', xs: '0.875rem' } }}>
              Sign up and easily add your Management Directory Listing. Start driving more traffic to your vacation rental management
              business today.
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

Company.getLayout = function getLayout(page) {
  return <Layout variant="simple">{page}</Layout>;
};

export default Company;
