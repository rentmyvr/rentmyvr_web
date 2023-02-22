import { SvgIcon } from '@mui/material';
import { ReactComponent as Rent_1_SVG } from '/public/assets/images/icons/rentmyvr/rent-1.svg';
import { ReactComponent as Rent_2_SVG } from '/public/assets/images/icons/rentmyvr/rent-2.svg';
import { ReactComponent as Rent_3_SVG } from '/public/assets/images/icons/rentmyvr/rent-3.svg';

export const Rent_1 = (props) => {
  return <SvgIcon {...props} component={Rent_1_SVG} inheritViewBox />;
  // return <SvgIcon {...props}><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></SvgIcon>;
};

export const Rent_2 = (props) => {
  return <SvgIcon {...props} component={Rent_2_SVG} inheritViewBox />;
};

export const Rent_3 = (props) => {
  return <SvgIcon {...props} component={Rent_3_SVG} inheritViewBox />;
};
