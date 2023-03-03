import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';

// next
import NextLink from 'next/link';
import { useSession } from 'next-auth/react';

// material-ui
import AppBar from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';
import {
  useMediaQuery,
  Box,
  Button,
  Chip,
  Container,
  Drawer,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
  Menu,
  MenuItem
} from '@mui/material';

// project import
import { DEFAULT_PATH, ACCOUNT_URL } from 'config';
import IconButton from 'components/@extended/IconButton';

// import AnimateButton from 'components/@extended/AnimateButton';
import Logo from 'components/logo';

// assets
import { MenuOutlined, LineOutlined } from '@ant-design/icons';

// ==============================|| COMPONENTS - APP BAR ||============================== //

// elevation scroll
function ElevationScroll({ layout, children, window }) {
  const theme = useTheme();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
    target: window ? window() : undefined
  });

  const backColorScroll = theme.palette.mode === 'dark' ? theme.palette.grey[50] : theme.palette.grey[50];
  // const backColorScroll = theme.palette.mode === 'dark' ? theme.palette.grey[50] : theme.palette.grey[800];
  const backColor = layout !== 'landing' ? backColorScroll : 'transparent';

  return React.cloneElement(children, {
    style: {
      // color: '#000',
      backgroundColor: trigger ? backColorScroll : backColor
    }
  });
}

