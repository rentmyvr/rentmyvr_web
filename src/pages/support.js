import { Button, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Page from 'components/Page';
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
        overflow: 'hidden',
        backgroundImage: `url(/assets/images/support.png)`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box sx={{ p: { md: 21.2, sm: 13.1, xs: 18.1 } }} mt={0}>
        <Grid
          sx={{ p: { md: 8, sm: 8, xs: 3 } }}
          justifyContent="center"
          style={{ backgroundColor: '#00000055', borderRadius: 10, alignItems: 'center', flexDirection: 'column' }}
        >
          <Typography variant="h1" align="center" style={{ color: 'white' }}>
            Support
          </Typography>
          <Grid item xs={12} sm={10} lg={9} mt={2}>
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