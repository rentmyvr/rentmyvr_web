import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// next
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

// material-ui
import {
  // Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Chip,
  // Collapse,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  // MenuItem,
  // OutlinedInput,
  // Popover,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Step,
  StepLabel,
  Stepper,
  // StepWrapper,
  TextField,
  Typography
} from '@mui/material';
// import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import MainCard from 'components/MainCard';
import { openSnackbar } from 'store/reducers/snackbar';
import { SlideUp } from 'components/transitions/Slide';
import UploadMultiFile from 'components/third-party/dropzone/MultiFile';

// assets
// import { UploadOutlined } from '@ant-design/icons';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { filter } from 'lodash';
// import { set } from 'date-fns';

// project import
import { fetcher, CORE_EP, CORE_URL, DIRECTORY_EP, errorProcessor, successProcessor, warningProcessor } from 'config';

// ==============================|| ADD NEW PRODUCT - MAIN ||============================== //

const steps = ['Stage 1', 'Stage 2', 'Stage 3'];
const emptyProperty = {
  id: null,
  name: '',
  type: null,
  pictures: [],
  video: null,
  virtual_tour: null,
  space: null,
  hosted_by: '',
  max_no_of_guest: 0,
  no_of_bedrooms: 0,
  no_of_bathrooms: 0,
  is_pet_allowed: true,
  suitability: true,
  description: '',
  host_note: '',
  room_type: null,
  sleeper_type: null,
  price_night: 0.0,
  address: {
    street: '',
    number: '',
    city: '',
    zip_code: ''
  },
  email: '',
  phone: '',
  logo: null,
  accessibility: [],
  activities: [],
  bathrooms: [],
  booking_sites: [],
  social_media: [],
  entertainments: [],
  essentials: [],
  families: [],
  features: [],
  kitchens: [],
  laundries: [],
  outsides: [],
  parking: [],
  pool_spas: [],
  safeties: [],
  spaces: [],
  services: [],
  social_media_label: '',
  cancellation_policy: '',
  stage: 0
};

const BOOKING_SITES = [
  { name: 'air-bnb', label: 'Air BNB' },
  { name: 'vrbo', label: 'VRBO' },
  { name: 'google-vacation-rental', label: 'Google Vacation Rental' },
  { name: 'flipkey', label: 'Flipkey' },
  { name: 'windmu', label: 'Windmu' },
  { name: 'booking', label: 'Booking.com' },
  { name: 'expedia', label: 'Expedia' },
  { name: 'housetrip', label: 'Housetrip' },
  { name: 'rent-by-owner', label: 'Rent By Owner' },
  { name: 'holidaylettings', label: 'HolidayLettings' },
  { name: 'traveloka', label: 'Traveloka' },
  { name: 'trip', label: 'Trip.com' },
  { name: 'agoda', label: 'Agoda' },
  { name: 'glamping', label: 'Glamping.com' },
  { name: 'despegar-decolar', label: 'Despegar/Decolar' },
  { name: 'edreams', label: 'eDreams' },
  { name: 'pegipegi', label: 'PegiPegi' },
  { name: 'rakuten', label: 'Rakuten' },
  { name: 'riparide', label: 'Riparide' },
  { name: 'anyplace', label: 'Anyplace' },
  { name: 'furniturefinders', label: 'furnitureFinders' },
  { name: '9flats', label: '9flats' },
  { name: 'coliving', label: 'Coliving.com' },
  { name: 'instant-world-booking', label: 'Instant World Booking' },
  { name: 'only-apartments', label: 'Only-Apartments' }
];

const SOCIAL_MEDIAS = [
  { name: 'facebook', label: 'Facebook' },
  { name: 'instagram', label: 'Instagram' },
  { name: 'tiktok', label: 'TikTok' },
  { name: 'youtube', label: 'YouTube' },
  { name: 'twitter', label: 'Twitter' },
  { name: 'google-business', label: 'GoogleBusiness' },
  { name: 'yelp', label: 'Yelp' }
];

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

const SPACE = [
  { id: 'entire-house', label: 'Entire House' },
  { id: 'private-room', label: 'Private Room' },
  { id: 'casita-sep-guest-quarters', label: 'Casita/Sep Guest Quarters' }
];

const ROOM_TYPES = [
  { id: 'bedroom', label: 'Bedroom' },
  { id: 'casita', label: 'Casita' },
  { id: 'den', label: 'Den' },
  { id: 'office', label: 'Office' },
  { id: 'living-room', label: 'Living Room' },
  { id: 'family-room', label: 'Family Room' },
  { id: 'loft', label: 'Loft' },
  { id: 'studio', label: 'Studio' }
];

const SLEEPER_TYPES = [
  { id: 'king-bed', label: 'King Bed' },
  { id: 'queen-bed', label: 'Queen Bed' },
  { id: 'double-bed', label: 'Double Bed' },
  { id: 'twin-single-bed', label: 'Twin/Single Bed' },
  { id: 'futon', label: 'Futon' },
  { id: 'sofa-sleeper', label: 'Sofa Sleeper' },
  { id: 'cot', label: 'Cot' },
  { id: 'trundle', label: 'Trundle' },
  { id: 'bunk-bed', label: 'Bunk Bed' },
  { id: 'air-mattress-floor-mattress', label: 'Air Mattress/Floor Mattress' }
];

const rawToForm = (val) => {
  let v = { ...val };
  v.address = { ...val.address, state: val.address.city.state_name };
  let x = TYPES.filter((v) => v.id === val.type);
  v.type = x.length > 0 ? x[0] : {};
  x = SPACE.filter((v) => v.id === val.space);
  v.space = x.length > 0 ? x[0] : {};
  x = ROOM_TYPES.filter((v) => v.id === val.room_type);
  v.room_type = x.length > 0 ? x[0] : {};
  x = SLEEPER_TYPES.filter((v) => v.id === val.sleeper_type);
  v.sleeper_type = x.length > 0 ? x[0] : {};
  return v;
};

