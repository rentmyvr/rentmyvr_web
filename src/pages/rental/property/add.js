import PropTypes from 'prop-types';
import { useState } from 'react';

// next
// import { useRouter } from 'next/router';

// material-ui
import {
  // Alert,
  Autocomplete,
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  // FormControl,
  FormControlLabel,
  // FormHelperText,
  Grid,
  InputLabel,
  // MenuItem,
  Radio,
  RadioGroup,
  Stack,
  Step,
  StepLabel,
  Stepper,
  // StepWrapper,
  TextField,
  Typography
} from '@mui/material';

// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import MainCard from 'components/MainCard';

// assets
// import { UploadOutlined } from '@ant-design/icons';

// ==============================|| ADD NEW PRODUCT - MAIN ||============================== //

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

function PropertyAdd({ property = { is_pet_allowed: true } }) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  // const [optional, setOptional] = useState(new Set());

  const TYPES = [
    { id: 'house', label: 'House' },
    { id: 'condo', label: 'Condo' },
    { id: 'studio', label: 'Studio' },
    { id: 'cabin', label: 'Cabin' },
    { id: 'townhouse', label: 'Townhouse' },
    { id: 'hotel', label: 'Hotel' },
    { id: 'cottage', label: 'Cottage' },
    { id: 'bungalow', label: 'Bungalow' },
    { id: 'villa', label: 'Villa' },
    { id: 'caravan', label: 'Caravan' },
    { id: 'camper', label: 'Camper' },
    { id: 'resort', label: 'Resort' },
    { id: 'chalet', label: 'Chalet' },
    { id: 'guest-house', label: 'Guest House' },
    { id: 'farm-house', label: 'Farm House' },
    { id: 'lodge', label: 'Lodge' },
    { id: 'estate', label: 'Estate' },
    { id: 'bed-and-breakfast', label: 'Bed and Breakfast' },
    { id: 'country-house', label: 'Country House' },
    { id: 'boat', label: 'Boat' },
    { id: 'houseboat', label: 'Houseboat' },
    { id: 'yacht', label: 'Yacht' },
    { id: 'barn', label: 'Barn' },
    { id: 'tower', label: 'Tower' },
    { id: 'castle', label: 'Castle' },
    { id: 'historic-home', label: 'Historic Home' },
    { id: 'treehouse', label: 'Treehouse' },
    { id: 'tiny-home', label: 'Tiny Home' },
    { id: 'earth-home', label: 'Earth Home' },
    { id: 'tent', label: 'Tent' },
    { id: 'cave', label: 'Cave' },
    { id: 'yurt', label: 'Yurt' },
    { id: 'ryokan', label: 'Ryokan' },
    { id: 'cycladic', label: 'Cycladic' },
    { id: 'casa-particulars', label: 'Casa Particulars' },
    { id: 'windmill', label: 'Windmill' },
    { id: 'riad', label: 'Riad' },
    { id: 'trulli', label: 'Trulli' },
    { id: 'shepherds-hut', label: "Shepherd's Hut" },
    { id: 'hanok', label: 'Hanok' },
    { id: 'minsus', label: 'Minsus' },
    { id: 'bus', label: 'Bus' },
    { id: 'train-car', label: 'Train Car' },
    { id: 'damusi', label: 'Damusi' },
    { id: 'specialty', label: 'Specialty' }
  ];

  const STATUS = [
    { id: 'entire-house', label: 'Entire House' },
    { id: 'private-room', label: 'Private Room' },
    { id: 'casita-sep-guest-quarters', label: 'Casita/Sep Guest Quarters' }
  ];

  const isStepOptional = (step) => {
    return [].includes(step);
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const isStepFailed = (step) => {
    return [].includes(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const formik = useFormik({
    initialValues: property,
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

  const { errors, touched, handleBlur, handleChange, handleSubmit, getFieldProps, setFieldValue, values } = formik;

  return (
    <Page title="Add Property">
      <MainCard>
        <FormikProvider value={formik}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <DialogTitle>
                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepFailed(index)) {
                      labelProps.optional = (
                        <Typography variant="caption" color="error">
                          Alert message
                        </Typography>
                      );
                      labelProps.error = true;
                    }
                    if (isStepOptional(index)) {
                      labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    if (isStepSkipped(index)) {
                      stepProps.completed = false;
                    }
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </DialogTitle>
              <Divider mt={3} />
              <DialogContent sx={{ p: 3, pt: 6 }}>
                <Grid container spacing={2}>
                  {activeStep === 0 && (
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-name">Name</InputLabel>
                          <TextField
                            fullWidth
                            id="property-name"
                            placeholder="Rental Name"
                            {...getFieldProps('name')}
                            error={Boolean(touched.name && errors.name)}
                            helperText={touched.name && errors.name}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-email">Contact Email</InputLabel>
                          <TextField
                            fullWidth
                            id="property-email"
                            placeholder="Contact Email"
                            {...getFieldProps('email')}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-phone">Contact Phone</InputLabel>
                          <TextField
                            fullWidth
                            id="property-phone"
                            placeholder="Contact Phone"
                            {...getFieldProps('phone')}
                            error={Boolean(touched.phone && errors.phone)}
                            helperText={touched.phone && errors.phone}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-type">Type</InputLabel>
                          <Autocomplete
                            freeSolo
                            disablePortal
                            fullWidth
                            id="property-type"
                            options={TYPES}
                            getOptionLabel={(label) => label.label}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} label="" placeholder="Type" />}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-space">Space</InputLabel>
                          <Autocomplete
                            disablePortal
                            fullWidth
                            id="property-space"
                            options={STATUS}
                            getOptionLabel={(label) => label.label}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} label="" placeholder="Space" />}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-hosted-by">Hosted By</InputLabel>
                          <TextField
                            fullWidth
                            id="property-hosted-by"
                            placeholder="Rental Name"
                            {...getFieldProps('hosted_by')}
                            error={Boolean(touched.hosted_by && errors.hosted_by)}
                            helperText={touched.hosted_by && errors.hosted_by}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-no-of-guest">No of Guest</InputLabel>
                          <TextField
                            fullWidth
                            type="number"
                            id="property-no-of-guest"
                            placeholder="No of Guest"
                            {...getFieldProps('no_of_guest')}
                            error={Boolean(touched.no_of_guest && errors.no_of_guest)}
                            helperText={touched.no_of_guest && errors.no_of_guest}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-no-of-bedrooms">No of Bedrooms</InputLabel>
                          <TextField
                            fullWidth
                            type="number"
                            id="property-no-of-bedrooms"
                            placeholder="No of Bedrooms"
                            {...getFieldProps('no_of_bedrooms')}
                            error={Boolean(touched.no_of_bedrooms && errors.no_of_bedrooms)}
                            helperText={touched.no_of_bedrooms && errors.no_of_bedrooms}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-no-of-bathrooms">No of Bathrooms</InputLabel>
                          <TextField
                            fullWidth
                            type="number"
                            id="property-no-of-bathrooms"
                            placeholder="No of Bathrooms"
                            {...getFieldProps('no_of_bathrooms')}
                            error={Boolean(touched.no_of_bathrooms && errors.no_of_bathrooms)}
                            helperText={touched.no_of_bathrooms && errors.no_of_bathrooms}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-price-night">Ave $ Per Night</InputLabel>
                          <TextField
                            fullWidth
                            type="number"
                            id="property-price-night"
                            placeholder="Ave $ Per Night"
                            {...getFieldProps('price_night')}
                            error={Boolean(touched.price_night && errors.price_night)}
                            helperText={touched.price_night && errors.price_night}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-description">Description</InputLabel>
                          <TextField
                            fullWidth
                            multiline
                            id="property-description"
                            placeholder="Description"
                            {...getFieldProps('description')}
                            error={Boolean(touched.description && errors.description)}
                            helperText={touched.description && errors.description}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-host-note">Host Notes</InputLabel>
                          <TextField
                            fullWidth
                            multiline
                            id="property-host-note"
                            placeholder="Host Notes"
                            {...getFieldProps('host_note')}
                            error={Boolean(touched.host_note && errors.host_note)}
                            helperText={touched.host_note && errors.host_note}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <RadioGroup row name="row-radio-buttons-group">
                            <FormControlLabel
                              // defaultChecked={values.is_pet_allowed}
                              checked={values.is_pet_allowed}
                              value={values.is_pet_allowed}
                              onChange={handleChange}
                              control={<Radio />}
                              label="Pet is Allowed"
                            />
                            <FormControlLabel
                              // defaultChecked={!values.is_pet_allowed}
                              checked={!values.is_pet_allowed}
                              value={values.is_pet_allowed}
                              onChange={handleChange}
                              control={<Radio />}
                              label="Pet Not Allowed"
                            />
                          </RadioGroup>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <RadioGroup row name="property-suitability">
                            <FormControlLabel
                              defaultChecked={values.suitability}
                              // checked={values.suitability}
                              value={values.suitability}
                              onChange={handleChange}
                              control={<Radio />}
                              label="Suitability"
                            />
                            <FormControlLabel
                              defaultChecked={!values.suitability}
                              // checked={!values.suitability}
                              value={values.suitability}
                              onChange={handleChange}
                              control={<Radio />}
                              label="Not Suitability"
                            />
                          </RadioGroup>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-facebook">Facebook Link</InputLabel>
                          <TextField
                            fullWidth
                            id="property-facebook"
                            placeholder="Facebook Link"
                            {...getFieldProps('facebook')}
                            error={Boolean(touched.facebook && errors.facebook)}
                            helperText={touched.facebook && errors.facebook}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-instagram">Instagram Link</InputLabel>
                          <TextField
                            fullWidth
                            id="property-instagram"
                            placeholder="Instagram Link"
                            {...getFieldProps('instagram')}
                            error={Boolean(touched.instagram && errors.instagram)}
                            helperText={touched.instagram && errors.instagram}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-facebook">Tiktok Link</InputLabel>
                          <TextField
                            fullWidth
                            id="property-tiktok"
                            placeholder="Tiktok Link"
                            {...getFieldProps('tiktok')}
                            error={Boolean(touched.tiktok && errors.tiktok)}
                            helperText={touched.tiktok && errors.tiktok}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-twitter">Twitter Link</InputLabel>
                          <TextField
                            fullWidth
                            id="property-twitter"
                            placeholder="Twitter Link"
                            {...getFieldProps('twitter')}
                            error={Boolean(touched.twitter && errors.twitter)}
                            helperText={touched.twitter && errors.twitter}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-google-business">Google Business Link</InputLabel>
                          <TextField
                            fullWidth
                            id="property-google-business"
                            placeholder="Google Business Link"
                            {...getFieldProps('google_business')}
                            error={Boolean(touched.google_business && errors.google_business)}
                            helperText={touched.google_business && errors.google_business}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-yelp">Yelp Link</InputLabel>
                          <TextField
                            fullWidth
                            id="property-yelp"
                            placeholder="Yelp Link"
                            {...getFieldProps('yelp')}
                            error={Boolean(touched.yelp && errors.yelp)}
                            helperText={touched.yelp && errors.yelp}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-booking-site">Booking Sites</InputLabel>
                          <Autocomplete
                            freeSolo
                            fullWidth
                            multiple={true}
                            disablePortal
                            id="property-booking-site"
                            options={[]}
                            value={values.booking_site}
                            onBlur={handleBlur}
                            onChange={(event, newValue) => setFieldValue('booking_site', newValue)}
                            getOptionLabel={(label) => label.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} name="booking_site" placeholder="Select Booking Sites" />}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-booking-site-link">Booking Site Link</InputLabel>
                          <TextField
                            fullWidth
                            id="property-booking-site-link"
                            placeholder="Booking Site Link"
                            {...getFieldProps('booking_site_link')}
                            error={Boolean(touched.booking_site_link && errors.booking_site_link)}
                            helperText={touched.booking_site_link && errors.booking_site_link}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-services">Services</InputLabel>
                          <Autocomplete
                            freeSolo
                            fullWidth
                            multiple={true}
                            disablePortal
                            id="property-services"
                            options={[]}
                            value={values.services}
                            onBlur={handleBlur}
                            onChange={(event, newValue) => setFieldValue('services', newValue)}
                            getOptionLabel={(label) => label.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} name="services" placeholder="Select Services that applies" />}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-spaces">Spaces</InputLabel>
                          <Autocomplete
                            freeSolo
                            fullWidth
                            multiple={true}
                            disablePortal
                            id="property-spaces"
                            options={[]}
                            value={values.spaces}
                            onBlur={handleBlur}
                            onChange={(event, newValue) => setFieldValue('spaces', newValue)}
                            getOptionLabel={(label) => label.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} name="services" placeholder="Select Spaces that applies" />}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-essentials">Essentials</InputLabel>
                          <Autocomplete
                            freeSolo
                            fullWidth
                            multiple={true}
                            disablePortal
                            id="property-essentials"
                            options={[]}
                            value={values.essentials}
                            onBlur={handleBlur}
                            onChange={(event, newValue) => setFieldValue('essentials', newValue)}
                            getOptionLabel={(label) => label.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} name="services" placeholder="Select Essentials that applies" />}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-pets">Pets</InputLabel>
                          <Autocomplete
                            freeSolo
                            fullWidth
                            multiple={true}
                            disablePortal
                            id="property-pets"
                            options={[]}
                            value={values.pets}
                            onBlur={handleBlur}
                            onChange={(event, newValue) => setFieldValue('pets', newValue)}
                            getOptionLabel={(label) => label.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} name="pets" placeholder="Select Pets that applies" />}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-bathrooms">Bathrooms</InputLabel>
                          <Autocomplete
                            freeSolo
                            fullWidth
                            multiple={true}
                            disablePortal
                            id="property-bathrooms"
                            options={[]}
                            value={values.bathrooms}
                            onBlur={handleBlur}
                            onChange={(event, newValue) => setFieldValue('bathrooms', newValue)}
                            getOptionLabel={(label) => label.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} name="bathrooms" placeholder="Select Bathrooms that applies" />}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-kitchens">Kitchens</InputLabel>
                          <Autocomplete
                            freeSolo
                            fullWidth
                            multiple={true}
                            disablePortal
                            id="property-kitchens"
                            options={[]}
                            value={values.kitchens}
                            onBlur={handleBlur}
                            onChange={(event, newValue) => setFieldValue('kitchens', newValue)}
                            getOptionLabel={(label) => label.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} name="kitchens" placeholder="Select Kitchens that applies" />}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-pool-spa">Pool & Spa</InputLabel>
                          <Autocomplete
                            freeSolo
                            fullWidth
                            multiple={true}
                            disablePortal
                            id="property-pool-spa"
                            options={[]}
                            value={values.pool_spa}
                            onBlur={handleBlur}
                            onChange={(event, newValue) => setFieldValue('pool_spa', newValue)}
                            getOptionLabel={(label) => label.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} name="pool_spa" placeholder="Select all that applies" />}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-outsides">Outsides</InputLabel>
                          <Autocomplete
                            freeSolo
                            fullWidth
                            multiple={true}
                            disablePortal
                            id="property-outsides"
                            options={[]}
                            value={values.outsides}
                            onBlur={handleBlur}
                            onChange={(event, newValue) => setFieldValue('outsides', newValue)}
                            getOptionLabel={(label) => label.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} name="outsides" placeholder="Select all that applies" />}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-entertainments">Entertainments</InputLabel>
                          <Autocomplete
                            freeSolo
                            fullWidth
                            multiple={true}
                            disablePortal
                            id="property-entertainments"
                            options={[]}
                            value={values.entertainments}
                            onBlur={handleBlur}
                            onChange={(event, newValue) => setFieldValue('entertainments', newValue)}
                            getOptionLabel={(label) => label.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} name="entertainments" placeholder="Select all that applies" />}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-laundries">Laundries</InputLabel>
                          <Autocomplete
                            freeSolo
                            fullWidth
                            multiple={true}
                            disablePortal
                            id="property-laundries"
                            options={[]}
                            value={values.laundries}
                            onBlur={handleBlur}
                            onChange={(event, newValue) => setFieldValue('laundries', newValue)}
                            getOptionLabel={(label) => label.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} name="laundries" placeholder="Select all that applies" />}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-families">Families</InputLabel>
                          <Autocomplete
                            freeSolo
                            fullWidth
                            multiple={true}
                            disablePortal
                            id="property-families"
                            options={[]}
                            value={values.families}
                            onBlur={handleBlur}
                            onChange={(event, newValue) => setFieldValue('families', newValue)}
                            getOptionLabel={(label) => label.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} name="families" placeholder="Select all that applies" />}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-parking">Parking</InputLabel>
                          <Autocomplete
                            freeSolo
                            fullWidth
                            multiple={true}
                            disablePortal
                            id="property-parking"
                            options={[]}
                            value={values.parking}
                            onBlur={handleBlur}
                            onChange={(event, newValue) => setFieldValue('parking', newValue)}
                            getOptionLabel={(label) => label.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} name="parking" placeholder="Select all that applies" />}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-safeties">Safety</InputLabel>
                          <Autocomplete
                            freeSolo
                            fullWidth
                            multiple={true}
                            disablePortal
                            id="property-safeties"
                            options={[]}
                            value={values.safeties}
                            onBlur={handleBlur}
                            onChange={(event, newValue) => setFieldValue('safeties', newValue)}
                            getOptionLabel={(label) => label.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} name="safeties" placeholder="Select all that applies" />}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-features">Features</InputLabel>
                          <Autocomplete
                            freeSolo
                            fullWidth
                            multiple={true}
                            disablePortal
                            id="property-features"
                            options={[]}
                            value={values.features}
                            onBlur={handleBlur}
                            onChange={(event, newValue) => setFieldValue('features', newValue)}
                            getOptionLabel={(label) => label.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} name="features" placeholder="Select all that applies" />}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-activities">Activities</InputLabel>
                          <Autocomplete
                            freeSolo
                            fullWidth
                            multiple={true}
                            disablePortal
                            id="property-activities"
                            options={[]}
                            value={values.activities}
                            onBlur={handleBlur}
                            onChange={(event, newValue) => setFieldValue('activities', newValue)}
                            getOptionLabel={(label) => label.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} name="activities" placeholder="Select all that applies" />}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-accessibility">Accessibility</InputLabel>
                          <Autocomplete
                            freeSolo
                            fullWidth
                            multiple={true}
                            disablePortal
                            id="property-accessibility"
                            options={[]}
                            value={values.accessibility}
                            onBlur={handleBlur}
                            onChange={(event, newValue) => setFieldValue('accessibility', newValue)}
                            getOptionLabel={(label) => label.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} name="accessibility" placeholder="Select all that applies" />}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  )}

                  {activeStep === 1 && (
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={12}>
                        Second
                      </Grid>
                    </Grid>
                  )}
                  {activeStep === 2 && (
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={12}>
                        Third
                      </Grid>
                    </Grid>
                  )}
                  <Grid item xs={12} sm={12}>
                    {activeStep === steps.length ? (
                      <>
                        <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                          <Box sx={{ flex: '1 1 auto' }} />
                          <Button onClick={handleReset}>Reset</Button>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box sx={{ mt: 4, mb: 2 }}></Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                          <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                            Back
                          </Button>
                          <Box sx={{ flex: '1 1 auto' }} />
                          {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                              Skip
                            </Button>
                          )}
                          <Button onClick={handleNext}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
                        </Box>
                      </>
                    )}
                  </Grid>
                </Grid>
              </DialogContent>
            </Form>
          </LocalizationProvider>
        </FormikProvider>
      </MainCard>
    </Page>
  );
}

PropertyAdd.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

PropertyAdd.propTypes = {
  property: PropTypes.object
};

export default PropertyAdd;
