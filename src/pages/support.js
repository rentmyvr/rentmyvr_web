// material-ui
import { Box, Fab, Fade, Grid, Stack, Typography, useScrollTrigger, Button, TextField, MenuItem } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/Page';
import ScrollTop from 'components/ScrollTop';

// assets
import { UpOutlined } from '@ant-design/icons';
import { useState } from 'react';

const Support = () => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 800 });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#__next');
    if (anchor) {
      anchor.scrollIntoView({ inline: 'center', behavior: 'smooth' });
    }
  };
  const [selectedValue, setSelect] = useState(1);
  const handleSelect = (event) => {
    setSelect(Number(event.target?.value));
  };

  const selectItem = [
    {
      value: '1',
      label: 'A Management Company Listing'
    },
    {
      value: '2',
      label: 'A Property Listing'
    },
    {
      value: '3',
      label: 'Other'
    }
  ];

  return (
    <Page title="Support Us">
      <Grid container spacing={2} mt={8} mb={-1} justifyContent="center" alignItems="center" bgcolor="#f4f8ff">
        <Stack spacing={0} justifyContent="center" alignItems="center">
          <Grid item xs={12} style={{ width: '100%' }}>
            <Box
              component="img"
              style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}
              sx={{
                content: {
                  md: `url(/assets/images/1500x600/support.png)`,
                  sm: `url(/assets/images/1500x1000/support.png)`,
                  xs: `url(/assets/images/600x1200/support.png)`
                }
              }}
              alt="Logo"
            />
            <Grid
              style={{ position: 'absolute', top: '90px', width: '100%', display: 'flex', justifyContent: 'center', marginLeft: '16px' }}
            >
              <Grid md={10} sm={10} xs={10}>
                <Grid
                  sx={{ p: { md: 5, sm: 5, xs: 3 } }}
                  justifyContent="center"
                  style={{ backgroundColor: '#00000055', borderRadius: 10, alignItems: 'center', flexDirection: 'column' }}
                >
                  <Typography variant="h1" align="center" style={{ color: 'white' }}>
                    Support
                  </Typography>
                  <Grid item mt={2}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6} sm={6}>
                        <TextField fullWidth type="text" placeholder="Name*" style={{ backgroundColor: 'white' }} />
                      </Grid>
                      <Grid item xs={12} md={6} sm={6}>
                        <TextField fullWidth type="text" placeholder="Company Name" style={{ backgroundColor: 'white' }} />
                      </Grid>
                      <Grid item xs={12} md={6} sm={6}>
                        <TextField fullWidth type="email" placeholder="Email Address*" style={{ backgroundColor: 'white' }} />
                      </Grid>
                      <Grid item xs={12} md={6} sm={6}>
                        <TextField fullWidth type="number" placeholder="Phone Number" style={{ backgroundColor: 'white' }} />
                      </Grid>
                      <Grid item xs={12} md={12} sm={12}>
                        <TextField select fullWidth value={selectedValue} onChange={handleSelect} style={{ backgroundColor: 'white' }}>
                          {selectItem.map((option, index) => (
                            <MenuItem key={index} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={12} sm={12} mt={2}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1 }} justifyContent="flex-end">
                      <Button variant="contained" sx={{ ml: { xs: 0 } }}>
                        Submit Now
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
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

Support.getLayout = function getLayout(page) {
  return <Layout variant="simple">{page}</Layout>;
};

export default Support;