const formToRaw = (val) => {
  let v = { ...val };
  v.address = { ...val.address, city: val.address.city.id, city_id: val.address.city.id };
  v.type = val.type?.id;
  v.space = val.space?.id;
  v.sleeper_type = val.sleeper_type?.id;
  v.room_type = val.room_type?.id;
  v.accessibility = val.accessibility.map((x) => x.id);
  v.activities = val.activities.map((x) => x.id);
  v.bathrooms = val.bathrooms.map((x) => x.id);
  v.entertainments = val.entertainments.map((x) => x.id);
  v.essentials = val.essentials.map((x) => x.id);
  v.families = val.families.map((x) => x.id);
  v.features = val.features.map((x) => x.id);
  v.kitchens = val.kitchens.map((x) => x.id);
  v.laundries = val.laundries.map((x) => x.id);
  v.outsides = val.outsides.map((x) => x.id);
  v.parking = val.parking.map((x) => x.id);
  v.pool_spas = val.pool_spas.map((x) => x.id);
  v.safeties = val.safeties.map((x) => x.id);
  v.spaces = val.spaces.map((x) => x.id);
  v.services = val.services.map((x) => x.id);
  return v;
};

function PropertyAdd({ property = emptyProperty }) {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const [proper, setProper] = useState(property);
  const [allCities, setAllCities] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [services, setServices] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [essentials, setEssentials] = useState([]);
  const [pets] = useState([]);
  const [bathrooms, setBathrooms] = useState([]);
  const [kitchens, setKitchens] = useState([]);
  const [poolSpa, setPoolSpa] = useState([]);
  const [outsides, setOutsides] = useState([]);
  const [entertainments, setEntertainments] = useState([]);
  const [laundries, setLaundries] = useState([]);
  const [families, setFamilies] = useState([]);
  const [parking, setParking] = useState([]);
  const [safeties, setSafeties] = useState([]);
  const [features, setFeatures] = useState([]);
  const [activities, setActivities] = useState([]);
  const [accessibility, setAccessibility] = useState([]);
  const [bookingSiteDialog, setBookingSiteDialog] = useState(false);
  const [bookingSite, setBookingSite] = useState(null);
  const [bookingSites, setBookingSites] = useState([]);
  const [bookingSiteError, setBookingSiteError] = useState(null);
  const [socialMediaDialog, setSocialMediaDialog] = useState(false);
  const [socialMediaLink, setSocialMediaLink] = useState(null);
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  const [socialMediaLinkError, setSocialMediaLinkError] = useState(null);
  const [stage, setStage] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [stepErrors, setStepErrors] = useState([]);
  // const [optional, setOptional] = useState(new Set());

  const isCreating = !property.id && !router.query.id;

  // console.log('===== =====');
  // console.log(property);

  const partOne = [
    'name',
    'type',
    'pictures',
    'video',
    'space',
    'hosted_by',
    'phone',
    'email',
    'max_no_of_guest',
    'no_of_bedrooms',
    'no_of_bathrooms',
    'price_night',
    'is_pet_allowed',
    'suitability',
    'address',
    'description',
    'room_type',
    'sleeper_type',
    'booking_sites',
    'social_media'
  ];
  const partTwo = [
    'services',
    'spaces',
    'essentials',
    'pets',
    'bathrooms',
    'kitchens',
    'pool_spas',
    'outsides',
    'entertainments',
    'laundries',
    'families',
    'parking',
    'accessibility'
  ];
  const partThree = ['safeties', 'features', 'activities', 'cancellation_policy', 'host_note'];
  const parts = [partOne, partTwo, partThree];

  const isStepOptional = (step) => {
    return [].includes(step);
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const isStepFailed = (step) => {
    return stepErrors.includes(step);
  };

  const handleNext = (touched, event, formErrors, setFieldValue) => {
    console.log(touched);
    console.log(formErrors);
    console.log(stage);

    if (stage === 0) {
      let target = event.target;
      target.form.requestSubmit();
      setStage(1);
      setTimeout(() => target.click(), 300);
      return;
    }

    let errorFound = false;
    for (let x of Object.keys(formErrors)) {
      if (parts[activeStep].includes(x)) {
        console.log(x);
        errorFound = true;
        break;
      }
    }

    if (errorFound) {
      setStepErrors([...stepErrors, activeStep]);
      warningProcessor('Please fix error on the form', dispatch, openSnackbar);
    } else {
      setFieldValue('stage', activeStep + 1);
      setStepErrors(stepErrors.filter((x) => x !== activeStep));
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }

    return;
  };

  const handleBack = () => {
    setFieldValue('stage', activeStep);
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

  const handleBookingClose = () => {
    setBookingSite(null);
    setBookingSiteError(null);
    setBookingSiteDialog(false);
  };

  const handleSocialMediaClose = () => {
    setSocialMediaLink(null);
    setSocialMediaDialog(false);
    setSocialMediaLinkError(null);
  };

  const markGuest = [
    { value: 5, label: '5 Guest' },
    { value: 20, label: '20 Guest' },
    { value: 30, label: '30 Guest' },
    { value: 45, label: '45 Guest' }
  ];

  const markBedroom = [
    { value: 5, label: '5 Bedrooms' },
    { value: 20, label: '20 Bedrooms' },
    { value: 30, label: '30 Bedrooms' },
    { value: 45, label: '45 Bedrooms' }
  ];

  const markBathrooms = [
    { value: 5, label: '5 Bathrooms' },
    { value: 20, label: '20 Bathrooms' },
    { value: 30, label: '30 Bathrooms' },
    { value: 45, label: '45 Bathrooms' }
  ];

  const isUrl = (str) => {
    try {
      new URL(str);
      return /(\.\w)/.test(str);
    } catch (e) {
      return false;
    }
  };

  const checkSiteError = (bs) => {
    // let id = bs?.id;
    let site = bs?.site;
    let name = bs?.name;
    let error = '';
    let status = false;
    if (site === '' || site === undefined) {
      status = true;
      error = 'Site Link is Required!!!';
    } else if (isUrl(site)) {
      site = site.includes('http') ? site : `http://${site}`;
      console.log(11);
      // setBookingSite({ ...bs, site });
    } else if (isUrl(`https://${site}`)) {
      console.log(22);
      // setBookingSite({ ...bs, site: `https://${site}` });
    } else {
      status = true;
      error = 'This must be a valid URL';
    }

    if (bookingSiteError !== null) {
      setBookingSiteError({ ...bookingSiteError, link: error });
    }

    if (name === '' || name === undefined) {
      status = true;
      setBookingSiteError({ link: error, name: 'Booking Site is Required!!!' });
    } else {
      setBookingSiteError({ link: error, name: '' });
    }
    return status;
  };

  const checkMediaLinkError = (socialMediaLink) => {
    let error = '';
    let name = socialMediaLink?.name;
    let site = socialMediaLink?.site;
    let status = false;
    if (site === '' || site === undefined) {
      error = 'Site is Required!!!';
      status = true;
    } else if (isUrl(site)) {
      site = site.includes('http') ? site : `http://${site}`;
      // setSocialMediaLink({ ...socialMediaLink, site });
    } else if (isUrl(`https://${site}`)) {
      // setSocialMediaLink({ ...socialMediaLink, site: `https://${site}` });
    } else {
      error = 'This must be a valid URL';
      status = true;
    }

    if (bookingSiteError !== null) {
      setSocialMediaLinkError({ ...socialMediaLinkError, link: error });
    }

    if (name === '' || name === undefined) {
      status = true;
      setSocialMediaLinkError({ link: error, name: 'Select Social Media!!!' });
    } else {
      setSocialMediaLinkError({ link: error, name: '' });
    }

    return status;
  };

  useEffect(() => {
    if (!property.id && router.query.id) {
      // eslint-disable-next-line
      fetcher(DIRECTORY_EP.PROPERTY_DETAIL.format(router.query.id), 'get', session, null, null, res => {
          setProper(res.data);
          setBookingSites(res.data.booking_sites);
          setSocialMediaLinks(res.data.social_media);
          console.log('---------');
          console.log(res.data);
        },
        (err) => {
          errorProcessor(err, () => {}, dispatch, openSnackbar);
        }
      );
    }

    // eslint-disable-next-line
    fetcher(CORE_EP.CITY_LIST, 'get', session, null, null, res => {
        setAllCities(res.data);
        let addedStates = [];
        // eslint-disable-next-line
        res.data.filter((x) => {
          if (addedStates.includes(x.state_name)) {
            return false;
          } else {
            addedStates.push(x.state_name);
            return true;
          }
        });
        setStates(addedStates);
        // console.log('Cities***** ', res.data);
        // console.log('States***** ', addedStates);
      },
      (err) => {
        errorProcessor(err, () => {}, dispatch, openSnackbar);
      }
    );

    // eslint-disable-next-line
    fetcher(DIRECTORY_EP.PROPERTY_FORM_ITEMS, 'get', session, null, null, res => {
        console.log('Items***** ', res.data);
        setServices(res.data.services);
        setSpaces(res.data.spaces);
        setEssentials(res.data.essentials);
        setBathrooms(res.data.bathrooms);
        setKitchens(res.data.kitchens);
        setPoolSpa(res.data.pool_spas);
        setOutsides(res.data.outsides);
        setEntertainments(res.data.entertainments);
        setLaundries(res.data.laundries);
        setFamilies(res.data.families);
        setParking(res.data.parking);
        setSafeties(res.data.safeties);
        setFeatures(res.data.features);
        setActivities(res.data.activities);
        setAccessibility(res.data.accessibility);
      },
      (err) => {
        errorProcessor(err, () => {}, dispatch, openSnackbar);
      }
    );
    // eslint-disable-next-line
  }, []);

  const formik = useFormik({
    initialValues: rawToForm(proper),
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      name: Yup.string().max(128).required('Please provide a name or label for the Property/Rental'),
      type: Yup.object()
        .shape({
          id: Yup.string().required('Please select Type for the Property/Rental').min(1)
        })
        .nullable()
        .required('Please select Type for the Property/Rental'),
      space: Yup.object()
        .shape({
          id: Yup.string().required('Please select Space Type for the Property/Rental').min(1)
        })
        .nullable()
        .required('Please select Space Type for the Property/Rental'),
      // hosted_by: Yup.string().required('Please provide the Hosted By'),
      max_no_of_guest: Yup.number()
        .min(1, 'No of Guest must be a number between 1-49')
        .max(49, 'No of Guest must be a number between 1-49'),
      no_of_bedrooms: Yup.number()
        .min(1, 'No of Bedrooms must be a number between 1-49')
        .max(49, 'No of Bedrooms must be a number between 1-49'),
      no_of_bathrooms: Yup.number()
        .min(1, 'No of Bathrooms must be a number between 1-49')
        .max(49, 'No of Bathrooms must be a number between 1-49'),
      description: Yup.string().required('Please provide the Description'),
      booking_sites: Yup.array().min(1, 'Please provide at least one Booking Site'),
      address: Yup.object().shape({
        state: Yup.string().required('Please select State').min(1),
        city: Yup.object().nullable().required('Please select/type the City'),
        zip_code: Yup.string().required('Please enter the Zip Code').min(1),
        street: Yup.string().required('Please enter the street').min(1),
        number: Yup.string().required('Please enter the number').min(1)
      }),
      stage: Yup.number().min(3, 'Stage MUST be at least').max(3, 'Stage MUST be at most'),
      room_type: Yup.object()
        .shape({ id: Yup.string().required('Room type is Required').min(1) })
        .nullable()
        .required('Room type is Required'),
      sleeper_type: Yup.object()
        .shape({ id: Yup.string().required('Sleeper Type is Required').min(1) })
        .nullable()
        .required('Sleeper Type is Required')
    }),
    onSubmit: (values, { setErrors, setSubmitting }) => {
      console.log('========== : 1 : ===========');
      console.log(values);
      let val = formToRaw(values);
      console.log(val);
      console.log('========== : 2 : ===========');

      const URL = isCreating ? DIRECTORY_EP.PROPERTY_CREATE : DIRECTORY_EP.PROPERTY_UPDATE.format(proper.id);

      // eslint-disable-next-line
      fetcher(URL, isCreating ? 'post' : 'put', session, null, val, (res) => {
          const msg = isCreating ? 'Property/Rental Created Successfully' : 'Property/Rental Updated Successfully';
          successProcessor(msg, dispatch, openSnackbar);
          setSubmitting(false);
          window.location.href = CORE_URL.PROPERTY_LIST;
          // if (isCreating) {
          //   if (typeof setData === 'function') {
          //     setData([...data, res.data]);
          //   }
          // } else if (typeof setData === 'function') {
          //   setData(data.map((x) => (x.id === res.data.id ? res.data : x)));
          // }
        },
        (err) => {
          console.log(err);
          errorProcessor(err, setErrors, dispatch, openSnackbar);
          setSubmitting(false);
        },
        true
      );
    }
  });

  const { errors, touched, handleBlur, handleChange, handleSubmit, getFieldProps, setFieldValue, values, isSubmitting } = formik;

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
                      // labelProps.optional = <Typography variant="caption" color="error">Alert message</Typography>;
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
                        <InputLabel htmlFor="property-type">Type</InputLabel>
                        <Autocomplete
                          // freeSolo
                          disablePortal
                          fullWidth
                          id="property-type"
                          name="type"
                          value={values.type}
                          onChange={(event, newValue) => setFieldValue('type', newValue)}
                          options={TYPES}
                          getOptionLabel={(label) => label.label || ''}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Type"
                              variant="outlined"
                              error={Boolean(touched.type && errors.type)}
                              helperText={touched.type && errors.type?.id}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <InputLabel sx={{ mt: 0.5 }}>Photos:</InputLabel>
                          </Grid>
                          <Grid item xs={12}>
                            <UploadMultiFile
                              type="STANDARD"
                              showList={true}
                              setFieldValue={setFieldValue}
                              files={values.pictures}
                              error={Boolean(touched.pictures && errors.pictures)}
                              onUpload={() => console.log('====> Upload Picture')}
                              fieldName={'pictures'}
                            />
                          </Grid>
                          {touched.pictures && errors.pictures && (
                            <Grid item xs={12}>
                              <FormHelperText error>{errors.pictures}</FormHelperText>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <InputLabel sx={{ mt: 0.5 }}>Video:</InputLabel>
                          </Grid>
                          <Grid item xs={12}>
                            <UploadMultiFile
                              type="STANDARD"
                              showList={true}
                              setFieldValue={setFieldValue}
                              files={values.video}
                              error={Boolean(touched.video && errors.video)}
                              onUpload={() => console.log('====> Upload Video')}
                              fieldName={'video'}
                              multiple={false}
                              accepted="image/gif"
                            />
                          </Grid>
                          {touched.video && errors.video && (
                            <Grid item xs={12}>
                              <FormHelperText error>{errors.video}</FormHelperText>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="property-space">Space</InputLabel>
                        <FormControl fullWidth error={Boolean(touched.space && errors.space)}>
                          <Autocomplete
                            disablePortal
                            fullWidth
                            id="property-space"
                            name="space"
                            value={values.space}
                            onChange={(event, newValue) => setFieldValue('space', newValue)}
                            options={SPACE}
                            getOptionLabel={(label) => label.label || ''}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Booked Space"
                                variant="outlined"
                                error={Boolean(touched.space && errors.space)}
                                helperText={touched.space && errors.space?.id}
                              />
                            )}
                          />
                        </FormControl>
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
                          <InputLabel htmlFor="property-no-of-guest">No of Guest</InputLabel>
                          <FormControl fullWidth error={Boolean(touched.max_no_of_guest && errors.max_no_of_guest)}>
                            <Slider
                              {...getFieldProps('max_no_of_guest')}
                              aria-label="Small steps"
                              defaultValue={0}
                              // getAriaValueText={guestValue}
                              step={1}
                              min={0}
                              max={49}
                              marks={markGuest}
                              // valueLabelDisplay="on"
                              valueLabelDisplay="auto"
                              color={touched.max_no_of_guest && errors.max_no_of_guest ? 'error' : 'primary'}
                            />
                            <FormHelperText>{touched.max_no_of_guest && errors.max_no_of_guest}</FormHelperText>
                          </FormControl>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-no-of-bedrooms">No of Bedrooms</InputLabel>
                          <FormControl fullWidth error={Boolean(touched.no_of_bedrooms && errors.no_of_bedrooms)}>
                            <Slider
                              {...getFieldProps('no_of_bedrooms')}
                              aria-label="Small steps"
                              defaultValue={0}
                              // getAriaValueText={bedroomValue}
                              step={1}
                              min={0}
                              max={49}
                              marks={markBedroom}
                              valueLabelDisplay="auto"
                              // valueLabelDisplay="on"
                              color={touched.no_of_bedrooms && errors.no_of_bedrooms ? 'error' : 'primary'}
                            />
                            <FormHelperText>{touched.no_of_bedrooms && errors.no_of_bedrooms}</FormHelperText>
                          </FormControl>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1} sx={{ py: 4 }}>
                          <InputLabel htmlFor="property-no-of-bathrooms">No of Bathrooms</InputLabel>
                          <FormControl fullWidth error={Boolean(touched.no_of_bathrooms && errors.no_of_bathrooms)}>
                            <Slider
                              {...getFieldProps('no_of_bathrooms')}
                              aria-label="Small steps"
                              defaultValue={0}
                              // getAriaValueText={bedroomValue}
                              value={values.no_of_bathrooms}
                              step={1}
                              min={0}
                              max={49}
                              marks={markBathrooms}
                              valueLabelDisplay="auto"
                              // valueLabelDisplay="on"
                              color={touched.no_of_bathrooms && errors.no_of_bathrooms ? 'error' : 'primary'}
                            />
                            <FormHelperText>{touched.no_of_bathrooms && errors.no_of_bathrooms}</FormHelperText>
                          </FormControl>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25} sx={{ py: 3 }}>
                          <InputLabel htmlFor="property-price-night">Ave $ Per Night</InputLabel>
                          <TextField
                            fullWidth
                            type="number"
                            id="property-price-night"
                            placeholder="Ave $ Per Night"
                            {...getFieldProps('price_night')}
                            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                            error={Boolean(touched.price_night && errors.price_night)}
                            helperText={touched.price_night && errors.price_night}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Card>
                          <CardHeader
                            avatar=<Avatar sx={{ bgcolor: red[500] }}>B</Avatar>
                            action={
                              <IconButton aria-label="settings" onClick={() => setBookingSiteDialog(true)}>
                                <PlusOutlined />
                              </IconButton>
                            }
                            title="Booking Sites"
                            subheader="You can add as many booking sites as applies to you"
                          />
                          <CardContent sx={{ py: 0 }}>
                            <List sx={{ p: 0 }}>
                              {bookingSites.map((x, i) => (
                                <ListItem divider={bookingSites.length > i + 1} key={`booking-site-${i}`}>
                                  <ListItemText primary={x?.label} secondary={x?.site} />
                                  <Stack direction="row" alignItems="center" spacing={0.75}>
                                    <CloseOutlined
                                      onClick={() => {
                                        let bs = bookingSites.filter((b) => b.id !== x.id);
                                        setFieldValue('booking_sites', bs);
                                        setBookingSites(bs);
                                      }}
                                    />
                                  </Stack>
                                </ListItem>
                              ))}
                            </List>
                            <FormHelperText sx={{ color: red[500] }}>{touched.booking_sites && errors.booking_sites}</FormHelperText>
                          </CardContent>
                        </Card>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Card>
                          <CardHeader
                            avatar=<Avatar sx={{ bgcolor: red[500] }}>S</Avatar>
                            action={
                              <IconButton aria-label="settings" onClick={() => setSocialMediaDialog(true)}>
                                <PlusOutlined />
                              </IconButton>
                            }
                            title="Social Media"
                            subheader="Add your Social Media Links"
                          />
                          <CardContent sx={{ py: 0 }}>
                            <List sx={{ p: 0 }}>
                              {socialMediaLinks.map((x, i) => (
                                <ListItem divider={socialMediaLinks.length > i + 1} key={`social-media-link-${i}`}>
                                  <ListItemText primary={x.label} secondary={x.site} />
                                  <Stack direction="row" alignItems="center" spacing={0.75}>
                                    <CloseOutlined
                                      onClick={() => {
                                        let sm = socialMediaLinks.filter((b) => b.id !== x.id);
                                        setFieldValue('social_media', sm);
                                        setSocialMediaLinks(sm);
                                      }}
                                    />
                                  </Stack>
                                </ListItem>
                              ))}
                            </List>
                          </CardContent>
                        </Card>
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

                      <Grid item xs={12}>
                        <CardHeader title="Address" />
                        <Divider />
                        <Box sx={{ pt: 2 }}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={5}>
                              <InputLabel htmlFor="state-address">State</InputLabel>
                              <Autocomplete
                                disablePortal
                                fullWidth
                                id="property-state-address"
                                options={states}
                                name="address.state"
                                value={values.address?.state || null}
                                onChange={(event, newValue) => {
                                  setCities(allCities.filter((x) => x.state_name === newValue));
                                  setFieldValue('address.state', newValue);
                                  setFieldValue('address.city', null);
                                }}
                                getOptionLabel={(label) => label}
                                isOptionEqualToValue={(option, value) => option === value || option === ''}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    name="address.state"
                                    error={Boolean(touched.address?.state && errors.address?.state)}
                                    helperText={touched.address?.state && errors.address?.state}
                                    placeholder="State"
                                    variant="outlined"
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                              <InputLabel htmlFor="city-address">City</InputLabel>
                              <Autocomplete
                                disablePortal
                                fullWidth
                                id="property-city-address"
                                options={cities}
                                name="address.city"
                                value={values.address?.city || null}
                                onChange={(event, newValue) => setFieldValue('address.city', newValue)}
                                getOptionLabel={(label) => label.name}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    name="address.city"
                                    error={Boolean(touched.address?.city && errors.address?.city)}
                                    helperText={touched.address?.city && errors.address?.city}
                                    placeholder="City"
                                    variant="outlined"
                                  />
                                )}
                              />
                            </Grid>

                            <Grid item xs={12} sm={2}>
                              <InputLabel htmlFor="zip_code-address">Zip Code</InputLabel>
                              <TextField
                                fullWidth
                                id="zip_code-address"
                                placeholder="Zip Code"
                                // {...getFieldProps('address.zip_code')}
                                name="address.zip_code"
                                value={values.address?.zip_code || ''}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(touched.address?.zip_code && errors.address?.zip_code)}
                                helperText={touched.address?.zip_code && errors.address?.zip_code}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Stack spacing={1.25}>
                                <InputLabel htmlFor="street-address">Street Name</InputLabel>
                                <TextField
                                  fullWidth
                                  id="street-address"
                                  value={values.address?.street || ''}
                                  name="address.street"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="Street Name"
                                  error={Boolean(touched.address?.street && errors.address?.street)}
                                  helperText={touched.address?.street && errors.address?.street}
                                />
                              </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Stack spacing={1.25}>
                                <InputLabel htmlFor="number-address">Number</InputLabel>
                                <TextField
                                  fullWidth
                                  id="number-address"
                                  value={values.address?.number || ''}
                                  name="address.number"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="Number"
                                  error={Boolean(touched.address?.number && errors.address?.number)}
                                  helperText={touched.address?.number && errors.address?.number}
                                />
                              </Stack>
                            </Grid>
                          </Grid>
                        </Box>
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
                        <InputLabel htmlFor="property-room_type">Room Type</InputLabel>
                        <Autocomplete
                          fullWidth
                          multiple={false}
                          id="property-room_type"
                          options={ROOM_TYPES}
                          value={values.room_type}
                          name="room_type"
                          onBlur={handleBlur}
                          onChange={(event, newValue) => setFieldValue('room_type', newValue)}
                          getOptionLabel={(label) => label.label || ''}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <span key={index}>
                                <Chip
                                  {...getTagProps({ index })}
                                  variant="combined"
                                  label={option.label}
                                  deleteIcon={<CloseOutlined style={{ fontSize: '0.75rem' }} />}
                                  sx={{ color: 'text.primary' }}
                                />
                              </span>
                            ))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={Boolean(touched.room_type && errors.room_type)}
                              helperText={touched.room_type && errors.room_type?.id}
                              placeholder="Select Room Type"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="property-sleeper_type">Sleeper Type</InputLabel>
                        <Autocomplete
                          fullWidth
                          multiple={false}
                          id="property-sleeper_type"
                          options={SLEEPER_TYPES}
                          value={values.sleeper_type}
                          name="sleeper_type"
                          getOptionLabel={(label) => label.label || ''}
                          isOptionEqualToValue={(option, value) => option.id === value.id || option.id === ''}
                          onBlur={handleBlur}
                          onChange={(event, newValue) => setFieldValue('sleeper_type', newValue)}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <span key={index}>
                                <Chip
                                  {...getTagProps({ index })}
                                  variant="combined"
                                  label={option.label}
                                  deleteIcon={<CloseOutlined style={{ fontSize: '0.75rem' }} />}
                                  sx={{ color: 'text.primary' }}
                                />
                              </span>
                            ))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="sleeper_type"
                              error={Boolean(touched.sleeper_type && errors.sleeper_type)}
                              helperText={touched.sleeper_type && errors.sleeper_type?.id}
                              placeholder="Select Sleeper Type"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  )}

                  {activeStep === 1 && (
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="property-services">Services</InputLabel>
                        <Autocomplete
                          fullWidth
                          multiple={true}
                          disablePortal
                          id="property-services"
                          name="services"
                          options={services}
                          value={values.services}
                          onBlur={handleBlur}
                          onChange={(event, newValue) => setFieldValue('services', newValue)}
                          getOptionLabel={(label) => label.name || ''}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={Boolean(touched.services && errors.services)}
                              helperText={touched.services && errors.services}
                              placeholder="Select Services that applies"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="property-spaces">Spaces</InputLabel>
                        <Autocomplete
                          fullWidth
                          multiple={true}
                          disablePortal
                          name="spaces"
                          id="property-spaces"
                          options={spaces}
                          value={values.spaces}
                          onBlur={handleBlur}
                          onChange={(event, newValue) => setFieldValue('spaces', newValue)}
                          getOptionLabel={(label) => label.name || ''}
                          isOptionEqualToValue={(option, value) => option.id === value.id || option.id === ''}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={Boolean(touched.spaces && errors.spaces)}
                              helperText={touched.spaces && errors.spaces}
                              placeholder="Select Spaces that applies"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="property-essentials">Essentials</InputLabel>
                        <Autocomplete
                          fullWidth
                          multiple={true}
                          disablePortal
                          name="essentials"
                          id="property-essentials"
                          options={essentials}
                          value={values.essentials}
                          onBlur={handleBlur}
                          onChange={(event, newValue) => setFieldValue('essentials', newValue)}
                          getOptionLabel={(label) => label.name || ''}
                          isOptionEqualToValue={(option, value) => option.id === value.id || option.id === ''}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="essentials"
                              error={Boolean(touched.essentials && errors.essentials)}
                              helperText={touched.essentials && errors.essentials}
                              placeholder="Select Essentials that applies"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="property-pets">Pets</InputLabel>
                        <Autocomplete
                          fullWidth
                          multiple={true}
                          disablePortal
                          id="property-pets"
                          name="pets"
                          options={pets}
                          value={values.pets}
                          onBlur={handleBlur}
                          onChange={(event, newValue) => setFieldValue('pets', newValue)}
                          getOptionLabel={(label) => label.name || ''}
                          isOptionEqualToValue={(option, value) => option.id === value.id || option.id === ''}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="pets"
                              error={Boolean(touched.pets && errors.pets)}
                              helperText={touched.pets && errors.pets}
                              placeholder="Select Pets that applies"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="property-bathrooms">Bathrooms</InputLabel>
                        <Autocomplete
                          fullWidth
                          multiple={true}
                          disablePortal
                          name="bathrooms"
                          id="property-bathrooms"
                          options={bathrooms}
                          value={values.bathrooms}
                          onBlur={handleBlur}
                          onChange={(event, newValue) => setFieldValue('bathrooms', newValue)}
                          getOptionLabel={(label) => label.name || ''}
                          isOptionEqualToValue={(option, value) => option.id === value.id || option.id === ''}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="bathrooms"
                              error={Boolean(touched.bathrooms && errors.bathrooms)}
                              helperText={touched.bathrooms && errors.bathrooms}
                              placeholder="Select Bathrooms that applies"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="property-kitchens">Kitchens</InputLabel>
                        <Autocomplete
                          fullWidth
                          multiple={true}
                          disablePortal
                          id="property-kitchens"
                          name="kitchens"
                          options={kitchens}
                          value={values.kitchens}
                          onBlur={handleBlur}
                          onChange={(event, newValue) => setFieldValue('kitchens', newValue)}
                          getOptionLabel={(label) => label.name || ''}
                          isOptionEqualToValue={(option, value) => option.id === value.id || option.id === ''}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="kitchens"
                              error={Boolean(touched.kitchens && errors.kitchens)}
                              helperText={touched.kitchens && errors.kitchens}
                              placeholder="Select Kitchens that applies"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="property-pool-spa">Pool & Spa</InputLabel>
                        <Autocomplete
                          fullWidth
                          multiple={true}
                          disablePortal
                          id="property-pool-spa"
                          name="pool_spas"
                          options={poolSpa}
                          value={values.pool_spas}
                          onBlur={handleBlur}
                          onChange={(event, newValue) => setFieldValue('pool_spas', newValue)}
                          getOptionLabel={(label) => label.name || ''}
                          isOptionEqualToValue={(option, value) => option.id === value.id || option.id === ''}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="pool_spas"
                              error={Boolean(touched.pool_spas && errors.pool_spas)}
                              helperText={touched.pool_spas && errors.pool_spas}
                              placeholder="Select all that applies"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="property-outsides">Outsides</InputLabel>
                        <Autocomplete
                          fullWidth
                          multiple={true}
                          disablePortal
                          id="property-outsides"
                          name="outsides"
                          options={outsides}
                          value={values.outsides}
                          onBlur={handleBlur}
                          onChange={(event, newValue) => setFieldValue('outsides', newValue)}
                          getOptionLabel={(label) => label.name || ''}
                          isOptionEqualToValue={(option, value) => option.id === value.id || option.id === ''}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="outsides"
                              error={Boolean(touched.outsides && errors.outsides)}
                              helperText={touched.outsides && errors.outsides}
                              placeholder="Select all that applies"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="property-entertainments">Entertainments</InputLabel>
                        <Autocomplete
                          fullWidth
                          multiple={true}
                          disablePortal
                          id="property-entertainments"
                          name="entertainments"
                          options={entertainments}
                          value={values.entertainments}
                          onBlur={handleBlur}
                          onChange={(event, newValue) => setFieldValue('entertainments', newValue)}
                          getOptionLabel={(label) => label.name || ''}
                          isOptionEqualToValue={(option, value) => option.id === value.id || option.id === ''}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="entertainments"
                              error={Boolean(touched.entertainments && errors.entertainments)}
                              helperText={touched.entertainments && errors.entertainments}
                              placeholder="Select all that applies"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="property-laundries">Laundries</InputLabel>
                        <Autocomplete
                          fullWidth
                          multiple={true}
                          disablePortal
                          id="property-laundries"
                          name="laundries"
                          options={laundries}
                          value={values.laundries}
                          onBlur={handleBlur}
                          onChange={(event, newValue) => setFieldValue('laundries', newValue)}
                          getOptionLabel={(label) => label.name || ''}
                          isOptionEqualToValue={(option, value) => option.id === value.id || option.id === ''}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="laundries"
                              error={Boolean(touched.laundries && errors.laundries)}
                              helperText={touched.laundries && errors.laundries}
                              placeholder="Select all that applies"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="property-families">Families</InputLabel>
                        <Autocomplete
                          fullWidth
                          multiple={true}
                          disablePortal
                          id="property-families"
                          name="families"
                          options={families}
                          value={values.families}
                          onBlur={handleBlur}
                          onChange={(event, newValue) => setFieldValue('families', newValue)}
                          getOptionLabel={(label) => label.name || ''}
                          isOptionEqualToValue={(option, value) => option.id === value.id || option.id === ''}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="families"
                              error={Boolean(touched.families && errors.families)}
                              helperText={touched.families && errors.families}
                              placeholder="Select all that applies"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="property-parking">Parking</InputLabel>
                        <Autocomplete
                          fullWidth
                          multiple={true}
                          disablePortal
                          id="property-parking"
                          name="parking"
                          options={parking}
                          value={values.parking}
                          onBlur={handleBlur}
                          onChange={(event, newValue) => setFieldValue('parking', newValue)}
                          getOptionLabel={(label) => label.name || ''}
                          isOptionEqualToValue={(option, value) => option.id === value.id || option.id === ''}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="parking"
                              error={Boolean(touched.parking && errors.parking)}
                              helperText={touched.parking && errors.parking}
                              placeholder="Select all that applies"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="property-accessibility">Accessibility</InputLabel>
                        <Autocomplete
                          fullWidth
                          multiple={true}
                          disablePortal
                          id="property-accessibility"
                          name="accessibility"
                          options={accessibility}
                          value={values.accessibility}
                          onBlur={handleBlur}
                          onChange={(event, newValue) => setFieldValue('accessibility', newValue)}
                          getOptionLabel={(label) => label.name || ''}
                          isOptionEqualToValue={(option, value) => option.id === value.id || option.id === ''}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="accessibility"
                              error={Boolean(touched.accessibility && errors.accessibility)}
                              helperText={touched.accessibility && errors.accessibility}
                              placeholder="Select all that applies"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  )}

                  {activeStep === 2 && (
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="property-safeties">Safety</InputLabel>
                        <Autocomplete
                          fullWidth
                          multiple={true}
                          disablePortal
                          id="property-safeties"
                          name="safeties"
                          options={safeties}
                          value={values.safeties}
                          onBlur={handleBlur}
                          onChange={(event, newValue) => setFieldValue('safeties', newValue)}
                          getOptionLabel={(label) => label.name || ''}
                          isOptionEqualToValue={(option, value) => option?.id === value?.id}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={Boolean(touched.safeties && errors.safeties)}
                              helperText={touched.safeties && errors.safeties}
                              placeholder="Select all that applies"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="property-features">Features</InputLabel>
                        <Autocomplete
                          fullWidth
                          multiple={true}
                          disablePortal
                          id="property-features"
                          name="features"
                          options={features}
                          value={values.features}
                          onBlur={handleBlur}
                          onChange={(event, newValue) => setFieldValue('features', newValue)}
                          getOptionLabel={(label) => label.name || ''}
                          isOptionEqualToValue={(option, value) => option.id === value.id || option.id === ''}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="features"
                              error={Boolean(touched.features && errors.features)}
                              helperText={touched.features && errors.features}
                              placeholder="Select all that applies"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="property-activities">Activities</InputLabel>
                        <Autocomplete
                          fullWidth
                          multiple={true}
                          disablePortal
                          id="property-activities"
                          name="activities"
                          options={activities}
                          value={values.activities}
                          onBlur={handleBlur}
                          onChange={(event, newValue) => setFieldValue('activities', newValue)}
                          getOptionLabel={(label) => label.name || ''}
                          isOptionEqualToValue={(option, value) => option.id === value.id || option.id === ''}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="activities"
                              error={Boolean(touched.activities && errors.activities)}
                              helperText={touched.activities && errors.activities}
                              placeholder="Select all that applies"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="property-cancellation-policy">Cancellation Policy</InputLabel>
                          <TextField
                            fullWidth
                            multiline
                            id="property-cancellation-policy"
                            placeholder="Cancellation Policy"
                            {...getFieldProps('cancellation_policy')}
                            error={Boolean(touched.cancellation_policy && errors.cancellation_policy)}
                            helperText={touched.cancellation_policy && errors.cancellation_policy}
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
                    </Grid>
                  )}

                  <Grid item xs={12} sm={12}>
                    {activeStep === steps.length ? (
                      <>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                          All steps completed - you&apos;re finished... Give me the content to write here!!!
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                          <Box sx={{ flex: '1 1 auto' }} />
                          {/* <Button onClick={handleReset}>Reset</Button> */}
                          <Button color="warning" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                            Back
                          </Button>
                          <Button disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                            Create Rental\Property
                          </Button>
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
                          <Button onClick={(event) => handleNext(touched, event, errors, setFieldValue)}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                          </Button>
                        </Box>
                      </>
                    )}
                  </Grid>
                </Grid>
              </DialogContent>

              {/* Booking Site Add Dialog */}
              <Dialog
                fullWidth
                maxWidth="sm"
                open={bookingSiteDialog}
                TransitionComponent={SlideUp}
                keepMounted
                onClose={handleBookingClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>Select Applicable Booking Site</DialogTitle>
                <DialogContent>
                  <Grid container spacing={1} sx={{ px: 2, pb: 0, mb: 0 }}>
                    <Grid item xs={12}>
                      <InputLabel htmlFor="property-booking_site-name">Booking Site</InputLabel>
                      <Autocomplete
                        fullWidth
                        id="property-booking_site-name"
                        options={BOOKING_SITES.filter((x) => {
                          let not_added = true;
                          for (let b of bookingSites) {
                            if (b.name === x.name) {
                              not_added = false;
                              break;
                            }
                          }
                          return not_added;
                        })}
                        value={bookingSite}
                        getOptionLabel={(label) => label.label}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        onChange={(event, newValue) => setBookingSite((prev) => ({ ...prev, ...newValue }))}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="booking_site"
                            error={Boolean(bookingSiteError?.name)}
                            helperText={bookingSiteError?.name}
                            placeholder="Select Booking Site"
                            variant="outlined"
                          />
                        )}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <span key={index}>
                              <Chip
                                {...getTagProps({ index })}
                                variant="combined"
                                label={option.label}
                                deleteIcon={<CloseOutlined style={{ fontSize: '0.75rem' }} />}
                                sx={{ color: 'text.primary' }}
                              />
                            </span>
                          ))
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="property-booking-site-link"></InputLabel>
                        <TextField
                          fullWidth
                          id="property-booking-site-link"
                          placeholder="Booking Site Link"
                          value={bookingSite?.site || ''}
                          onChange={(event) => {
                            let val = event.target.value;
                            setBookingSite({
                              ...bookingSite,
                              site: isUrl(val) ? val : isUrl(`https://${val}`) ? `https://${val}` : val
                            });
                          }}
                          InputProps={{ startAdornment: <InputAdornment position="start">https://</InputAdornment> }}
                          error={Boolean(bookingSiteError?.link)}
                          helperText={bookingSiteError?.link}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleBookingClose}>Close</Button>
                  <Button
                    onClick={() => {
                      if (!checkSiteError(bookingSite)) {
                        // console.log('Goo to go...');
                        // console.log(bookingSite);
                        // console.log(bookingSites);
                        setFieldValue('booking_sites', [...bookingSites, bookingSite]);
                        setBookingSites([...bookingSites, bookingSite]);
                        setBookingSite(null);
                        successProcessor('Booking Site Successfully Added', dispatch, openSnackbar);
                      } else {
                        console.log('Nope!!!');
                      }
                    }}
                  >
                    Add
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Social Media Site Add Dialog */}
              <Dialog
                fullWidth
                maxWidth="sm"
                open={socialMediaDialog}
                TransitionComponent={SlideUp}
                keepMounted
                onClose={handleSocialMediaClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>Select Social Media</DialogTitle>
                <DialogContent>
                  <Grid container spacing={1} sx={{ px: 2, pb: 0, mb: 0 }}>
                    <Grid item xs={12}>
                      <InputLabel htmlFor="property-social_link-name">Social Media</InputLabel>
                      <Autocomplete
                        fullWidth
                        multiple={false}
                        // freeSolo
                        id="property-social_link-name"
                        options={SOCIAL_MEDIAS.filter((x) => {
                          let not_added = true;
                          for (let b of socialMediaLinks) {
                            if (b.name === x.name) {
                              not_added = false;
                              break;
                            }
                          }
                          return not_added;
                        })}
                        value={socialMediaLink}
                        getOptionLabel={(label) => label.label}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        onBlur={handleBlur}
                        onChange={(event, newValue) => setSocialMediaLink((prev) => ({ ...prev, ...newValue }))}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="social_media_label"
                            error={Boolean(socialMediaLinkError?.name)}
                            helperText={socialMediaLinkError?.name}
                            placeholder="Select Room Type"
                            variant="outlined"
                          />
                        )}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <span key={index}>
                              <Chip
                                {...getTagProps({ index })}
                                variant="combined"
                                label={option.label}
                                deleteIcon={<CloseOutlined style={{ fontSize: '0.75rem' }} />}
                                sx={{ color: 'text.primary' }}
                              />
                            </span>
                          ))
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="property-social-media-link"></InputLabel>
                        <TextField
                          fullWidth
                          id="property-social-media-link"
                          placeholder="Social Media Link"
                          value={socialMediaLink?.site || ''}
                          onChange={(event) => {
                            let val = event.target.value;
                            setSocialMediaLink({
                              ...socialMediaLink,
                              site: isUrl(val) ? val : isUrl(`https://${val}`) ? `https://${val}` : val
                            });
                          }}
                          InputProps={{ startAdornment: <InputAdornment position="start">https://</InputAdornment> }}
                          error={Boolean(socialMediaLinkError?.link)}
                          helperText={socialMediaLinkError?.link}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleSocialMediaClose}>Close</Button>
                  <Button
                    onClick={() => {
                      if (!checkMediaLinkError(socialMediaLink)) {
                        // console.log('Goo to go...');
                        // console.log(socialMediaLink);
                        // console.log(socialMediaLinks);
                        setFieldValue('social_media', socialMediaLinks);
                        setSocialMediaLinks([...socialMediaLinks, socialMediaLink]);
                        setSocialMediaLink(null);
                        setSocialMediaLinkError(null);
                        successProcessor('Booking Site Successfully Added', dispatch, openSnackbar);
                      } else {
                        console.log('Nope!!!');
                      }
                    }}
                  >
                    Add
                  </Button>
                </DialogActions>
              </Dialog>
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
