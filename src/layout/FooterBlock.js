import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Container, CardMedia, Divider, Grid, Link, Typography } from '@mui/material';

// third party
import { motion } from 'framer-motion';

// project import
import useConfig from 'hooks/useConfig';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { SendOutlined, TwitterOutlined, YoutubeOutlined, AmazonOutlined, GlobalOutlined } from '@ant-design/icons';
import Logo from 'components/logo';

// const imgfooterlogo = 'assets/images/landing/codedthemes-logo.svg';
const imgfootersoc1 = 'assets/images/landing/img-soc1.svg';
const imgfootersoc2 = 'assets/images/landing/img-soc2.svg';
const imgfootersoc3 = 'assets/images/landing/img-soc3.svg';

// ==============================|| LANDING - FOOTER PAGE ||============================== //

const FooterBlock = ({ isFull }) => {
  const theme = useTheme();
  const { presetColor } = useConfig();

  const linkSX = {
    color: theme.palette.common.white,
    fontSize: '0.875rem',
    fontWeight: 400,
    opacity: '0.6',
    '&:hover': {
      opacity: '1'
    }
  };
  return (
    <>
      {isFull && (
        <Box
          sx={{
            position: 'relative',
            bgcolor: theme.palette.grey.A700,
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
                        <Button
                          component={Link}
                          href="https://codedthemes.gitbook.io/mantis/roadmap"
                          target="_blank"
                          size="large"
                          variant="contained"
                          endIcon={<SendOutlined />}
                        >
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

      <Box sx={{ pt: isFull ? 0 : 10, pb: 10, bgcolor: theme.palette.grey.A700 }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
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
                  <Grid item xs={12}>
                    {/* <CardMedia component="img" image={imgfooterlogo} sx={{ width: 'auto' }} /> */}
                    <Logo reverse />
                  </Grid>
                  <Grid item xs={12}>
                    {/* <Typography variant="subtitle1" sx={{ fontWeight: 400, color: theme.palette.common.white }}>
                      Sign up
                    </Typography> */}

                    <Link href="/register" underline="none" sx={linkSX}>
                      Sign up
                    </Link>

                    <Typography variant="h5" sx={{ mb: 2, color: theme.palette.common.white }}>
                      Connect with Us on Social:
                    </Typography>
                    <TwitterOutlined className="icon" style={{ fontSize: '30px', color: '#fff', padding: '5px' }} />
                    <YoutubeOutlined className="icon" style={{ fontSize: '30px', color: '#fff', padding: '5px' }} />
                    <AmazonOutlined className="icon" style={{ fontSize: '30px', color: '#fff', padding: '5px' }} />
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item sm={4} xs={12}>
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
                        <Typography variant="h5" sx={{ mb: 2, color: theme.palette.common.white }}>
                          Terms and Conditions
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Link
                          href="https://mui.com/store/items/mantis-react-admin-dashboard-template/"
                          underline="none"
                          sx={linkSX}
                          target="_blank"
                        >
                          Purchase Mantis React
                        </Link>
                      </Grid>
                      <Grid item xs={12}>
                        <Link href="https://material-ui.com/store/contributors/codedthemes/" underline="none" sx={linkSX} target="_blank">
                          Portfolio
                        </Link>
                      </Grid>
                      <Grid item xs={12}>
                        <Link href="https://blog.mantisdashboard.io" underline="none" target="_blank" sx={linkSX}>
                          Blog
                        </Link>
                      </Grid>
                    </Grid>
                  </motion.div>
                </Grid>
                <Grid item sm={4} xs={12}>
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
                        <Typography variant="h5" sx={{ mb: 2, color: theme.palette.common.white }}>
                          Cookie Policy
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Link href="https://codedthemes.gitbook.io/mantis/" underline="none" target="_blank" sx={linkSX}>
                          Documentation
                        </Link>
                      </Grid>
                      <Grid item xs={12}>
                        <Link href="https://github.com/codedthemes/" underline="none" target="_blank" sx={linkSX}>
                          Github
                        </Link>
                      </Grid>
                      <Grid item xs={12}>
                        <Link href="https://codedthemes.gitbook.io/mantis/changelog" underline="none" target="_blank" sx={linkSX}>
                          Change Log
                        </Link>
                      </Grid>
                    </Grid>
                  </motion.div>
                </Grid>
                <Grid item sm={4} xs={12}>
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
                        <Typography variant="h5" sx={{ mb: 2, color: theme.palette.common.white }}>
                          Site Map
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Link
                          href="https://mui.com/store/previews/berry-react-material-admin/"
                          underline="none"
                          target="_blank"
                          sx={linkSX}
                        >
                          - &nbsp; Berry React Material
                        </Link>
                      </Grid>
                      <Grid item xs={12}>
                        <Link
                          href="https://mui.com/store/previews/berry-react-material-admin-free/"
                          underline="none"
                          target="_blank"
                          sx={linkSX}
                        >
                          - &nbsp; Berry React Free
                        </Link>
                      </Grid>
                      <Grid item xs={12}>
                        <Link
                          href="https://github.com/codedthemes/mantis-free-react-admin-template"
                          underline="none"
                          target="_blank"
                          sx={linkSX}
                        >
                          - &nbsp; Mantis Free React
                        </Link>
                      </Grid>
                    </Grid>
                  </motion.div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Divider sx={{ borderColor: 'grey.700' }} />
      <Box
        sx={{
          py: 1.5,
          bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[50] : theme.palette.grey[800]
        }}
      >
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Typography variant="subtitle2" color="secondary">
                © Copyright icon 2023 Rent My VR
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid container spacing={2} alignItems="center" sx={{ justifyContent: 'flex-end' }}>
                <Grid item>
                  <Link href="#" underline="none" sx={linkSX}>
                    {/* <CardMedia component="img" image={imgfootersoc1} /> */}
                    <GlobalOutlined style={{ marginRight: '5px' }} />
                    English (US)
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" underline="none" sx={linkSX}>
                    {/* <CardMedia component="img" image={imgfootersoc2} /> */}
                    $ USD
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" underline="none" sx={linkSX}>
                    {/* <CardMedia component="img" image={imgfootersoc3} /> */}
                    Support & resources
                  </Link>
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
