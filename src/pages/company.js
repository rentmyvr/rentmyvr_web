// material-ui
import { Box, Fab, Fade, Grid, Stack, Typography, useScrollTrigger, Button } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/Page';
import ScrollTop from 'components/ScrollTop';

// assets
import { UpSquareFilled } from '@ant-design/icons';

const Index = () => {
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
          <Grid item xs={12}>
            <img style={{ width: '100%' }} src="/assets/images/List Your Company.png" alt="" />
          </Grid>
          <Grid item sm={12} md={8} mb={5}>
            <Typography mb={2} mt={2}>
              One of the challenges with starting a vacation rental management company is finding ways to connect with prospective owners to
              grow your portfolio. Finding an accessible online directory of short term rental management companies is a challenge for
              owners. While its a referral based business, often times, owners want to interview a couple management companies to compare
              service offerings and pricing. We make it easy! We aim to provide the largest online directory of vacation rental management
              companies.
            </Typography>
            <Typography mb={2} mt={2}>
              Sign up and easily add your Management Directory Listing. Start driving more traffic to your vacation rental management
              business today.
            </Typography>
            <Grid item sm={12} md={4} textAlign="center" style={{ margin: 'auto' }}>
              <Button size="large" variant="contained" color="primary">
                Sign up to Get Started
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Grid>

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