const Header = ({ handleDrawerOpen, layout = 'landing', ...others }) => {
  const theme = useTheme();
  const { data: session } = useSession();

  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerToggle, setDrawerToggle] = useState(false);

  /** Method called on multiple components with different event types */
  const drawerToggler = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerToggle(open);
  };

  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#00ff00"
  //     }
  //   }
  // });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ElevationScroll layout={layout} {...others}>
      <AppBar sx={{ bgcolor: 'transparent', color: theme.palette.text.primary, boxShadow: 'none' }}>
        <Container disableGutters={matchDownMd} maxWidth="unset">
          <Toolbar sx={{ px: { xs: 1.5, md: 0, lg: 0 }, py: 0 }}>
            <Stack direction="row" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }} alignItems="center">
              <Typography component="div" sx={{ textAlign: 'left', display: 'inline-block' }}>
                <Logo reverse to={session ? DEFAULT_PATH : '/'} />
              </Typography>
            </Stack>
            <Stack
              direction="row"
              sx={{
                '& .header-link': { px: 1, color: '#000', fontWeight: 500, '&:hover': { color: theme.palette.primary.main } },
                display: { xs: 'none', md: 'block' }
              }}
              spacing={2}
            >
              {session && (
                <NextLink href={DEFAULT_PATH} passHref>
                  <Link className="header-link" color="white" underline="none">
                    Dashboard
                  </Link>
                </NextLink>
              )}
              <NextLink href={DEFAULT_PATH} passHref>
                <Link className="header-link" color="white" underline="none">
                  Search Properties
                </Link>
              </NextLink>
              <NextLink href={DEFAULT_PATH} passHref>
                <Link className="header-link" color="white" underline="none">
                  Management Companies
                </Link>
              </NextLink>
              <Link
                id="basic-button"
                className="header-link"
                underline="none"
                style={{ cursor: 'pointer' }}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                List With Us
              </Link>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>
                  <NextLink href="/property" passHref>
                    <Link className="header-link" color="black" underline="none">
                      List A Property
                    </Link>
                  </NextLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <NextLink href="/company" passHref>
                    <Link className="header-link" color="black" underline="none">
                      List Your Company
                    </Link>
                  </NextLink>
                </MenuItem>
              </Menu>
              {/* <NextLink href={DEFAULT_PATH} passHref>
                <Link className="header-link" color="white" underline="none">
                  Ad. with Us
                </Link>
              </NextLink> */}
              <NextLink href={DEFAULT_PATH} passHref>
                <Link className="header-link" color="white" underline="none">
                  FAQs
                </Link>
              </NextLink>
              <NextLink href={DEFAULT_PATH} passHref>
                <Link className="header-link" color="white" underline="none">
                  Comming Soon
                </Link>
              </NextLink>
              {!session && (
                <>
                  <NextLink href={ACCOUNT_URL.LOGIN} passHref>
                    <Link className="header-link" color="white" underline="none">
                      Login
                    </Link>
                  </NextLink>
                </>
              )}
              {/* <Box sx={{ display: 'inline-block' }}>
                <AnimateButton>
                  <Button
                    component={Link}
                    href="https://mui.com/store/items/mantis-react-admin-dashboard-template/"
                    disableElevation
                    color="primary"
                    variant="contained"
                  >
                    Purchase Now
                  </Button>
                </AnimateButton>
              </Box> */}
            </Stack>
            <Box
              sx={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                display: { xs: 'flex', md: 'none' }
              }}
            >
              <Typography component="div" sx={{ textAlign: 'left', display: 'inline-block' }}>
                <Logo reverse to={session ? DEFAULT_PATH : '/'} />
              </Typography>
              <Stack direction="row" spacing={2}>
                {session && layout === 'component' && (
                  <NextLink href={DEFAULT_PATH} passHref>
                    <Button variant="outlined" size="small" color="warning" sx={{ mt: 0.5, height: 28 }}>
                      Dashboard
                    </Button>
                  </NextLink>
                )}
                {layout !== 'component' && (
                  <NextLink href="/components-overview/buttons" passHref>
                    <Button variant="outlined" size="small" color="warning" sx={{ mt: 0.5, height: 28 }}>
                      All Components
                    </Button>
                  </NextLink>
                )}

                <IconButton
                  color="inherit"
                  {...(layout === 'component' ? { onClick: handleDrawerOpen } : { onClick: drawerToggler(true) })}
                  // sx={{ '&:hover': { bgcolor: theme.palette.mode === 'dark' ? 'secondary.lighter' : 'secondary.dark' } }}
                  sx={{
                    bgcolor: theme.palette.mode === 'dark' ? 'secondary.lighter' : '#1890ff',
                    '&>span': '#262626',
                    '&:hover': { bgcolor: theme.palette.mode === 'dark' ? 'secondary.lighter' : '#096dd9' }
                  }}
                >
                  <MenuOutlined style={{ color: theme.palette.mode === 'dark' ? 'inherit' : theme.palette.grey[100] }} />
                </IconButton>
              </Stack>
              <Drawer
                anchor="top"
                open={drawerToggle}
                onClose={drawerToggler(false)}
                sx={{ '& .MuiDrawer-paper': { backgroundImage: 'none' } }}
              >
                <Box
                  sx={{
                    width: 'auto',
                    '& .MuiListItemIcon-root': {
                      fontSize: '1rem',
                      minWidth: 28
                    }
                  }}
                  role="presentation"
                  onClick={drawerToggler(false)}
                  onKeyDown={drawerToggler(false)}
                >
                  <List>
                    <Link style={{ textDecoration: 'none' }} href={DEFAULT_PATH}>
                      <ListItemButton component="span">
                        <ListItemIcon>
                          <LineOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                      </ListItemButton>
                    </Link>
                    <Link style={{ textDecoration: 'none' }} href="/components-overview/buttons">
                      <ListItemButton component="span">
                        <ListItemIcon>
                          <LineOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Search Properties" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                      </ListItemButton>
                    </Link>
                    <Link style={{ textDecoration: 'none' }} href="/">
                      <ListItemButton component="span">
                        <ListItemIcon>
                          <LineOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Management Companies" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                      </ListItemButton>
                    </Link>
                    <Link style={{ textDecoration: 'none' }} href="/">
                      <ListItemButton component="span">
                        <ListItemIcon>
                          <LineOutlined />
                        </ListItemIcon>
                        <ListItemText primary="List With Us" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                      </ListItemButton>
                    </Link>
                    {/* <Link style={{ textDecoration: 'none' }} href="/">
                      <ListItemButton component="span">
                        <ListItemIcon>
                          <LineOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Advertise with us" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                      </ListItemButton>
                    </Link> */}
                    <Link style={{ textDecoration: 'none' }} href="/">
                      <ListItemButton component="span">
                        <ListItemIcon>
                          <LineOutlined />
                        </ListItemIcon>
                        <ListItemText primary="FAQ" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                        <Chip color="primary" label="v1.0" size="small" />
                      </ListItemButton>
                    </Link>
                    <Link style={{ textDecoration: 'none' }} href="/">
                      <ListItemButton component="span">
                        <ListItemIcon>
                          <LineOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Comming Soon" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                        <Chip color="primary" label="v1.0" size="small" />
                      </ListItemButton>
                    </Link>
                    {session ? (
                      <Link style={{ textDecoration: 'none' }} href="/">
                        <ListItemButton component="span">
                          <ListItemIcon>
                            <LineOutlined />
                          </ListItemIcon>
                          <ListItemText primary="Logout" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                        </ListItemButton>
                      </Link>
                    ) : (
                      <>
                        <Link style={{ textDecoration: 'none' }} href={ACCOUNT_URL.LOGIN}>
                          <ListItemButton component="span">
                            <ListItemIcon>
                              <LineOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Login" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                          </ListItemButton>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} href={ACCOUNT_URL.REGISTER}>
                          <ListItemButton component="span">
                            <ListItemIcon>
                              <LineOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Register" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                          </ListItemButton>
                        </Link>
                      </>
                    )}
                  </List>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
};

Header.propTypes = {
  handleDrawerOpen: PropTypes.func,
  layout: PropTypes.string
};

export default Header;
