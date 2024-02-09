import menuIcon from '../../assets/icons/navbar/menu.svg'
import { useLocation } from 'react-router-dom'
import ThemeButton from '../ThemeButton/ThemeButton'
import { Avatar, Button, Dropdown, MenuProps, Space } from 'antd'
import enFlagIcon from '../../assets/icons/Navbar/en-flag.png'
import frFlagIcon from '../../assets/icons/Navbar/fr-flag.png'
import arFlagIcon from '../../assets/icons/Navbar/ar-flag.png'
import { ReactComponent as ProfileIcon } from '../../assets/icons/sidebar/profile.svg'
import { ReactComponent as SettingsIcon } from '../../assets/icons/navbar/settings.svg'
import { ReactComponent as LogoutIcon } from '../../assets/icons/navbar/logout.svg'
import { useAppDispatch } from '../../store'
import { logout } from '@src/modules/auth/data/authThunk'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

interface INavbarProps {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
  setCollapseSidebar: React.Dispatch<React.SetStateAction<boolean>>
  collapseSidebar: boolean
}

const Navbar: React.FC<INavbarProps> = ({
  setShowSidebar,
  setCollapseSidebar,
  collapseSidebar,
}) => {
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const { t, i18n } = useTranslation('translation')

  const [lang, setLang] = useState(i18n?.language?.toString())

  const onChangeLanguage = (language: string) => {
    i18n.changeLanguage(language)
    setLang(language)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const languagesItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="navbar-flag-container" onClick={() => onChangeLanguage('en')}>
          <img src={enFlagIcon} alt="flag" className="navbar-flag" />
          <p>{t('language.en')}</p>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className="navbar-flag-container" onClick={() => onChangeLanguage('fr')}>
          <img src={frFlagIcon} alt="flag" className="navbar-flag" />
          <p>{t('language.fr')}</p>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div className="navbar-flag-container" onClick={() => onChangeLanguage('ar')}>
          <img src={arFlagIcon} alt="flag" className="navbar-flag" />
          <p>{t('language.ar')}</p>
        </div>
      ),
    },
  ]

  const accountInfoItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Space>
          <Avatar size={32} className="navbar-avatar">
            TG
          </Avatar>
          <div className="navbar-account-info">
            <p className="sidebar-accountinfo-item">tarekgzgz@gmail.com</p>
            <p>Role: Admin</p>
          </div>
        </Space>
      ),
      disabled: true,
    },
    {
      key: '2',
      label: <p>Profile</p>,
      icon: <ProfileIcon style={{ stroke: 'black', width: '18px', height: '18px' }} />,
    },
    {
      key: '3',
      label: <p>Settings</p>,
      icon: <SettingsIcon style={{ stroke: 'black', width: '18px', height: '18px' }} />,
    },
    {
      key: '4',
      label: <p onClick={handleLogout}>logout</p>,
      icon: <LogoutIcon style={{ stroke: 'black', width: '18px', height: '18px' }} />,
    },
  ]

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img
          src={menuIcon}
          alt="menu"
          className="navbar-left-menu-icon"
          onClick={() => {
            setCollapseSidebar(false)
            setShowSidebar(true)
          }}
        />
        <img
          src={menuIcon}
          alt="menu"
          className="navbar-left-menu-icon-collapse"
          onClick={() => setCollapseSidebar(!collapseSidebar)}
        />
        <p className="navbar-left-title">{pathname.split('/')[1]}</p>
      </div>
      <div className="navbar-right">
        <Space size={'middle'}>
          <Dropdown
            menu={{ items: languagesItems }}
            trigger={['click']}
            placement="bottomRight"
            arrow
          >
            <Button type="link" shape="circle">
              <div className="navbar-flag-container">
                <img
                  src={lang === 'en' ? enFlagIcon : lang === 'fr' ? frFlagIcon : arFlagIcon}
                  alt="flag"
                  className="navbar-flag"
                />
              </div>
            </Button>
          </Dropdown>

          <Dropdown
            menu={{ items: accountInfoItems }}
            trigger={['click']}
            placement="bottomRight"
            arrow
            className="navbar-dropdown-cursor"
          >
            <Space>
              <Avatar size={32} className="navbar-avatar">
                TG
              </Avatar>
            </Space>
          </Dropdown>
        </Space>

        <ThemeButton />
      </div>
    </div>
  )
}

export default Navbar
