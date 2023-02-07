import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Fade, useScrollTrigger } from '@mui/material';

// ==============================|| NAVIGATION - SCROLL TO TOP ||============================== //

const ScrollTop = ({ children }) => {
  const { pathname } = useRouter();
  // const trigger = useScrollTrigger({
  //   // Note that you normally won't need to set the window ref as useScrollTrigger will default to window only if an iframe is used
  //   // target: window ? window() : undefined,
  //   disableHysteresis: true,
  //   threshold: 100
  // });

  // const handleClick = (event) => {
  //   const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
  //   if (anchor) {
  //     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
  //   }
  // };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return children || null;
  // return (
  //   <Fade in={trigger}>
  //     <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
  //       {children}
  //     </Box>
  //   </Fade>
  // );
};

ScrollTop.propTypes = {
  children: PropTypes.node
};

export default ScrollTop;
