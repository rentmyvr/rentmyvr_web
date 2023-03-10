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
  Container,
  Drawer,
  Link,
  ListItemButton,
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
import { MenuOutlined } from '@ant-design/icons';
import { TreeItem, TreeView } from '@mui/lab';

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

const ExpandMoreIcon = () => {
  return (
    <svg
      className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="ExpandMoreIcon"
    >
      <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
    </svg>
  );
};
const ChevronRightIcon = () => {
  return (
    <svg
      className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="ChevronRightIcon"
    >
      <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
    </svg>
  );
};

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
  const [listEl, setListEl] = useState(null);
  const [helpEl, setHelpEl] = useState(null);
  const listOpen = Boolean(listEl);
  const helpOpen = Boolean(helpEl);
  const handleListClick = (event) => {
    setListEl(event.currentTarget);
  };
  const handleHelpClick = (event) => {
    setHelpEl(event.currentTarget);
  };
  const handleListClose = () => {
    setListEl(null);
  };
  const handleHelpClose = () => {
    setHelpEl(null);
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
                aria-controls={listOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={listOpen ? 'true' : undefined}
                onClick={handleListClick}
              >
                List With Us
              </Link>
              <Menu
                id="basic-menu"
                anchorEl={listEl}
                open={listOpen}
                onClose={handleListClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}
              >
                <MenuItem onClick={handleListClose}>
                  <NextLink href="/property" passHref>
                    <Link className="header-link" color="black" underline="none">
                      List A Property
                    </Link>
                  </NextLink>
                </MenuItem>
                <MenuItem onClick={handleListClose}>
                  <NextLink href="/company" passHref>
                    <Link className="header-link" color="black" underline="none">
                      List Your Company
                    </Link>
                  </NextLink>
                </MenuItem>
                <MenuItem onClick={handleListClose}>
                  <NextLink href="/pricing" passHref>
                    <Link className="header-link" color="black" underline="none">
                      Pricing
                    </Link>
                  </NextLink>
                </MenuItem>
              </Menu>
              <Link
                id="help-button"
                className="header-link"
                underline="none"
                style={{ cursor: 'pointer' }}
                aria-controls={helpOpen ? 'help-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={helpOpen ? 'true' : undefined}
                onClick={handleHelpClick}
              >
                Help
              </Link>
              <Menu
                id="help-menu"
                anchorEl={helpEl}
                open={helpOpen}
                onClose={handleHelpClose}
                MenuListProps={{
                  'aria-labelledby': 'help-button'
                }}
              >
                <MenuItem onClick={handleHelpClose}>
                  <NextLink href="/FAQ" passHref>
                    <Link className="header-link" color="black" underline="none">
                      FAQs
                    </Link>
                  </NextLink>
                </MenuItem>
                <MenuItem onClick={handleHelpClose}>
                  <NextLink href="/support" passHref>
                    <Link className="header-link" color="black" underline="none">
                      Support
                    </Link>
                  </NextLink>
                </MenuItem>
                <MenuItem onClick={handleHelpClose}>
                  <NextLink href="/contact" passHref>
                    <Link className="header-link" color="black" underline="none">
                      Contact Us
                    </Link>
                  </NextLink>
                </MenuItem>
              </Menu>
              {/* <NextLink href={DEFAULT_PATH} passHref>
                <Link className="header-link" color="white" underline="none">
                  Ad. with Us
                </Link>
              </NextLink> */}
              <NextLink href="/coming-soon" passHref>
                <Link className="header-link" color="white" underline="none">
                  Coming Soon
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
                anchor="right"
                open={drawerToggle}
                onClose={drawerToggler(false)}
                sx={{
                  '& .MuiDrawer-paper': {
                    backgroundImage: 'none',
                    borderTopLeftRadius: 15,
                    borderBottomLeftRadius: 15,
                    width: '70%',
                    paddingTop: 1
                  }
                }}
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
                >
                  <Typography
                    component="div"
                    sx={{ textAlign: 'left', display: 'flex', justifyContent: 'center', borderBottom: '1px solid grey' }}
                    py={1}
                  >
                    <Logo reverse to={session ? DEFAULT_PATH : '/'} />
                  </Typography>
                  <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                  >
                    <Link style={{ textDecoration: 'none' }} href={DEFAULT_PATH}>
                      <ListItemButton component="span">
                        <ListItemText
                          primary="Search Properties"
                          primaryTypographyProps={{ variant: 'h6', color: 'text.primary', paddingLeft: 2 }}
                        />
                      </ListItemButton>
                    </Link>
                    <Link style={{ textDecoration: 'none' }} href={DEFAULT_PATH}>
                      <ListItemButton component="span">
                        <ListItemText
                          primary="Management Companies"
                          primaryTypographyProps={{ variant: 'h6', color: 'text.primary', paddingLeft: 2 }}
                        />
                      </ListItemButton>
                    </Link>
                    <TreeItem nodeId="3" label="List With Us">
                      <Link style={{ textDecoration: 'none' }} href="/property">
                        <ListItemButton component="span">
                          <ListItemText primary="List A Property" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                        </ListItemButton>
                      </Link>
                      <Link style={{ textDecoration: 'none' }} href="/company">
                        <ListItemButton component="span">
                          <ListItemText primary="List Your Company" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                        </ListItemButton>
                      </Link>
                      <Link style={{ textDecoration: 'none' }} href="/pricing">
                        <ListItemButton component="span">
                          <ListItemText primary="Pricing" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                        </ListItemButton>
                      </Link>
                    </TreeItem>
                    <TreeItem nodeId="4" label="Help">
                      <Link style={{ textDecoration: 'none' }} href="/FAQ">
                        <ListItemButton component="span">
                          <ListItemText primary="FAQs" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                        </ListItemButton>
                      </Link>
                      <Link style={{ textDecoration: 'none' }} href="/support">
                        <ListItemButton component="span">
                          <ListItemText primary="Support" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                        </ListItemButton>
                      </Link>
                      <Link style={{ textDecoration: 'none' }} href="/contact">
                        <ListItemButton component="span">
                          <ListItemText primary="Contact Us" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                        </ListItemButton>
                      </Link>
                    </TreeItem>
                    <Link style={{ textDecoration: 'none' }} href="/coming-soon">
                      <ListItemButton component="span">
                        <ListItemText
                          primary="Coming Soon"
                          primaryTypographyProps={{ variant: 'h6', color: 'text.primary', paddingLeft: 2 }}
                        />
                      </ListItemButton>
                    </Link>
                    {!session && (
                      <>
                        <Link style={{ textDecoration: 'none' }} href={ACCOUNT_URL}>
                          <ListItemButton component="span">
                            <ListItemText
                              primary="Login"
                              primaryTypographyProps={{ variant: 'h6', color: 'text.primary', paddingLeft: 2 }}
                            />
                          </ListItemButton>
                        </Link>
                      </>
                    )}
                  </TreeView>
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
