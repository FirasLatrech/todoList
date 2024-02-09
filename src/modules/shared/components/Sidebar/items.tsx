import { ReactComponent as DashboardIcon } from '../../assets/icons/sidebar/dashboard.svg'
import { ReactComponent as SettingsIcon } from '../../assets/icons/sidebar/settings.svg'
import { ReactComponent as ProfileIcon } from '../../assets/icons/sidebar/profile.svg'

export const SIDEBARITEMS = [
  {
    link: '/dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    link: '/settings',
    label: 'Settings',
    icon: <SettingsIcon />,
  },
  {
    link: '/profile',
    label: 'Profile',
    icon: <ProfileIcon />,
  },
]
