import * as React from 'react';
import Slide from '@mui/material/Slide';

const SlideUp = React.forwardRef(function SlideUp(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SlideDown = React.forwardRef(function SlideDown(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const SlideLeft = React.forwardRef(function SlideLeft(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const SlideRight = React.forwardRef(function SlideRight(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export { SlideUp, SlideDown, SlideLeft, SlideRight };
