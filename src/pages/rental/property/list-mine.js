// project import
import PropertyList from 'sections/apps/rental/property/PropertyList';
import Page from 'components/Page';
import Layout from 'layout';

const PropertyLists = () => {
  return (
    <Page title="Property List">
      <PropertyList />
    </Page>
  );
};

PropertyLists.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default PropertyLists;
