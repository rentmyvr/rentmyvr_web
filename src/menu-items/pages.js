// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DollarOutlined, LoginOutlined, HomeOutlined, ShopOutlined } from '@ant-design/icons';

// icons
const icons = { DollarOutlined, LoginOutlined, HomeOutlined, ShopOutlined };

import { CORE_URL } from 'config';
// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages = {
  id: 'group-pages',
  title: <FormattedMessage id="pages" />,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: CORE_URL.DASHBOARD,
      icon: icons.HomeOutlined,
      target: false
    },
    {
      id: 'company',
      title: <FormattedMessage id="company" />,
      type: 'item',
      url: CORE_URL.COMPANY_LIST,
      icon: icons.ShopOutlined,
      target: false
    },
    {
      id: 'properties',
      title: <FormattedMessage id="properties" />,
      type: 'collapse',
      icon: icons.ShopOutlined,
      children: [
        {
          id: 'property-list',
          title: <FormattedMessage id="property-list" />,
          type: 'item',
          url: CORE_URL.PROPERTY_LIST,
          target: false
        },
        {
          id: 'rental-add',
          title: <FormattedMessage id="rental-add" />,
          type: 'item',
          url: CORE_URL.PROPERTY_CREATE,
          target: false
        },
        {
          id: 'rental-list-mine',
          title: <FormattedMessage id="rental-list-mine" />,
          type: 'item',
          url: CORE_URL.PROPERTY_LIST_MINE,
          target: false
        }
      ]
    }
  ]
};

export default pages;
