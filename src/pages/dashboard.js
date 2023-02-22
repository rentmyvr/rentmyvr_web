// material-ui
import { Grid } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/Page';
import MainCard from 'components/MainCard';
import AnalyticsDataCard from 'components/cards/statistics/AnalyticsDataCard';

import UsersCardChart from 'sections/dashboard/analytics/UsersCardChart';
import MarketingCardChart from 'sections/dashboard/analytics/MarketingCardChart';
import OrdersCardChart from 'sections/dashboard/analytics/OrdersCardChart';
import SalesCardChart from 'sections/dashboard/analytics/SalesCardChart';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
  <Page title="Dashboard">
    <MainCard title="Rentals">
      <Grid container rowSpacing={4.5} columnSpacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticsDataCard title="Total Users" count="78,250" percentage={70.5}>
            <UsersCardChart />
          </AnalyticsDataCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticsDataCard title="Total Order" count="18,800" percentage={27.4} isLoss color="warning">
            <OrdersCardChart />
          </AnalyticsDataCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticsDataCard title="Total Sales" count="$35,078" percentage={27.4} isLoss color="warning">
            <SalesCardChart />
          </AnalyticsDataCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticsDataCard title="Total Marketing" count="$1,12,083" percentage={70.5}>
            <MarketingCardChart />
          </AnalyticsDataCard>
        </Grid>

        <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
      </Grid>
    </MainCard>
  </Page>
);

SamplePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default SamplePage;
