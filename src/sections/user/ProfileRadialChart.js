import PropTypes from 'prop-types';

import { useState } from 'react';

// next
import dynamic from 'next/dynamic';

// material-ui
// import { useTheme } from '@mui/material/styles';
// import useConfig from 'hooks/useConfig';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// chart options
const redialBarChartOptions = {
  colors: ['#20E647'],
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: '70%'
        // background: '#293450'
      },
      track: {
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          blur: 4,
          opacity: 0.15
        }
      },
      dataLabels: {
        showOn: 'always',
        name: {
          offsetY: 20,
          show: true,
          // color: '#fff',
          color: '#888',
          fontSize: '13px'
        },
        value: {
          offsetY: -20,
          color: '#111',
          fontSize: '20px',
          show: true
        }
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'vertical',
      gradientToColors: ['#87D4F9'],
      stops: [0, 100]
    }
  },
  stroke: {
    lineCap: 'round'
  },
  labels: ['Discount']
};

// ==============================|| TOP CARD - RADIAL BAR CHART ||============================== //

const ProfileRadialChart = ({ rate }) => {
  // const theme = useTheme();
  // const { mode } = useConfig();

  // const textPrimary = theme.palette.text.primary;
  // const primary = theme.palette.primary.main;
  // const grey0 = theme.palette.grey[0];
  // const grey500 = theme.palette.grey[500];
  // const grey200 = theme.palette.grey[200];

  const [series] = useState([rate]);
  const [options] = useState(redialBarChartOptions);
  // const [options, setOptions] = useState(redialBarChartOptions);

  // useEffect(() => {
  //   setOptions((prevState) => ({
  //     ...prevState,
  //     // colors: [primary],
  //     plotOptions: {
  //       ...prevState.plotOptions,
  //       radialBar: {
  //         ...prevState.plotOptions.radialBar,
  //         track: {
  //           ...prevState.plotOptions.radialBar.track,
  //           background: mode === 'dark' ? grey200 : grey0
  //         }
  //         // dataLabels: {
  //         //   ...prevState.plotOptions.radialBar.dataLabels,
  //         //   value: {
  //         //     fontSize: '1rem',
  //         //     fontWeight: 600,
  //         //     offsetY: 5,
  //         //     color: textPrimary
  //         //   }
  //         // }
  //       }
  //     }
  //   }));
  // }, [mode, grey200, grey0, grey500, textPrimary, primary]);

  return (
    <div id="chart">
      <ReactApexChart series={series} options={options} type="radialBar" width={156} height={156} />
    </div>
  );
};

ProfileRadialChart.propTypes = {
  rate: PropTypes.number
};

export default ProfileRadialChart;
