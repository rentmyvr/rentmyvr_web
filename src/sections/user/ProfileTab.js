import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';

// next
// import { useRouter } from 'next/router';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { CreditCardOutlined, LockOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

// import { ACCOUNT_URL } from 'config';

// ==============================|| USER PROFILE - TAB ||============================== //

const ProfileTab = ({ tab, setTab }) => {
  const theme = useTheme();
  // const router = useRouter();

  // const [selectedTab, setSelectedTab] = useState(tab);
  // const [selectedTab, setSelectedTab] = useState(getPathIndex(tab));
  // const handleListItemClick = (t, route) => {
  //   // setSelectedTab(t);
  //   if (setTab) {
  //     setTab(t);
  //   }
  //   // router.push(route);
  // };

  // useEffect(() => {
  //   setSelectedTab(tab);
  //   // setSelectedTab(getPathIndex(tab));
  // }, [tab]);

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      <ListItemButton selected={tab === 'personal'} onClick={() => setTab('personal')}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="Personal Information" />
      </ListItemButton>
      <ListItemButton selected={tab === 'payment'} onClick={() => setTab('payment')}>
        <ListItemIcon>
          <CreditCardOutlined />
        </ListItemIcon>
        <ListItemText primary="Payment" />
      </ListItemButton>
      <ListItemButton selected={tab === 'password'} onClick={() => setTab('password')}>
        <ListItemIcon>
          <LockOutlined />
        </ListItemIcon>
        <ListItemText primary="Change Password" />
      </ListItemButton>
      <ListItemButton selected={tab === 'settings'} onClick={() => setTab('settings')}>
        <ListItemIcon>
          <SettingOutlined />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
    </List>
  );
};

ProfileTab.propTypes = {
  tab: PropTypes.string,
  setTab: PropTypes.func
};

export default ProfileTab;
