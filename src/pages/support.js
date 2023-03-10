import { Button, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Page from 'components/Page';
import Image from 'next/image';
import { useState } from 'react';

const Support = () => {
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
    <Page
      title="Contact Us"
      sx={{
        position: 'fixed',
        top: '0%',
        left: '0%',
        width: '100%',
        height: '100%',
        backgroundImage: {
          md: `url(/assets/images/1500x1000/support.png)`,
          sm: `url(/assets/images/1500x1000/support.png)`,
          xs: `url(/assets/images/600x1200/support.png)`
        },
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
      }}
    >
      {/* <Image
        src={'/assets/images/1500x1000/support.png'}
        alt="mantis"
        layout="fill"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, margin: 'auto', minWidth: '50%', minHeight: '50%' }}
      /> */}
      <Box sx={{ p: { md: 21.2, sm: 13.1, xs: 5 } }} mt={0} position="absolute" style={{ width: '100%' }}>
        <Grid
          sx={{ p: { md: 8, sm: 8, xs: 3 } }}
          justifyContent="center"
          style={{ backgroundColor: '#00000055', borderRadius: 10, alignItems: 'center', flexDirection: 'column' }}
        >
          <Typography variant="h1" align="center" style={{ color: 'white' }}>
            Contact Our Support Team
          </Typography>
          <Grid item xs={12} sm={10} lg={9} mt={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth type="text" placeholder="Name*" style={{ backgroundColor: 'white' }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth type="text" placeholder="Company Name" style={{ backgroundColor: 'white' }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth type="email" placeholder="Email Address*" style={{ backgroundColor: 'white' }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth type="number" placeholder="Phone Number" style={{ backgroundColor: 'white' }} />
              </Grid>
              <Grid item xs={12} md={12}>
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
          <Grid item xs={12} sm={10} mt={2}>
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

export default Support;
