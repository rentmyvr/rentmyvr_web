import { SvgIcon } from '@mui/material';
import { ReactComponent as Rent_1_SVG } from '/public/assets/images/icons/rentmyvr/rent-1.svg';
import { ReactComponent as Rent_2_SVG } from '/public/assets/images/icons/rentmyvr/rent-2.svg';
import { ReactComponent as Rent_3_SVG } from '/public/assets/images/icons/rentmyvr/rent-3.svg';
import { createSvgIcon } from '@mui/material/utils';

export const Rent_1 = (props) => {
  // return (
  //   <SvgIcon {...props} inheritViewBox>
  //     <Rent_1_SVG />
  //   </SvgIcon>
  // );
  return <SvgIcon {...props} component={Rent_1_SVG} />;
  // return <SvgIcon {...props}><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></SvgIcon>;
};

export const Rent_2 = (props) => {
  createSvgIcon(<SvgIcon {...props} component={Rent_2_SVG} viewBox="0 0 600 476.6" />);
  // return <SvgIcon {...props} component={Rent_2_SVG} inheritViewBox />;
};

export const Rent_3 = (props) => {
  return <SvgIcon {...props} component={Rent_3_SVG} inheritViewBox />;
};
