import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Page from 'components/Page';

const Contact = () => {
  return (
    <Page
      title="Contact Us"
      sx={{
        overflow: 'hidden',
        backgroundImage: `url(/assets/images/contact.png)`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        height: '100%',
        alignItems: 'center'
      }}
    >
      <Box sx={{ p: { md: 20, xs: 2.5, sm: 0 } }}>
        <Grid
          container
          spacing={5}
          sx={{ p: { md: 5 } }}
          justifyContent="center"
          style={{ backgroundColor: 'rgba(00, 00, 00, .35)', borderRadius: 10, alignItems: 'center', flexDirection: 'column' }}
        >
          <Typography variant="h1" align="center" style={{ color: 'white' }}>
            Contact Us
          </Typography>
          <Grid item xs={12} sm={10} lg={9}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth type="text" placeholder="Name" style={{ backgroundColor: 'white' }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth type="text" placeholder="Company Name" style={{ backgroundColor: 'white' }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth type="email" placeholder="Email Address" style={{ backgroundColor: 'white' }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth type="number" placeholder="Phone Number" style={{ backgroundColor: 'white' }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth multiline rows={4} placeholder="Reason for Inquiry?" style={{ backgroundColor: 'white' }} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={10} lg={9}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1 }} justifyContent="flex-end">
              <Button variant="contained" sx={{ ml: { xs: 0 } }}>
                Submit Now
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
};

export default Contact;
