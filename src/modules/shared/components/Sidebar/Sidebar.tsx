import SidebarItems from '../SidebarItems/SidebarItems'
import  LogoIcon  from '../../assets/icons/sidebar/logo.png'
import  smallLogoIcon  from '../../assets/icons/sidebar/smallLogo.png'

interface ISidebarProps {
  collapseSidebar: boolean
}

const Sidebar: React.FC<ISidebarProps> = ({ collapseSidebar }) => {
  return (
    <div className={`sidebar ${collapseSidebar ? 'collapse' : ''}`}>

      <div className="sidebar-content">
      <div className="sidebar-logo-container">{collapseSidebar ?  <img src={smallLogoIcon} /> : <img src={LogoIcon} />}</div> 
        <div className="sidebar-nav-items">
          <SidebarItems collapseSidebar={collapseSidebar} />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
