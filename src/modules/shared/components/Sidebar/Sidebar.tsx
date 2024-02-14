import SidebarItems from '../SidebarItems/SidebarItems'
import LogoIcon from '../../assets/icons/sidebar/logo.png'
import smallLogoIcon from '../../assets/icons/sidebar/smallLogo.png'
import { useTranslation } from 'react-i18next'

interface ISidebarProps {
  collapseSidebar: boolean
}

const Sidebar: React.FC<ISidebarProps> = ({ collapseSidebar }) => {
  const { i18n } = useTranslation('translation')

  return (
    <div className={`sidebar ${collapseSidebar ? 'collapse' : ''}`}>
      <div className="sidebar-content" lang={i18n?.language}>
        <div className="sidebar-logo-container">
          {collapseSidebar ? <img src={smallLogoIcon} /> : <img src={LogoIcon} />}
        </div>
        <div className="sidebar-nav-items">
          <SidebarItems collapseSidebar={collapseSidebar} />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
