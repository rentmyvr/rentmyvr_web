import { useEffect, useState } from 'react';

// next
import { useRouter } from 'next/router';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { CreditCardOutlined, LockOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

import { ACCOUNT_URL } from 'config';

function getPathIndex(pathname) {
  let selectedTab = 0;
  switch (pathname) {
    case ACCOUNT_URL.PROFILE_PAYMENT:
      selectedTab = 1;
      break;
    case ACCOUNT_URL.PROFILE_PASSWORD:
      selectedTab = 2;
      break;
    case ACCOUNT_URL.PROFILE_SETTINGS:
      selectedTab = 3;
      break;
    case ACCOUNT_URL.PROFILE_UPDATE:
    default:
      selectedTab = 0;
  }
  return selectedTab;
}

// ==============================|| USER PROFILE - TAB ||============================== //

const ProfileTab = () => {
  const theme = useTheme();
  const router = useRouter();
  const { pathname } = router;

  const [selectedIndex, setSelectedIndex] = useState(getPathIndex(pathname));
  const handleListItemClick = (index, route) => {
    setSelectedIndex(index);
    router.push(route);
  };

  useEffect(() => {
    setSelectedIndex(getPathIndex(pathname));
  }, [pathname]);

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0, ACCOUNT_URL.PROFILE_UPDATE)}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="Personal Information" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 1} onClick={() => handleListItemClick(1, ACCOUNT_URL.PROFILE_PAYMENT)}>
        <ListItemIcon>
          <CreditCardOutlined />
        </ListItemIcon>
        <ListItemText primary="Payment" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 2} onClick={() => handleListItemClick(2, ACCOUNT_URL.PROFILE_PASSWORD)}>
        <ListItemIcon>
          <LockOutlined />
        </ListItemIcon>
        <ListItemText primary="Change Password" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 3} onClick={() => handleListItemClick(3, ACCOUNT_URL.PROFILE_SETTINGS)}>
        <ListItemIcon>
          <SettingOutlined />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
    </List>
  );
};

export default ProfileTab;
