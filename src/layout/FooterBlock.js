import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Container,
  CardMedia,
  Divider,
  Grid,
  Link,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

// third party
import { motion } from 'framer-motion';

// project import
import useConfig from 'hooks/useConfig';
import AnimateButton from 'components/@extended/AnimateButton';

import { useState, useRef, useEffect } from 'react';

// assets
import {
  SendOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  InstagramOutlined,
  GlobalOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { FaTiktok } from 'react-icons/fa';

// ==============================|| LANDING - FOOTER PAGE ||============================== //

let languages = [
  { language: 'English', region: 'United Arab Emirates' },
  { language: 'Azərbaycan dili', region: 'Azərbaycan' },
  { language: 'Bahasa Indonesia', region: 'Indonesia' },
  { language: 'Bosanski', region: 'Bosna i Hercegovina' },
  { language: 'Català', region: 'Espanya' },
  { language: 'Čeština', region: 'Česká republika' },
  { language: 'Crnogorski', region: 'Crna Gora' },
  { language: 'Dansk', region: 'Danmark' },
  { language: 'Deutsch', region: 'Deutschland' },
  { language: 'Deutsch', region: 'Österreich' },
  { language: 'Deutsch', region: 'Schweiz' },
  { language: 'Eesti', region: 'Eesti' },
  { language: 'English', region: 'Australia' },
  { language: 'English', region: 'Canada' },
  { language: 'English', region: 'Guyana' },
  { language: 'English', region: 'India' },
  { language: 'English', region: 'Ireland' },
  { language: 'English', region: 'New Zealand' },
  { language: 'English', region: 'Singapore' },
  { language: 'Español', region: 'Argentina' },
  { language: 'Español', region: 'Belice' },
  { language: 'Español', region: 'Bolivia' },
  { language: 'Español', region: 'Chile' },
  { language: 'Español', region: 'Colombia' },
  { language: 'Español', region: 'Costa Rica' },
  { language: 'Español', region: 'Ecuador' },
  { language: 'Español', region: 'El Salvador' },
  { language: 'Español', region: 'España' },
  { language: 'Español', region: 'Estados Unidos' },
  { language: 'Español', region: 'Guatemala' },
  { language: 'Español', region: 'Honduras' },
  { language: 'Español', region: 'Latinoamérica' },
  { language: 'Español', region: 'México' },
  { language: 'Español', region: 'Nicaragua' },
  { language: 'Español', region: 'Panamá' },
  { language: 'Español', region: 'Paraguay' },
  { language: 'Español', region: 'Perú' },
  { language: 'Español', region: 'Venezuela' },
  { language: 'Français', region: 'Belgique' },
  { language: 'Français', region: 'Canada' },
  { language: 'Français', region: 'France' },
  { language: 'Français', region: 'Suisse' },
  { language: 'Gaeilge', region: 'Éire' },
  { language: 'Hrvatski', region: 'Hrvatska' },
  { language: 'isiXhosa', region: 'eMzantsi Afrika' },
  { language: 'isiZulu', region: 'iNingizimu Afrika' },
  { language: 'Íslenska', region: 'Ísland' },
  { language: 'Italiano', region: 'Italia' },
  { language: 'Italiano', region: 'Svizzera' },
  { language: 'Kiswahili', region: 'Āfrika' },
  { language: 'Latviešu', region: 'Latvija' },
  { language: 'Lietuvių', region: 'Lietuva' },
  { language: 'Magyar', region: 'Magyarország' },
  { language: 'Malti', region: 'Malta' },
  { language: 'Melayu', region: 'Malaysia' },
  { language: 'Nederlands', region: 'België' },
  { language: 'Nederlands', region: 'Nederland' },
  { language: 'Norsk', region: 'Norge' },
  { language: 'Polski', region: 'Polska' },
  { language: 'Português', region: 'Brasil' },
  { language: 'Português', region: 'Portugal' },
  { language: 'Română', region: 'România' },
  { language: 'Shqip', region: 'Shqipëri' },
  { language: 'Slovenčina', region: 'Slovensko' },
  { language: 'Slovenščina', region: 'Slovenija' },
  { language: 'Srpski', region: 'Srbija' },
  { language: 'Suomi', region: 'Suomi' },
  { language: 'Svenska', region: 'Sverige' },
  { language: 'Tagalog', region: 'Pilipinas' },
  { language: 'Tiếng Việt', region: 'Việt Nam' },
  { language: 'Türkçe', region: 'Türkiye' },
  { language: 'Ελληνικά', region: 'Ελλάδα' },
  { language: 'Български', region: 'България' },
  { language: 'Македонски', region: 'Северна Македонија' },
  { language: 'Русский', region: 'Россия' },
  { language: 'Українська', region: 'Україна' },
  { language: 'ქართული', region: 'საქართველო' },
  { language: 'Հայերեն', region: 'Հայաստան' },
  { language: 'עברית', region: 'ישראל' },
  { language: 'العربية', region: 'العالم' },
  { language: 'हिन्दी', region: 'भारत' },
  { language: 'ไทย', region: 'ประเทศไทย' },
  { language: '한국어', region: '대한민국' },
  { language: '日本語', region: '日本' },
  { language: '简体中文', region: '美国' },
  { language: '繁體中文', region: '美國' },
  { language: '简体中文', region: '中国' },
  { language: '繁體中文', region: '香港' },
  { language: '繁體中文', region: '台灣' }
];

let currencys = [
  { name: 'United States dollar', symbol: 'USD-$' },
  { name: 'Australian dollar', symbol: 'AUD-$' },
  { name: 'Brazilian real', symbol: 'BRL-R$' },
  { name: 'Bulgarian lev', symbol: 'BGN-лв.' },
  { name: 'Canadian dollar', symbol: 'CAD-$' },
  { name: 'Chilean peso', symbol: 'CLP-$' },
  { name: 'Chinese yuan', symbol: 'CNY-￥' },
  { name: 'Colombian peso', symbol: 'COP-$' },
  { name: 'Costa Rican colon', symbol: 'CRC-₡' },
  { name: 'Croatian kuna', symbol: 'HRK-kn' },
  { name: 'Czech koruna', symbol: 'CZK-Kč' },
  { name: 'Danish krone', symbol: 'DKK-kr' },
  { name: 'Emirati dirham', symbol: 'AED-ﺩ.ﺇ' },
  { name: 'Euro', symbol: 'EUR-€' },
  { name: 'Hong Kong dollar', symbol: 'HKD-$' },
  { name: 'Hungarian forint', symbol: 'HUF-Ft' },
  { name: 'Indian rupee', symbol: 'INR-₹' },
  { name: 'Israeli new shekel', symbol: 'ILS-₪' },
  { name: 'Japanese yen', symbol: 'JPY-¥' },
  { name: 'Malaysian ringgit', symbol: 'MYR-RM' },
  { name: 'Mexican peso', symbol: 'MXN-$' },
  { name: 'Moroccan dirham', symbol: 'MAD' },
  { name: 'New Taiwan dollar', symbol: 'TWD-$' },
  { name: 'New Zealand dollar', symbol: 'NZD-$' },
  { name: 'Norwegian krone', symbol: 'NOK-kr' },
  { name: 'Peruvian sol', symbol: 'PEN-S/' },
  { name: 'Philippine peso', symbol: 'PHP-₱' },
  { name: 'Polish zloty', symbol: 'PLN-zł' },
  { name: 'Pound sterling', symbol: 'GBP-£' },
  { name: 'Romanian leu', symbol: 'RON-lei' },
  { name: 'Saudi Arabian riyal', symbol: 'SAR-SR' },
  { name: 'Singapore dollar', symbol: 'SGD-$' },
  { name: 'South African rand', symbol: 'ZAR-R' },
  { name: 'South Korean won', symbol: 'KRW-₩' },
  { name: 'Swedish krona', symbol: 'SEK-kr' },
  { name: 'Swiss franc', symbol: 'CHF' },
  { name: 'Thai baht', symbol: 'THB-฿' },
  { name: 'Turkish lira', symbol: 'TRY-₺' },
  { name: 'Uruguayan peso', symbol: 'UYU-$U' }
];

const style = {
  borderRadius: '10px',
  border: '1px solid',
  '&:hover': {
    cursor: 'pointer',
    background: '#ddd'
  }
};

const FooterBlock = ({ isFull }) => {
  const theme = useTheme();
  const { presetColor } = useConfig();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });
  const [selectedLanguage, setSelectedLanguage] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState(0);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  const handleClose = () => {
    setCurrencyOpen(false), setLanguageModalOpen(false);
  };

  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

  const handleOpen = (scrollType) => () => {
    setLanguageModalOpen(true);
    setScroll(scrollType);
  };

  const handleClickOpen = (scrollType) => () => {
    setCurrencyOpen(true);
    setScroll(scrollType);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (currencyOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [currencyOpen]);

  const linkSX = {
    color: theme.palette.common.white,
    fontSize: '0.875rem',
    fontWeight: 400,
    opacity: '0.6',
    '&:hover': {
      opacity: '1'
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, padding: '20px' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? 'inboxicon' : 'mailicon'}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? 'inboxicon' : 'mailicon'}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {isFull && (
        <Box
          sx={{
            position: 'relative',
            bgcolor: 'theme.palette.grey.A700',
            zIndex: 1,
            mt: { xs: 0, md: 13.75 },
            pt: { xs: 8, sm: 7.5, md: 18.75 },
            pb: { xs: 2.5, md: 10 },
            '&:after': {
              content: '""',
              position: 'absolute',
              width: '100%',
              height: '80%',
              bottom: 0,
              left: 0,
              background: `linear-gradient(180deg, transparent 0%, ${theme.palette.grey.A700} 70%)`
            }
          }}
        >
          <CardMedia
            component="img"
            image={`/assets/images/landing/img-footer-${presetColor}.png`}
            sx={{
              display: { xs: 'none', md: 'block' },
              width: '55%',
              maxWidth: 700,
              position: 'absolute',
              top: '-28%',
              right: 0
            }}
          />
          <Container>
            <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
              <Grid item xs={12} md={6} sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={2} sx={{ [theme.breakpoints.down('md')]: { pr: 0, textAlign: 'center' } }}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ color: theme.palette.common.white }}>
                      Roadmap
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <motion.div
                      initial={{ opacity: 0, translateY: 550 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 150,
                        damping: 30
                      }}
                    >
                      <Typography
                        variant="h2"
                        sx={{
                          color: theme.palette.common.white,
                          fontWeight: 700
                        }}
                      >
                        Upcoming Release
                      </Typography>
                    </motion.div>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" sx={{ color: theme.palette.common.white }}>
                      What is next? Checkout the Upcoming release of Mantis React.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ my: 2 }}>
                    <Box sx={{ display: 'inline-block' }}>
                      <AnimateButton>
                        <Button component={Link} href="#" target="_blank" size="large" variant="contained" endIcon={<SendOutlined />}>
                          Roadmap
                        </Button>
                      </AnimateButton>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      <Box sx={{ pt: isFull ? 0 : 5, pb: 2, bgcolor: '#525252', height: 'auto' }}>
        <Container>
          <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30
                }}
              >
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                    <img style={{ width: '200px' }} src="/assets/images/image logo.png" alt="" />
                  </Grid>
                  <Grid item md={6} xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ color: theme.palette.common.white }}>
                      Connect with Us on Social:
                    </Typography>
                    <Grid>
                      <Link href="https://www.facebook.com/rentmyvr" sx={linkSX} color="white" underline="none">
                        <FacebookOutlined className="icon" style={{ fontSize: '30px', padding: '5px' }} />
                      </Link>

                      <Link href="https://www.instagram.com/rentmyvr" sx={linkSX} color="white" underline="none">
                        <InstagramOutlined className="icon" style={{ fontSize: '30px', padding: '5px' }} />
                      </Link>

                      <Link href=" https://www.youtube.com/@rentmyvr" sx={linkSX} color="white" underline="none">
                        <YoutubeOutlined className="icon" style={{ fontSize: '30px', padding: '5px' }} />
                      </Link>

                      <Link href="https://twitter.com/rentmyvr" sx={linkSX} color="white" underline="none">
                        <TwitterOutlined className="icon" style={{ fontSize: '30px', padding: '5px' }} />
                      </Link>

                      <Link href="https://www.tiktok.com/@rentmyvr.com" sx={linkSX} color="white" underline="none">
                        <FaTiktok className="icon" style={{ fontSize: '25px' }} />
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={7}>
              <Grid container spacing={2}>
                <Grid item sm={3} xs={12}>
                  <Link href="/register" underline="none">
                    <Typography variant="h3" style={{ textAlign: 'center', color: 'white' }}>
                      Sign Up
                    </Typography>
                  </Link>
                </Grid>
                <Grid item sm={3} xs={12}>
                  <motion.div
                    initial={{ opacity: 0, translateY: 550 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 150,
                      damping: 30,
                      delay: 0.2
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="h5" sx={{ color: theme.palette.common.white, textAlign: 'center' }}>
                          Terms and Conditions
                        </Typography>
                      </Grid>
                      {/* <Grid item xs={12}>
                        <Link href="#" underline="none" sx={linkSX} target="_blank">
                          Purchase Mantis React
                        </Link>
                      </Grid> */}
                    </Grid>
                  </motion.div>
                </Grid>
                <Grid item sm={3} xs={12}>
                  <motion.div
                    initial={{ opacity: 0, translateY: 550 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 150,
                      damping: 30,
                      delay: 0.4
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="h5" sx={{ color: theme.palette.common.white, textAlign: 'center' }}>
                          Cookie Policy
                        </Typography>
                      </Grid>
                      {/* <Grid item xs={12}>
                        <Link href="#" underline="none" target="_blank" sx={linkSX}>
                          Documentation
                        </Link>
                      </Grid> */}
                    </Grid>
                  </motion.div>
                </Grid>
                <Grid item sm={3} xs={12}>
                  <motion.div
                    initial={{ opacity: 0, translateY: 550 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 150,
                      damping: 30,
                      delay: 0.6
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="h5" sx={{ color: theme.palette.common.white, textAlign: 'center' }}>
                          Site Map
                        </Typography>
                      </Grid>
                      {/* <Grid item xs={12}>
                        <Link href="#" underline="none" target="_blank" sx={linkSX}>
                          - &nbsp; Berry React Material
                        </Link>
                      </Grid> */}
                    </Grid>
                  </motion.div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ mt: 3, color: theme.palette.common.white }}>
                Disclaimer:
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ paddingTop: '0px' }}>
              <Typography sx={{ color: theme.palette.common.white }} mb={1}>
                Our goal is to help connect guests of vacation rentals directly to hosts by providing a more thorough and all inclusive
                search search search search search search search search experience. We provide one platform where all Booking Site profiles
                and offer direct booking and communication with their guests.
              </Typography>

              <Typography sx={{ color: theme.palette.common.white }}>
                All information on RentMyVR.com is to be verified by all bookings or transactions. We seek to provide only an online
                directory. We will not be a part of your booking communication, communication, screening or agreements between hosts and
                guests. We also will not be a part of any contract between owners management companies.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Divider sx={{ borderColor: '#8c8c8c' }} />
      <Box
        sx={{
          py: 1.5,
          bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[50] : '#525252'
        }}
      >
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Typography variant="subtitle2" color="#fff">
                © 2023 Rent My VR
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid container spacing={2} alignItems="center" sx={{ justifyContent: 'flex-end' }}>
                <Grid item>
                  <Link onClick={handleOpen('paper')} underline="none" sx={linkSX} style={{ cursor: 'pointer' }}>
                    <GlobalOutlined style={{ marginRight: '5px' }} />
                    {languages[selectedLanguage].language}
                  </Link>
                  <Dialog
                    open={languageModalOpen}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                  >
                    <DialogTitle id="scroll-dialog-title">
                      Choose a language and region
                      <DialogActions style={{ float: 'right' }}>
                        <CloseOutlined onClick={handleClose} />
                      </DialogActions>
                    </DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                      <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                        <Grid container spacing={0} alignItems="center">
                          {languages.map((language, key) => (
                            <Grid
                              key={key}
                              item
                              xs={12}
                              sm={6}
                              md={3}
                              p={1}
                              my={1}
                              sx={style}
                              borderColor={key === selectedLanguage ? '#000' : '#fff!important'}
                              onClick={() => setSelectedLanguage(key)}
                            >
                              <Typography className="sub">{language.language}</Typography>
                              <Typography className="sub" color={'grey'}>
                                {language.region}
                              </Typography>
                            </Grid>
                          ))}
                        </Grid>
                      </DialogContentText>
                    </DialogContent>
                  </Dialog>
                </Grid>
                <Grid item>
                  <Link onClick={handleClickOpen('paper')} underline="none" sx={linkSX} style={{ cursor: 'pointer' }}>
                    {currencys[selectedCurrency].symbol}
                  </Link>
                  <Dialog
                    open={currencyOpen}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                  >
                    <DialogTitle id="scroll-dialog-title">
                      Choose a currency
                      <DialogActions style={{ float: 'right' }}>
                        <CloseOutlined onClick={handleClose} />
                      </DialogActions>
                    </DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                      <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                        <Grid container spacing={0} alignItems="center">
                          {currencys.map((currency, key) => (
                            <Grid
                              key={key}
                              item
                              xs={12}
                              sm={6}
                              md={3}
                              my={1}
                              p={1}
                              sx={style}
                              borderColor={key === selectedCurrency ? '#000' : '#fff!important'}
                              onClick={() => setSelectedCurrency(key)}
                            >
                              <Typography className="sub">{currency.name}</Typography>
                              <Typography className="sub">{currency.symbol}</Typography>
                            </Grid>
                          ))}
                        </Grid>
                      </DialogContentText>
                    </DialogContent>
                  </Dialog>
                </Grid>
                <Grid item>
                  <Link onClick={toggleDrawer('bottom', true)} underline="none" sx={linkSX} style={{ cursor: 'pointer' }}>
                    Support & resources
                  </Link>
                  <Drawer anchor={'bottom'} open={state['bottom']} onClose={toggleDrawer('bottom', false)}>
                    {list('bottom')}
                  </Drawer>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

FooterBlock.propTypes = {
  isFull: PropTypes.bool
};

export default FooterBlock;
